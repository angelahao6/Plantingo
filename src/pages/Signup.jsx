import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
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

  const checkPass = (event) => {
    if (event.target.value != password) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/signup", { username, password });
      setError("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Username already taken.");
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
        Signup
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
            marginTop: 30,
            height: 30,
          }}
          placeholder="password"
        />
        <br />
        <input
          type="text"
          onChange={checkPass}
          style={{
            width: 300,
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            fontSize: "16px",
            marginTop: 30,
            height: 30,
          }}
          placeholder="confirm password"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSignup();
            }
          }}
        />
      </div>
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
        onClick={() => {
          if(error !== "Passwords do not match.")
            handleSignup();
        }}
      >
        Create account!
      </button>
      <br />
      {error}
      <br />
      <br />
    </div>
  );
};

export default Signup;
