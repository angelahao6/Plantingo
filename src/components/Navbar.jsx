import { useNavigate } from "react-router-dom";
import cup from '../assets/Cup.svg'
import camera from '../assets/Camera.svg'
import leaf from '../assets/leaff.svg'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      position: "fixed",
      bottom: 0,
      width: "100%",
      backgroundColor: "#707C4F",
      color: "#FFFDF3",
      padding: "10px",
      textAlign: "center",
      borderTop: "1px solid #ddd",
    }}>
      <img src={cup} onClick={() => navigate("/leaderboard")} style={{ margin: "0 30px" }} />
      <img src={camera} onClick={() => navigate("/scanner")} style={{ margin: "0 30px" }} />
      <img src={leaf} onClick={() => navigate("/gemini")} style={{ margin: "0 30px" }} />
    </div>
  );
};

export default Navbar;
