const Plant = ({ image, name }) => {
  return (
    <div style={{ width: "40vw", height: "20vh", margin: "10px"}}>
      <img
        src={image}
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          maxHeight: "100%",
          borderRadius: "20px",
          position: "relative",
          zIndex: "0",
        }}
      ></img>
      <p
        style={{
          marginTop: "-5vh",
          marginLeft: "5vw",
          color: "#FFFDF3",
          backgroundColor: "#4D5652",
          borderRadius: "20px",
          textAlign: "center",
          width: "60%",
          fontWeight: "200",
          fontStyle: "italic",
          padding: "5px",
          position: "relative",
          zIndex: "1",
          wordWrap: "break-word"
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default Plant;
