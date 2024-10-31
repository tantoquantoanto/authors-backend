import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LucidePlane, LucideHome, LucideUser, LucideFacebook, LucideTwitter, LucideInstagram } from "lucide-react";
import { Link } from "react-router-dom";
import DestinationsSearchInput from "./Destinations/DestinationsSearchInput";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-primary">
          <LucidePlane size={28} className="me-2" /> TravelDest
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-dark">
              <LucideHome size={20} className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/destinations" className="text-dark">
              <LucidePlane size={20} className="me-1" /> Destinations
            </Nav.Link>
            <Nav.Link as={Link} to="/contatti" className="text-dark">
              Contatti
            </Nav.Link>
            <NavDropdown title={<span><LucideUser size={20} className="me-1 text-dark" /> Profile</span>} id="profile-dropdown">
              <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/reviews">My Reviews</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
            <DestinationsSearchInput/>
          </Nav>
          <Nav className="ms-3 d-flex align-items-center">
            <Nav.Link href="https://facebook.com" className="text-primary">
              <LucideFacebook size={20} />
            </Nav.Link>
            <Nav.Link href="https://twitter.com" className="text-primary">
              <LucideTwitter size={20} />
            </Nav.Link>
            <Nav.Link href="https://instagram.com" className="text-primary">
              <LucideInstagram size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;