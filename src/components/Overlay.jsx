import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const Overlay = ({retake, image}) => {
  const navigate = useNavigate();
  const [outputText, setOutputText] = useState('');
  const [plant_name, setPlantName] = useState('sunflower');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/plant_stats', { image: image.slice(23) });
        setOutputText(response.data.response);
      } catch (error) {
        console.error('Error:', error.response.data);
      }
    }
    fetchData();
  }, [image])

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div style={{ width: 380, height: 600, borderRadius: 20, backgroundColor: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}>
        <p style={{ fontSize: "24px" }}>{outputText}</p>
        <button style={{ marginBottom: 20, color: "white", backgroundColor: "#707C4F", width: 270, padding: 12, borderRadius: 15, fontSize: 35, border: "none" }}
          onClick={() => {
            navigate("/gemini", { state : { plant : outputText } });
          }}>Chat with me!</button>
        <button style={{ color: "rgba(0, 0, 0, 0.5)", width: 270, padding: 12, borderRadius: 15, fontSize: 35, border: "none" }} onClick={retake}>Retake Picture</button>
      </div>
    </div>
  );
};

export default Overlay;
Overlay.propTypes = {
    retake: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired 
}