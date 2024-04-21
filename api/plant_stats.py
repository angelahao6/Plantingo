import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import hashlib
import os
import base64, binascii
import PIL.Image
import io
import re

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
  data = request.json
  image = data.get('image')

  if not image:
    return jsonify({'error': 'Message is required'}), 400  

  try:
    image = base64.b64decode(image, validate=True)
    file_to_save = "my_image.png"
    with open(file_to_save, "wb") as f:
      f.write(image)
  except binascii.Error as e:
    print(e, image)

  prompt = "Use this picture of a plant and you will return information in the following format:\n\nCongrats! You scanned a <name_of_plant>.\nRarity: <Rarity>\nPoints: <Points>\nOrigin: <Origin>\n<Quick Greeting with plant name>\n\n\n\nEverything above should be output exactly as shown, except in tags (<>) where the output should vary based on the plant that was scanned. You should be able to identify the actual name of the plant (name_of_plant), assign a rarity by using predictive rarity analysis of plants and sort it into these categories [Common, Uncommon, Rare, Super Rare], the points assigned should be associated with the rarity of the plant: Common: 10, Uncommon: 50, Rare: 250, Super Rare: 500. You should also find the geographical origins of the plant for (Origin).\nFor the quick greeting, you should keep it short, usually a greeting and one short sentence, but if it is a very unique plant then keep it to a greeting and two short sentence max. You should be greeting the user in the perspective of the plant from the image. You should also a short play on the actual name of then plant. Example names would be: Dicey for Dicentra Cupid, Bougie for Boungainvillea, Titan for Amorphophallus Titanum.\nYou should only accept images as inputs, not texts, videos, audios. You should only process images that are plants. if the image is not a plant, return a statement saying 'Plant not detected'"

  model = genai.GenerativeModel('gemini-pro-vision')
  
  final_img = PIL.Image.open("my_image.png")
  response = model.generate_content([prompt, final_img])
  
  return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)