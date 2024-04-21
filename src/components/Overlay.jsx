import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Overlay = ({description, retake}) => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div style={{ width: 380, height: 600, borderRadius: 20, backgroundColor: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}>
        <p style={{ fontSize: "24px" }}>{description}</p>
        <button style={{ marginBottom: 20, color: "white", backgroundColor: "#707C4F", width: 270, padding: 12, borderRadius: 15, fontSize: 35, border: "none" }} onClick={() => {
          navigate("/gemini");
        }}>chat</button>
        <button style={{ color: "rgba(0, 0, 0, 0.5)", width: 270, padding: 12, borderRadius: 15, fontSize: 35, border: "none" }} onClick={retake}>rescan</button>
      </div>
    </div>
  );
};

export default Overlay;
Overlay.propTypes = {
    description: PropTypes.string.isRequired,
    retake: PropTypes.func.isRequired
}