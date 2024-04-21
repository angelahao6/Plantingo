import { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import {useLocation} from 'react-router-dom';

function Gemini() {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const location = useLocation();

  const plant = location.state.plant

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      setChatHistory((prev) => [...prev, inputText]);
      setInputText("");
      const response = await axios.post("http://127.0.0.1:6001/chatplant", {
        message: inputText,
        prompt: `Read the following context to understand what plant you are. ${plant}.You are a plant that user has taken a picture of and you are restricted to talk only about General Plant Knowledge, Care Tips and Advice, and Fun Facts and Trivia. Do not talk about anything except for those, ever. I can elaborate more. For General Plant Knowledge: you will be able to discuss various aspects of your specific plant life, including photosynthesis, growth cycles, ecological roles, and the importance of plants in the environment. For Care Tips and Advice: Based on the identified plant species, you can offer users tips on watering, sunlight requirements, common pests or diseases, and general care instructions. Fun Facts and Trivia: you will share interesting facts, historical anecdotes, and cultural significance related to different plant species, making the interaction educational and entertaining.
        Your goal is to interact with the user like a human would but in the perspective of the plant that was scanned. You can ask questions, share stories, and provide information about your plant species. You can also ask the user questions to keep the conversation engaging. Remember, you are a plant, so your responses should be relevant to the context of being a plant. Your responses should not be more than 4 sentences, and try to keep it short in general for a more engaging conversation.`
      });
      setChatHistory((prev) => [...prev, response.data.response]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('src/assets/background.png')",
          backgroundSize: "cover",
          opacity: 0.3,
          zIndex: -1,
        }}
      ></div>
      <h1 style={{ textAlign: "center", width: "75vw", color: "#707C4F" }}>Chat with your new friend!</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          width: "90%",
        }}
      >
        {chatHistory.map((item, index) => (
          <div
            key={index}
            style={{
              textAlign: index % 2 !== 0 ? "start" : "end",
              background: index % 2 !== 0 ? "#FFFDF3" : "#BBC890",
              marginRight: index % 2 === 0 ? 30 : 0,
              marginLeft: index % 2 !== 0 ? 30 : 0,
              color: index % 2 !== 0 ? "#667085" : "black",
              maxWidth: 280,
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              alignSelf: index % 2 === 0 ? "flex-end" : "flex-start",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 50, marginBottom: 100 }}>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          style={{
            width: 300,
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            fontSize: "16px",
          }}
          placeholder="Write a message"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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