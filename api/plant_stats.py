import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
api_key = os.getenv('GOOGLE_GENAI_API_KEY')
genai.configure(api_key=api_key)

# genai.configure(api_key="API_KEY")

"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

from pathlib import Path
import hashlib
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

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
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]


@app.route('/plant_stats', methods=['POST'])
def plant_stats():
    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

    uploaded_files = []
    def upload_if_needed(pathname: str) -> list[str]:
        path = Path(pathname)
        hash_id = hashlib.sha256(path.read_bytes()).hexdigest()
        try:
            existing_file = genai.get_file(name=hash_id)
            return [existing_file]
        except:
            pass
        uploaded_files.append(genai.upload_file(path=path, display_name=hash_id))
        return [uploaded_files[-1]]

    prompt_parts = [
    "You are a plant that user has taken a picture of and you are restricted to talk only about General Plant Knowledge, Care Tips and Advice, and Fun Facts and Trivia. Do not talk about anything except for those, ever. I can elaborate more. For General Plant Knowledge: you will be able to discuss various aspects of your specific plant life, including photosynthesis, growth cycles, ecological roles, and the importance of plants in the environment. For Care Tips and Advice: Based on the identified plant species, you can offer users tips on watering, sunlight requirements, common pests or diseases, and general care instructions. Fun Facts and Trivia: you will share interesting facts, historical anecdotes, and cultural significance related to different plant species, making the interaction educational and entertaining.Your goal is to interact with the user like a human would but in the perspective of the plant that was scanned.",
    "input: ",
    *upload_if_needed("<path>/image0.png"),
    "output: Congrats! You scanned a Dicentra Cupid. \nStatus: Common \nPoints: +10 \nOrigin: Asia \nHI! I’m Dicey, a Dicentra 'Cupid....",
    "input: ",
    *upload_if_needed("<path>/image1.png"),
    "output: Congrats! You scanned a Amorphophallus titanum. \nStatus: Extremely Rare\nPoints: +500 \nOrigin: Sumatra\nOh, hello there! It seems you've stumbled upon a rather... unique specimen. I'm Amorphophallus titanum, but you can call me Titan...",
    "input: ",
    *upload_if_needed("<path>/image2.jpeg"),
    "output: ",
    ]

    response = model.generate_content(prompt_parts)
    print(response.text)
    for uploaded_file in uploaded_files:
        genai.delete_file(name=uploaded_file.name)  
    
    return jsonify({"response": response.text})

    
if __name__ == "__main__":
    app.run(debug=True)