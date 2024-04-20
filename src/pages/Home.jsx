import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Plantingo</h1>
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
    </div>
  );
};

export default Home;