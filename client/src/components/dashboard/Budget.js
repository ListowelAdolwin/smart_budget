import Card from "react-bootstrap/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Budget(props) {
  let { user } = useContext(AuthContext);
  let date = new Date(props.date)
  const month = date.toLocaleDateString("en-US");
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {month}
        </Card.Subtitle>
        <Card.Text>
          A quiz for all the levels of the department to compete. It is also a
          medium for students to have fun
        </Card.Text>
        <Card.Link href="#">download</Card.Link>
        <Card.Link href="#">Edit budget</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Budget;
