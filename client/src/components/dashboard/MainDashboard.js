import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "./MainDashBoard.css";
import NavbarSection from "../NavBar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Budget from "./Budget";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const MainDasboard = () => {
  const [budgets, setBudgets] = useState([]);
  let { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/get-budgets/${user.id}`)
      .then((res) => {
        setBudgets(res.data);
        console.log("Data:", res.data);
      });
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <NavbarSection />
      <div className="dashboard-main-content">
        <div className="text-center">
          <h1>Welcome to smartBudget</h1>
          <h5>Let's make your budget writing stress-free</h5>
          <br />
          <Button onClick={() => navigate("/create-budget")}>
            Create New Budget
          </Button>
        </div>
      </div>
      <h2 className="m-5 text-center">Past Budgets</h2>
      <div className="m-4 budgets">
        {Array.from(budgets).map((budget) => (
          <div className="budget">
            <Budget
              key={budget.id}
              name={budget.title}
              id={budget.user_id}
              date={budget.created_at}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MainDasboard;
