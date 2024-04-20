import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Collections from "./pages/Collections";
import Gemini from "./gemini";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/gemini" element={<Gemini />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
