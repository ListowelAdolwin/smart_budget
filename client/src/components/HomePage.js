import React from "react";
import NavbarSection from "./NavBar";
import axios from "axios";
import { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import "tailwindcss/tailwind.css";
import "./HomePage.css";

export default function HomePage() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddItem = () => {
    const newItem = {
      itemName: itemName,
      quantity: quantity,
      unitPrice: unitPrice,
    };
    setItems([...items, newItem]);
    setItemName("");
    setQuantity("");
    setUnitPrice("");
    setShowForm(false);
    submitBudget();
  };

  const submitBudget = () => {
    axios
      .post("http://127.0.0.1:8000/api/create-budget", {
        title: "Prof Hayfron Quiz",
        society: 1,
        item: [
          {
            name: "Citation for Prof",
            unit_price: 100.0,
            quantity: 1,
          },
          {
            name: "Hard Drives",
            unit_price: 120.0,
            quantity: 12,
          },
          {
            name: "Water",
            unit_price: 9.0,
            quantity: 5,
          },
          {
            name: "Canned Water",
            unit_price: 3.0,
            quantity: 10,
          },
        ],
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const getBudget = () => {
    axios.get("http://127.0.0.1:8000/api/get-budgets/2").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <NavbarSection />
      <Container className="p-4">
        <h1 className="text-2xl font-bold mb-4">Item List</h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button
          variant="primary"
          className="mb-4"
          onClick={() => setShowForm(true)}
        >
          Add Item
        </Button>

        {showForm && (
          <Form className="bg-gray-200 p-4 rounded mb-4">
            <Form.Group className="mb-2" controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="unitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="text"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddItem}>
              Add
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
}
