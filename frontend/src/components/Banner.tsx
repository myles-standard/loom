import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logout from './auth/Logout';
import NavDropdown from 'react-bootstrap/NavDropdown';

// TODO: Repurpose this as a topbar when the user is logged out

function Banner() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Media Magic</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/auth/google">Login</Nav.Link>
                        <Logout />
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <NavDropdown title="Options" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#option1">Option 1</NavDropdown.Item>
                            <NavDropdown.Item href="#option2">Option 2</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Banner;
