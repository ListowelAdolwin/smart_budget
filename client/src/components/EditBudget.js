import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import "tailwindcss/tailwind.css";
import "./HomePage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/AuthContext";
import { useParams } from "react-router-dom";

export default function EditBudget(props) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [title, setTitle] = useState(props.name);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [nhil, setNhil] = useState(0);
  const [vat, setVat] = useState(0);
  const [grandTotal, setgrandTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showTax, setShowTax] = useState(false);

  const navigate = useNavigate();
  let { user } = useContext(AuthContext);

  useEffect(() => {
    const nhil = Math.round(Number(0.06 * total) * 100) / 100;
    const subTotal = Math.round(Number(nhil + total) * 100) / 100;
    const vat = Math.round(Number(subTotal * 0.15) * 100) / 100;
    const grandTotal = Math.round(Number(vat + subTotal) * 100) / 100;
    setNhil(nhil);
    setVat(vat);
    setgrandTotal(grandTotal);
    setSubTotal(subTotal);
  }, [quantity, unitPrice, total]);

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      quantity: quantity,
      unit_price: unitPrice,
    };
    setItems([...items, newItem]);
    setItemName("");
    setQuantity("");
    setUnitPrice("");
    setShowForm(false);
    setTotal(total + quantity * unitPrice);
    setShowTax(true);
  };

  const obj = useParams();
  const budgetId = obj["id"];
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/update/${budgetId}`)
      .then((res) => {
        setItems(res.data.items);
        setTitle(res.data.title);
        setShowTax(true);
        let total = 0;
        for (let i = 0; i < res.data.items.length; i++) {
          total += res.data.items[i].quantity * res.data.items[i].unit_price;
        }
        setTotal(total);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const createBudget = () => {
    axios
      .post("http://127.0.0.1:8000/api/create-budget", {
        title: title,
        society_id: user.id,
        items: items,
      })
      .then((response) => {
        toast.success("Budget created successfully!");
        setItems([]);
        setTitle("");
        setShowTax(false);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.post(`http://127.0.0.1:8000/api/delete/${budgetId}`, {
      id: budgetId,
    });
  };

  return (
    <div className="homepage">
      <ToastContainer />
      <Container className="p-4">
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          dashboard
        </Button>
        <br />
        <br />
        <h1 className="text-2xl font-bold mb-4">Budget items</h1>
        <div className="budget-title">
          <Form className="">
            <Form.Group>
              <Form.Control
                required
                type="text"
                value={title}
                placeholder="Enter budget title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
        <h1 className="budget-title">{title}</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit_price}</td>
                <td>{item.quantity * item.unit_price}</td>
              </tr>
            ))}
            {showTax && (
              <>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <b>Total</b>
                  </td>
                  <td>
                    <b>{total}</b>
                  </td>
                </tr>
                <tr>
                  <td>NHIL/GetFund(6%)</td>
                  <td></td>
                  <td></td>
                  <td>{nhil}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <b>Sub-Total</b>
                  </td>
                  <td>
                    <b>{subTotal}</b>
                  </td>
                </tr>
                <tr>
                  <td>VAT (15%)</td>
                  <td></td>
                  <td></td>
                  <td>{vat}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <b>Grand Total</b>
                  </td>
                  <td>
                    <b>{grandTotal}</b>
                  </td>
                </tr>
              </>
            )}
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
          <Form className="bg-gray-200 rounded mb-4">
            <Form.Group className="mb-2" controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="unitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                required
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
        <br />
        <Button onClick={createBudget}>Save Edit</Button>
      </Container>
    </div>
  );
}
