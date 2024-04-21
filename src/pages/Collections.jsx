import Ellipse from "../assets/Ellipse 813.svg";
import Plant from "../assets/5717764 1.svg";
import PlantComponent from "./Plant.jsx";
import Lotus from "../assets/lotus.jpg";
import Cactus from  "../assets/cactus.jpeg";
import Rose from "../assets/rose.jpg";
import Jade from "../assets/jade.png";
import Hibiscus from "../assets/hibiscus.jpg";
import Lily from "../assets/lily.png";

const Collections = () => {
  return (
    <div style={{ backgroundColor: "#FFFDF3", height: "100vh" }}>
      <p
        style={{
          margin: "0",
          paddingTop: "10vh",
          paddingLeft: "5vw",
          fontSize: "3vh",
          fontWeight: "300",
        }}
      >
        Hello
      </p>
      <p
        style={{
          marginTop: "10px",
          paddingLeft: "5vw",
          wordWrap: "break-word",
          width: "50vw",
          fontSize: "4vh",
        }}
      >
        joe
      </p>
      <img
        src={Ellipse}
        style={{ position: "absolute", top: "8%", right: "50px" }}
      />
      <img
        src={Plant}
        style={{ position: "absolute", top: "5.5%", right: "68px" }}
      />
      <div
        style={{
          borderRadius: "10px",
          backgroundColor: "#707C4F",
          color: "#FFFDF3",
          width: "50%",
          margin: "5vh auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "3vh",
            fontWeight: "300",
            paddingLeft: "6vw",
            margin: "1vh",
            paddingRight: "6vw",
          }}
        >
          My Points:
        </p>
        <p style={{ fontSize: "3vh", margin: "1vh", fontWeight: "bold"}}>60</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "5vw"}}>
        <p style={{
          fontSize: "2vh",
          fontWeight: "600",
        }}>Your Collection</p>
      </div>
      {/* insert collections here */}
      <div style={{ display: "flex", width: "100%", height: "45vh", flexWrap: "wrap", overflow: "auto", justifyContent: "space-evenly"}}>
        <PlantComponent image={Lotus} name="Lotus"/>
        <PlantComponent image={Cactus} name="Cactus"/>
        <PlantComponent image={Rose} name="Rose"/>
        <PlantComponent image={Jade} name="Jade plant"/>
        <PlantComponent image={Hibiscus} name="Hibiscus"/>
        <PlantComponent image={Lily} name="Lily"/>
      </div>
      {/* <p style={{ marginBottom: "0" }}>Bottom Text</p> */}
    </div>
  );
};

export default Collections;
