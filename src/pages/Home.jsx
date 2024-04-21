import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", backgroundImage: "url('src/assets/background.png')", backgroundSize: "cover", backgroundColor: "rgba(255, 255, 255, 0.3)"  }}>
      <h1 style={{margin: "0", textAlign: "center"}}>Plantingo</h1>
      <div className="card">
        <button>hi</button>
        <p>Collect your dream garden.</p>
      </div>
      <button
        onClick={() => {
          navigate("/scanner");
        }}
      >
        Lets Go!
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/collections");
        }}
      >
        Collections
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/gemini");
        }}
      >
        Gemini
      </button>
    </div>
  );
};

export default Home;
