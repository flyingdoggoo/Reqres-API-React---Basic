import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import bocchiLogo from '../assets/images/bocchi.jpg'
const Header = (props) => {
    return (<>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
        <img
          src={bocchiLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Bocchi the Rock logo"
        ></img> 
          <span className="ms-2">Bocchi the Rock!</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={window.location.pathname}>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/users">Users Management</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}

export default Header