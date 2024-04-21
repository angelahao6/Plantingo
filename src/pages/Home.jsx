import { useNavigate } from "react-router-dom";

const Home = ( {setPage}) => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      height: "100vh", 
      backgroundImage: "url('src/assets/background.png')", 
      backgroundSize: "cover", 
      opacity: 0.7, 
      display: "flex", /* Add flexbox */
      flexDirection: "column", /* Arrange items vertically */
      justifyContent: "center", /* Center items vertically */
      alignItems: "center", /* Center items horizontally */
    }}>
      <h1 style={{ fontSize: 70, margin: "0", color: '#707C4F', letterSpacing: "5px" }}>Plantingo</h1>
      <div className="card">
        <p style={{ fontSize: 30 }}>Collect your dream garden.</p>
      </div>
      <button
        onClick={() => {
          navigate("/login");
          setPage(1);
        }}
        style={{
          width: "80%",
          background: "linear-gradient(to left, #DFD59E, #8DA155)",
          border: "none",
          padding: "10px",
          borderRadius: "15px",
          color: "white",
          fontSize: 30,
          cursor: "pointer",
        }}
      >
        Lets Go!
      </button>
    </div>
    
  );
};

export default Home;
