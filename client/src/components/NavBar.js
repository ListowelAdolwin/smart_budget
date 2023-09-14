import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

const NavbarSection = (props) => {
  let { user, setUser, setAuthtokens, tokens } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("authtokens");
    setUser(null);
    setAuthtokens(null);
    return <Navigate to="/" replace />;
  };
  if (!user) {
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
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
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
              <li className="nav-item active"></li>
              <li>
                <Button onClick={logout}>Logout</Button>
              </li>
            </ul>
            <span className="user-avatar">
              <Button variant="outline-light" className="mx-2 rounded-circle">
                {user.name[0]}{user.name[1]}
              </Button>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default NavbarSection;
