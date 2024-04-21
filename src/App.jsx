import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Collections from "./pages/Collections";
import Gemini from "./pages/Gemini";
import './App.css'
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/gemini" element={<Gemini />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  );
}

export default App
