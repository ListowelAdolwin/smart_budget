import "./App.css";
import HomePage from "./components/HomePage";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName("Listowel")();
  });

  return (
    <div className="App">
      <div className="App">
        <Router>
          <Nav name={name} setName={setName} />
          <Routes>
            <Route path="/" element={<HomePage name={name} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
