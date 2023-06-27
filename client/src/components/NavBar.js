import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

const NavbarSection = () => {
  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return <Navigate to="/" />;
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/" className="mr-auto ps-5">
        smartBudget
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav className="me-5">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </li>
            <li className="nav-item ms-2 me-2">
              <Link to="/register">
                <Button>Register</Button>{" "}
              </Link>
            </li>
            <li>
              <Button onClick={logout}> Logout</Button>
            </li>
          </ul>
          <Button variant="outline-light" className="mx-2">
            new budget
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarSection;
