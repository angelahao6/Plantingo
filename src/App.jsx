import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Collections from "./pages/Collections";
import Gemini from "./pages/Gemini";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css'
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Home /><Navbar /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scanner" element={<><Scanner /><Navbar /></>} />
        <Route path="/collections" element={<><Collections /><Navbar /></>} />
        <Route path="/gemini" element={<><Gemini /> <Navbar /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
