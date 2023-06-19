import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';

function NavbarSection() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">smartBudget</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Text>
          {" "}
        </Navbar.Text>
        <Navbar.Collapse className="justify-content-end">
        <Button>New Budget</Button>
        <div></div>
          <Navbar.Text>
            Signed in as: <a href="profile">CSS</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarSection;
