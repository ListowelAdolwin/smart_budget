import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css"

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const createBudget = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success("Logged in successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const content = await response.json();
    toast.success("Logged in successfully!");
    console.log(content)

    setRedirect(true);
  };

  if (redirect) {
    alert("User logged in successfully")
    return <Navigate to="/" />;
  }

  return (
    <div><ToastContainer />
    <br/>
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
      <input
        type="email"
        className="form-control"
        placeholder="Email address"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <br/>

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Login
      </button>
    </form>
  </div>);
};

export default Login;
