import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Collections from "./pages/Collections";
import Gemini from "./pages/Gemini";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import { useState } from "react";
function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [username, setUsername] = useState('')
  /*
  currentPage (for navbar):
      0 - all light
      1 - camera bold
      2 - leaf bold
      3 - cup bold
  */
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home setPage={setCurrentPage} />
            </>
          }
        />
        <Route path="/login" element={<Login setPage={setCurrentPage} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/scanner"
          element={
            <>
              <Scanner />
              <Navbar selected={currentPage} updateSelected={setCurrentPage} />
            </>
          }
        />
        <Route
          path="/collections"
          element={
            <>
              <Collections />
              <Navbar selected={currentPage} updateSelected={setCurrentPage} />
            </>
          }
        />
        <Route
          path="/gemini"
          element={
            <>
              <Gemini />{" "}
              <Navbar selected={currentPage} updateSelected={setCurrentPage} />
            </>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <>
              <Leaderboard />{" "}
              <Navbar selected={currentPage} updateSelected={setCurrentPage} />{" "}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
