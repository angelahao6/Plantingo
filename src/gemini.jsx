
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function Gemini() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user_input', { message: inputText });
      setOutputText(response.data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleChange} />
      <button onClick={handleSubmit}>Send</button>
      <div>{outputText}</div>
    </div>
  );
}

export default Gemini;
