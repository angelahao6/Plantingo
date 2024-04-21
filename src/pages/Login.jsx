import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({setPage, setUser}) => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setUsername = (event) => {
    setName(event.target.value);
  };

  const setPass = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
        const res = await axios.post('http://127.0.0.1:5000/login', { username, password });
        console.log(res)
        setError('')
        setUser(res.data.message)
        navigate('/collections')
        setPage(2)
    } catch (error) {
      console.error(error);
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('src/assets/background.png')",
        backgroundSize: "cover",
        opacity: 0.7,
        display: "flex" /* Add flexbox */,
        flexDirection: "column" /* Arrange items vertically */,
        justifyContent: "center" /* Center items vertically */,
        alignItems: "center" /* Center items horizontally */,
      }}
    >
      <h1
        style={{
          fontSize: 70,
          margin: "0",
          color: "#707C4F",
          letterSpacing: "5px",
        }}
      >
        Login
      </h1>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <input
          type="text"
          onChange={setUsername}
          style={{
            width: 300,
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            fontSize: "16px",
            height: 30,
          }}
          placeholder="username"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleLogin();
            }
          }}
        />
        <br />
        <input
          type="text"
          onChange={setPass}
          style={{
            width: 300,
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            fontSize: "16px",
            margin: 30,
            height: 30,
          }}
          placeholder="password"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleLogin();
            }
          }}
        />
      </div>
      <br />
      <br />
      {error}
      <br />
      <br />
      <button
        style={{
          margin: 20,
          color: "white",
          backgroundColor: "#707C4F",
          width: 200,
          padding: 12,
          borderRadius: 15,
          fontSize: 15,
          border: "none",
        }}
        onClick={() => handleLogin()}
      >
        Login
      </button>
      <button
        style={{
          marginBottom: 20,
          color: "white",
          backgroundColor: "#707C4F",
          width: 200,
          padding: 12,
          borderRadius: 15,
          fontSize: 15,
          border: "none",
        }}
        onClick={() => {
          navigate("/signup");
        }}
      >
        Create an account!
      </button>
    </div>
  );
};

export default Login;
