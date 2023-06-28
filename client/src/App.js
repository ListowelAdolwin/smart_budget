import "./App.css";
import HomePage from "./components/HomePage";
import NavbarSection from "./components/NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  return (
    <div className="App">
        <Router>
        <NavbarSection />
          <Routes>
            <Route exact path = "/" element={<HomePage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
