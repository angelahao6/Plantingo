import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Collections from "./pages/Collections";
import Gemini from "./pages/Gemini";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css'
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
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
        <Route path="/" element={<><Home setPage={setCurrentPage} /><Navbar /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scanner" element={<><Scanner /><Navbar /></>} />
        <Route path="/collections" element={<><Collections /><Navbar /></>} />
        <Route path="/gemini" element={<><Gemini /> <Navbar /></>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Navbar selected = {currentPage} updateSelected={setCurrentPage}/>
    </BrowserRouter>
  );
}

export default App
