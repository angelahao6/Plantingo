// keep page for reference
import { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';

function Classification({ image }) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const location = useLocation();

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    // console.log('image', location.state.image.slice(23))
    try {
      const response = await axios.post('http://127.0.0.1:5000/plant_stats', { image: location.state.image.slice(23) });
      setOutputText(response.data.response);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleChange} />
      <button onClick={handleSubmit}>Send</button>
      <div>{outputText}</div>
    </div>
  );
}

export default Classification;

Classification.propTypes = {
  image: PropTypes.string.isRequired 
}