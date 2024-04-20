import 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Plantingo</h1>
        <div className="card">
        <button>
            hi
        </button>
        <p>Collect your dream garden.</p>
        </div>
        <button onClick={() => {navigate('/scanner');}}>Lets Go!</button>
    </div>
  );
};

export default Home;