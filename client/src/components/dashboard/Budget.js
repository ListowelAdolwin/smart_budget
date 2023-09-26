import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Budget(props) {
  const navigate = useNavigate();
  let { user } = useContext(AuthContext);
  let date = new Date(props.date);
  date = date.toLocaleDateString("en-US");
  // const day = date.toLocaleString("en-US", { day: "2-digit" });
  // const year = date.getFullYear();
  return (
    // <Card>
    //   <Card.Body>
    //     <Card.Title>{props.name}</Card.Title>
    //     <Card.Subtitle className="mb-2 text-muted">
    //       {date}
    //     </Card.Subtitle>
    //     <Card.Text>
    //     </Card.Text>
    //     <Card.Link href="#">download</Card.Link>
    //     <Card.Link href="#">Edit budget</Card.Link>
    //   </Card.Body>
    // </Card>
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">{props.name}</h2>
      <p className="text-gray-500 mb-4">{date}</p>
      <div className="flex">
        <button className="bg-info px-3 py-2 me-5 rounded-md">Download</button>
        <button
          onClick={() => navigate(`/edit-budget/${props.id}`)}
          className="bg-info px-3 py-2 ms-5 rounded-md"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Budget;
