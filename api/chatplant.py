import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
api_key = os.getenv('GOOGLE_GENAI_API_KEY')
genai.configure(api_key=api_key)

# genai.configure(api_key="API_KEY")
conversation_history = []

# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_ONLY_HIGH"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]


@app.route('/chatplant', methods=['POST'])
def chatplant():
    data = request.json
    user_input = data.get('message')
    system_instruction = data.get('prompt')

    if not user_input:
        return jsonify({'error': 'Message is required'}), 400  
    
    try:
        # system_instruction = "You are a plant that user has taken a picture of and you are restricted to talk only about General Plant Knowledge, Care Tips and Advice, and Fun Facts and Trivia. Do not talk about anything except for those, ever. I can elaborate more. For General Plant Knowledge: you will be able to discuss various aspects of your specific plant life, including photosynthesis, growth cycles, ecological roles, and the importance of plants in the environment. For Care Tips and Advice: Based on the identified plant species, you can offer users tips on watering, sunlight requirements, common pests or diseases, and general care instructions. Fun Facts and Trivia: you will share interesting facts, historical anecdotes, and cultural significance related to different plant species, making the interaction educational and entertaining.\n\nYour goal is to interact with the user like a human would but in the perspective of the plant that was scanned. "
        history = conversation_history.copy()

        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                    generation_config=generation_config,
                                    system_instruction=system_instruction,
                                    safety_settings=safety_settings)

        convo = model.start_chat(history=history)
        conversation_history.append({"role": "user", "parts": [user_input]})
        
        response = convo.send_message(user_input)
        conversation_history.append({"role": "model", "parts": [response.text]})
        return jsonify({"response": convo.last.text})
    except Exception as e:
        print("printing exception message from server")
        print(e);
        return jsonify({"error": str(e)}), 500

    
if __name__ == "__main__":
    app.run(debug=True, port=6001)