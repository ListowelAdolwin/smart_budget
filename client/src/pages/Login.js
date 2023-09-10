import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Login.css";
import AuthContext from "../components/context/AuthContext";
import jwt_decode from "jwt-decode";

const Login = (props) => {
  let { setUser, setAuthtokens } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);


  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const content = await response.json();
    if (response.ok) {
      setAuthtokens(content);
      setUser(jwt_decode(content.access));
      localStorage.setItem("authtokens", JSON.stringify(content));
      setRedirect(true);
    } else {
      alert("Please enter correct credentials");
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <ToastContainer />
      <br />
      <form className="login-form" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
