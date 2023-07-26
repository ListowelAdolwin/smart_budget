import "./App.css";
import HomePage from "./components/HomePage";
import NavbarSection from "./components/NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState(null);
  const [society_id, setSociety_id] = useState(null)

  useEffect(() => {
    (
        async () => {
            const response = await fetch('http://localhost:8000/api/society', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            const content = await response.json();

            setSociety_id(content.id);
            setName(content.name)
        }
    )();
},[]);


  return (
    <div className="App">
        <Router>
        <NavbarSection setName={setName} setId={setSociety_id} name={name} id={society_id} />
          <Routes>
            <Route exact path = "/" element={<HomePage name={name} id={society_id}/>} />
            <Route path="/login" element={<Login setName={setName} setId={setSociety_id}/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
