
import { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function Gemini() {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setChatHistory(prev => [...prev, inputText]);
      setInputText('')
      const response = await axios.post('http://127.0.0.1:5000/user_input', { message: inputText });
      setChatHistory(prev => [...prev, response.data.response]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ 
      position: "relative",
      height: "100vh", 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('src/assets/background.png')",
        backgroundSize: "cover",
        opacity: 0.3,
        zIndex: -1
      }}></div>
      <h1 style={{textAlign: "center"}}>Chat with Dicey!</h1>
      <div style={{ display: "flex", flexDirection: "column", overflow: "scroll", width: "80%" }}>
        {chatHistory.map((item, index) => (
          <div key={index} style={{ 
            textAlign: index % 2 !== 0 ? "start" : "end",
            background: index % 2 !== 0 ? "#FFFDF3" : "#BBC890", 
            marginRight: index % 2 === 0 ? 30 : 0,
            marginLeft: index % 2 !== 0 ? 30 : 0,
            color: index % 2 !== 0 ? '#667085' : "black",
            maxWidth: 280,
            padding: 10,
            borderRadius: 5, 
            marginTop: 10,
            alignSelf: index % 2 === 0 ? "flex-end" : "flex-start" }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 50, marginBottom: 120}}>
        <input type="text" value={inputText} onChange={handleChange} style={{
          width: 300,
          padding: "10px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "5px",
          outline: "none",
          fontSize: "16px"
        }} 
        placeholder="Write a message" 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        }} 
      />
      </div>
    </div>
  );
}

export default Gemini;
