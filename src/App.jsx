import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Activity from "./pages/Activity";
import About from "./pages/About";
import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/activity" element={<Activity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
