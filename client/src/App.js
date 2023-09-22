import "./App.css";
import HomePage from "./components/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React, { useState } from "react";
import MainDasboard from "./components/dashboard/MainDashboard";
import EditBudget from "./components/EditBudget";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./components/context/AuthContext";
import jwt_decode from "jwt-decode";

function App() {
  let token = localStorage.getItem("authtokens");
  let initialToken;
  let initialUser;
  if (token === null) {
    initialUser = null;
    initialToken = null;
  } else {
    initialUser = jwt_decode(JSON.parse(token).access);
    initialToken = JSON.parse(token);
  }
  const [name, setName] = useState(null);
  const [id, setId] = useState(null);
  const [authtokens, setAuthtokens] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const contextData = {
    name: name,
    setName: setName,
    id: id,
    setId: setId,
    user: user,
    setUser: setUser,
    authtokens: authtokens,
    setAuthtokens: setAuthtokens,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              exact
              path="/create-budget"
              element={
                <PrivateRoute isAuthenticated={user != null}>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/edit-budget/:id"
              element={
                <PrivateRoute isAuthenticated={user != null}>
                  <EditBudget />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MainDasboard />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
