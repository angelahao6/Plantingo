import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
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


@app.route('/user_input', methods=['POST'])
def user_input():
    data = request.json
    user_input = data.get('message') 

    if not user_input:
        return jsonify({'error': 'Message is required'}), 400  
    
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

        convo = model.start_chat(history=[
        {
            "role": "user",
            "parts": ["how can i use the code from this prompt into our web app"]
        },
        {
            "role": "model",
            "parts": ["## Integrating Code into a Web App: A General Guide\n\nUnfortunately, without the specific code and context of your web app, I can't provide exact instructions. However, I can offer a general guide on integrating code into a web app, which may be helpful depending on the type of code and your application's architecture. \n\n**Here's a breakdown of possible scenarios:**\n\n**1. Client-Side Integration (JavaScript):**\n\n* **Direct embedding:** \n    * If the code is JavaScript, you can directly embed it into your HTML file using `` tag.\n\n**2. Server-Side Integration (Backend Code):**\n\n* **Backend framework (e.g., Node.js, Python/Flask, Ruby on Rails):**\n    * Integrate the code into your backend application logic based on its functionality. This may involve:\n        * Creating API endpoints to serve data or functionality to the front-end.\n        * Implementing business logic and data processing. \n        * Connecting to databases and other services.\n* **Deployment and server configuration:**\n    * Deploy your backend application with the integrated code to a server environment (e.g., Heroku, AWS, Google Cloud).\n    * Configure your web app to communicate with the backend server using appropriate protocols and APIs.\n\n**3. Libraries and Frameworks:**\n\n* **Installation:**\n    * If the code is a library or framework, install it using a package manager like npm (for JavaScript) or pip (for Python).\n* **Import/Include:**\n    * Import or include the necessary modules/components into your project files. \n* **Usage:**\n    * Follow the library's documentation to use its functions and classes within your code.\n\n**Additional Considerations:**\n\n* **Security:** Ensure proper security measures are in place when handling user input and sensitive data.\n* **Testing:** Thoroughly test the integrated code to ensure it functions correctly and doesn't introduce bugs. \n* **Version control:** Use a version control system (like Git) to track changes and collaborate effectively.\n\n**For specific guidance, please provide more information about:**\n\n* **The programming language of the code.**\n* **The functionality of the code.**\n* **Your web app's architecture (front-end and back-end technologies).**\n\nWith more context, I can assist you in integrating the code seamlessly into your web app."]
        },
        {
            "role": "user",
            "parts": ["its a react app, and the generated code from gemini ai studio is python"]
        },
        {
            "role": "model",
            "parts": ["## Integrating Python Code from Gemini AI Studio into a React App \n\nSince your web app uses React (a JavaScript library for building user interfaces) and the generated code from Gemini AI Studio is in Python, direct integration isn't possible. However, here are some approaches to bridge the gap and utilize your Python code within your React app: \n\n**1. API Approach:**\n\n* **Create a Python backend:** \n    * Develop a Python web API (using frameworks like Flask or Django) that exposes endpoints for your AI functionality. \n    * This API will serve as an intermediary between your React front-end and the Python code.\n* **Connect React app to the API:**\n    * Use JavaScript libraries like Axios or Fetch to make HTTP requests from your React components to the Python API endpoints. \n    * The API will process the requests, execute the Python code, and return the results to the React app.\n\n**2. WebAssembly (Experimental):**\n\n* **Compile Python to WebAssembly:**\n    * Explore tools like Pyodide or Transcrypt, which allow compiling Python code to WebAssembly. \n    * WebAssembly allows running code in the browser at near-native speeds.\n* **Integrate WebAssembly module:** \n    * Load the compiled WebAssembly module into your React app and interact with it through JavaScript.\n    * This approach is still experimental and might require more effort to set up and debug.\n\n**3. Server-Side Rendering (SSR) with Python Frameworks:**\n\n* **Utilize frameworks like Django or Flask with SSR capabilities:**\n    * These frameworks can render React components on the server-side using libraries like `react-dom/server`. \n    * This approach allows embedding Python-generated content into the initial HTML sent to the client. \n* **Hydrate React app on the client:**\n    * Once the initial HTML is loaded, the React app takes over on the client-side for further interactivity. \n\n**Additional Considerations:**\n\n* **Data serialization:** Ensure data exchanged between the Python backend and React app is serialized appropriately (e.g., using JSON).\n* **Error handling:** Implement proper error handling mechanisms on both the backend and front-end.\n* **Deployment:** Consider deploying your Python backend and React app separately or using serverless functions for the API. \n\n**Choosing the Best Approach:**\n\nThe best approach depends on your specific needs and the complexity of your Python code:\n\n* **API approach:** Offers a clear separation of concerns and is well-suited for complex AI models or computationally intensive tasks.\n* **WebAssembly:** Potentially provides better performance but requires more effort and might have limitations.\n* **SSR:** Useful when SEO is crucial or initial load time is a concern, but adds complexity to the architecture.\n\nEvaluate the trade-offs and choose the method that best fits your project requirements and development expertise."]
        },
        {
            "role": "user",
            "parts": ["ok i'm doing the API approach, created a Flask backend. How should i continue"]
        },
        {
            "role": "model",
            "parts": ["## Continuing with the API Approach for your React App and Flask Backend\n\nGreat choice! Using a Flask backend to serve your Python-based AI functionality is a robust and flexible approach. Here's how you can proceed:\n\n**1. Define API Endpoints in Flask:**\n\n* **Identify the functionalities:** Determine the specific tasks or predictions your AI model will perform. Each task will correspond to an API endpoint.\n* **Create routes:** Utilize Flask's routing mechanism to define URLs for each endpoint. For example:\n\n```python\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\n@app.route('/predict', methods=['POST'])\ndef predict():\n    # Get data from request\n    data = request.get_json()\n    \n    # Process data using your AI model\n    # ...\n    \n    # Return predictions as JSON\n    return jsonify({'prediction': result})\n\n# Add more routes for other functionalities...\n```\n\n**2. Implement AI Logic:**\n\n* **Within each route function:**\n    * Retrieve input data from the request (e.g., using `request.get_json()` for JSON data).\n    * Preprocess the data as needed for your AI model.\n    * Execute your AI model (e.g., load a pre-trained model and use it for prediction).\n    * Post-process the results.\n    * Return the response in JSON format using `jsonify`.\n\n**3. Connect React App to Flask API:**\n\n* **Choose a data fetching library:** Opt for libraries like Axios or the Fetch API to make HTTP requests from your React components to the Flask backend. \n* **Make API calls:**\n\n```javascript\nimport axios from 'axios';\n\nconst fetchData = async (inputData) => {\n    try {\n        const response = await axios.post('/predict', inputData);\n        // Handle successful response (e.g., update state with prediction)\n    } catch (error) {\n        // Handle errors\n    }\n};\n```\n\n* **Process the response:** Parse the JSON response from the API and utilize the data within your React components.\n\n**4. Deployment Considerations:**\n\n* **Deploy the Flask app:** Choose a suitable hosting platform (e.g., Heroku, AWS, Google Cloud) or set up your own server.\n* **CORS configuration (if necessary):** If your React app is hosted on a different domain than your API, configure Cross-Origin Resource Sharing (CORS) on your Flask server to allow requests from your React app's origin.\n\n**5. Additional Tips:**\n\n* **Input validation:** Implement input validation on both the front-end and back-end to ensure data integrity and security.\n* **Error handling:** Handle potential errors gracefully on both sides, providing informative messages to the user.\n* **API documentation:** Consider documenting your API endpoints for easier integration and maintenance. \n\n**By following these steps and adapting them to your specific use case, you can successfully integrate your Python-based AI functionality from Gemini AI Studio into your React application, creating a powerful and interactive user experience.**"]
        },
        {
            "role": "user",
            "parts": ["im creating Gemini API calls"]
        },
        {
            "role": "model",
            "parts": ["## Creating Gemini API Calls within your React App\n\nWhile I don't have access to the specific Gemini API you're referring to (as my knowledge cutoff is November 2023), I can provide general guidance on making API calls within your React app, which you can adapt to your specific Gemini API:\n\n**1. Identify API Endpoints and Authentication:**\n\n* **API documentation:** Refer to the Gemini API documentation to understand available endpoints, required parameters, request methods (GET, POST, etc.), and authentication methods (e.g., API keys, OAuth).\n* **Authentication setup:** If the API requires authentication, obtain the necessary credentials (API keys, tokens) and store them securely in your React app (e.g., using environment variables). \n\n**2. Choose a Data Fetching Library:**\n\n* **Popular options:** Consider using libraries like Axios or the Fetch API for making HTTP requests in your React components. \n* **Axios example:**\n\n```javascript\nimport axios from 'axios';\n```\n\n* **Fetch API example:**\n\n```javascript\n// No import needed for Fetch API\n```\n\n**3. Make API Calls within React Components:**\n\n* **Define API call function:** Create a function that encapsulates the logic for making the API request. This function might take parameters for the endpoint URL, request method, headers, and body data.\n* **Example using Axios:**\n\n```javascript\nconst callGeminiAPI = async (endpoint, method, data) => {\n    try {\n        const response = await axios({\n            method: method,\n            url: endpoint,\n            headers: {\n                // Add any necessary headers (e.g., Authorization)\n            },\n            data: data // Include data for POST requests\n        });\n        // Process successful response (e.g., extract data, update state)\n        return response.data;\n    } catch (error) {\n        // Handle errors (e.g., display error messages)\n    }\n};\n```\n\n* **Example using Fetch API:**\n\n```javascript\nconst callGeminiAPI = async (endpoint, method, data) => {\n    try {\n        const response = await fetch(endpoint, {\n            method: method,\n            headers: {\n                // Add any necessary headers (e.g., Authorization)\n            },\n            body: JSON.stringify(data) // Include data for POST requests\n        });\n        const responseData = await response.json();\n        // Process successful response (e.g., extract data, update state)\n        return responseData;\n    } catch (error) {\n        // Handle errors (e.g., display error messages)\n    }\n};\n```\n\n* **Call the API function:** Within your React component, call the `callGeminiAPI` function with the appropriate parameters based on the specific API endpoint you need to access. \n* **Handle responses:** Process the API response data within your component (e.g., update state, display information to the user).\n* **Error handling:** Implement proper error handling to catch and handle any potential issues during the API call (e.g., network errors, API errors).\n\n**4. Adapt to your Specific Gemini API:**\n\n* **Replace placeholders:** Substitute the example endpoint, method, headers, and data with the actual values required by your Gemini API.\n* **Data parsing:** If the API returns data in a format other than JSON, you may need to parse the response accordingly.\n* **Error handling:** Tailor error handling to the specific error codes or messages returned by your Gemini API.\n\n**By following these steps and adjusting them to your specific Gemini API, you can effectively integrate its functionality into your React application, enabling a seamless user experience.**"]
        },
        ])
        
        convo.send_message(user_input)
        return jsonify({"response": convo.last.text})
    except Exception as e:
        return jsonify({"error": "Request failed"}), 500

    
if __name__ == "__main__":
    app.run(debug=True)