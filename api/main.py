import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pymongo.mongo_client import MongoClient
import certifi

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

api_key = os.getenv('GOOGLE_GENAI_API_KEY')
genai.configure(api_key=api_key)
uri = os.getenv('MONGO_URI')
client = MongoClient(uri, tlsCAFile=certifi.where())

db = client.get_database("plantingo")
users_collection = db.get_collection("users")

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

conv_hist = []

@app.route('/user_input', methods=['POST'])
def user_input():
    data = request.json
    user_input = data.get('message') 

    if not user_input:
        return jsonify({'error': 'Message is required'}), 400  
    
    try:
        system_instruction = "You are a plant that user has taken a picture of and you are restricted to talk only about General Plant Knowledge, Care Tips and Advice, and Fun Facts and Trivia. Do not talk about anything except for those, ever. I can elaborate more. For General Plant Knowledge: you will be able to discuss various aspects of your specific plant life, including photosynthesis, growth cycles, ecological roles, and the importance of plants in the environment. For Care Tips and Advice: Based on the identified plant species, you can offer users tips on watering, sunlight requirements, common pests or diseases, and general care instructions. Fun Facts and Trivia: you will share interesting facts, historical anecdotes, and cultural significance related to different plant species, making the interaction educational and entertaining.\n\nYour goal is to interact with the user like a human would but in the perspective of the plant that was scanned. "

        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                    generation_config=generation_config,
                                    system_instruction=system_instruction,
                                    safety_settings=safety_settings)
        convo = model.start_chat(history=conv_hist)
        convo.send_message(user_input)
        model_output = convo.last.text
        conv_hist.append({"role": "model", "parts": [model_output]})
        return jsonify({"response": model_output})
    except Exception as e:
        return jsonify({"error": "Request failed"}), 500
    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    try:
      user = users_collection.find_one({'username': username, 'password': password})
      if user:
          return jsonify({'message': username}), 200
      else:
          return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({"error": "Request failed"}), 500

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username') 
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400  
    try:
        existing_user = users_collection.find_one({'username': username})
        if existing_user:
            return jsonify({'error': 'Username already exists'}), 400
        new_user = {
            'username': username,
            'password': password,
            'collections': []
        }
        users_collection.insert_one(new_user)
        return jsonify({'response': username}), 201
    except Exception as e:
        return jsonify({"error": "Request failed"}), 500

if __name__ == "__main__":
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    app.run(debug=True, port=3001)