import { useNavigate } from "react-router-dom";
import boldCup from "../assets/Cup.svg";
import boldCamera from "../assets/Camera.svg";
import boldLeaf from "../assets/leaff.svg";
import lightCup from "../assets/cup_icon_light.svg";
import lightCamera from "../assets/camera_icon_light.svg";
import lightLeaf from "../assets/leaf_icon_light.svg";
import { useState } from "react";

const Navbar = () => {
  const [cup, setCup] = useState(lightCup);
  const [leaf, setLeaf] = useState(lightLeaf);
  const [camera, setCamera] = useState(lightCamera);

  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#707C4F",
        color: "white",
        padding: "10px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        zIndex: "2",
      }}
    >
      <img
        src={cup}
        onClick={() => {
          navigate("/");
          setCup(boldCup);
          setCamera(lightCamera);
          setLeaf(lightLeaf);
        }}
        style={{ margin: "0 30px" }}
      />
      <img
        src={camera}
        onClick={() => {
          navigate("/scanner");
          setCup(lightCamera);
          setCamera(boldCamera);
          setLeaf(lightLeaf);
        }}
        style={{ margin: "0 30px" }}
      />
      <img
        src={leaf}
        onClick={() => {
          navigate("/gemini");
          setCup(lightCup);
          setCamera(lightCamera);
          setLeaf(boldLeaf);
        }}
        style={{ margin: "0 30px" }}
      />
    </div>
  );
};

export default Navbar;
