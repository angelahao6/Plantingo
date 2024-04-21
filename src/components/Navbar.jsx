import { useNavigate } from "react-router-dom";
import boldCup from "../assets/Cup.svg";
import boldCamera from "../assets/Camera.svg";
import boldLeaf from "../assets/leaff.svg";
import lightCup from "../assets/cup_icon_light.svg";
import lightCamera from "../assets/camera_icon_light.svg";
import lightLeaf from "../assets/leaf_icon_light.svg";
import { useState, useEffect } from "react";

const Navbar = ({ selected, updateSelected }) => {
  const [cup, setCup] = useState(lightCup);
  const [leaf, setLeaf] = useState(lightLeaf);
  const [camera, setCamera] = useState(lightCamera);

  useEffect(() => {
    /*
      0 - all light
      1 - camera bold
      2 - leaf bold
      3 - cup bold
    */
    switch (selected) {
      case 0:
        setCup(lightCup);
        setCamera(lightCamera);
        setLeaf(lightLeaf);
        break;
      case 1:
        setCup(lightCup);
        setCamera(boldCamera);
        setLeaf(lightLeaf);
        break;
      case 2:
        setCup(lightCup);
        setCamera(lightCamera);
        setLeaf(boldLeaf);
        break;
      case 3:
        setCup(boldCup);
        setCamera(lightCamera);
        setLeaf(lightLeaf);
        break;
      default:
        setCup(lightCup);
        setCamera(lightCamera);
        setLeaf(lightLeaf);
    }
  }, [selected]);

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
          navigate("/gemini");
          updateSelected(3);
        }}
        style={{ margin: "0 30px" }}
      />
      <img
        src={camera}
        onClick={() => {
          navigate("/scanner");
          updateSelected(1);
        }}
        style={{ margin: "0 30px" }}
      />
      <img
        src={leaf}
        onClick={() => {
          navigate("/collections");
          updateSelected(2);
        }}
        style={{ margin: "0 30px" }}
      />
    </div>
  );
};

export default Navbar;
