const Plant = ({ image, name }) => {
  return (
    <div style={{ width: "40vw", height: "20vh" }}>
      <img
        src={image}
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          maxHeight: "100%",
          borderRadius: "20px",
          margin: "2vh",
          zIndex: "0",
        }}
      ></img>
      <p
        style={{
          marginTop: "-8vh",
          marginLeft: "5vw",
          color: "#FFFDF3",
          backgroundColor: "#4D5652",
          borderRadius: "20px",
          textAlign: "center",
          width: "60%",
          fontWeight: "200",
          fontStyle: "italic",
          padding: "10px",
          zIndex: "1",
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default Plant;
