import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavbarSection = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home" className="mr-auto ps-5">
        smartBudget
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav className="me-5">
          <Nav.Link href="#account" className="me-4">
            Account
          </Nav.Link>
          <Button variant="outline-light" className="">new budget</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarSection;
