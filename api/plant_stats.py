import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import hashlib
import os

app = Flask(__name__)
CORS(app)
api_key = os.getenv('GOOGLE_GENAI_API_KEY')
genai.configure(api_key=api_key)

# genai.configure(api_key="API_KEY")

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
    "The user will upload a picture of plant and you will return some information in the following format:\nCongrats! You scanned a",
    "input: ",
    *upload_if_needed("<path>/image0.png"),
    "output: Congrats! You scanned a Dicentra Cupid. \n\nStatus: Common \nPoints: +10 \nOrigin: Asia \n\nHey there! It’s so nice to meet you! I hope I don’t come off too dicey!",
    "input: ",
    *upload_if_needed("<path>/image1.png"),
    "output: Congrats! You scanned a Amorphophallus Titanum. \n\nStatus: Super Rare\nPoints: +500 \nOrigin: Sumatra, Indonesa\nOh, hello there! It seems you've stumbled upon a rather... unique specimen. I'm Amorphophallus Titanum, but you can call me Titan...",
    "input: ",
    *upload_if_needed("<path>/image2.jpeg"),
    "output: Congrats! You scanned a Bougainvillea. \n\nStatus: Common\nPoints: +10\nOrigin: South America\n\nHello there!  I'm Bougainvillea, but my friends call me Bougie.",
    "input: ",
    *upload_if_needed("<path>/image3.jpeg"),
    "output: Congrats! You scanned a Stargazer Lily.\n\nRarity: Uncommon\nPoints: +50\nOrigin: Asia\n\nHey there! I hope you have a lily good time with your plants!",
    "input: ",
    *upload_if_needed("<path>/image4.jpeg"),
    "output: ",
  ]

  response = model.generate_content(prompt_parts)
  for uploaded_file in uploaded_files:
    genai.delete_file(name=uploaded_file.name)
  
  return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)