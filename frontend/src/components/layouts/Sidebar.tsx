import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar border-end border-secondary-subtle">

            <h4 className="mb-4">Media Magic</h4>

            <Nav className="flex-column">
                
                <Nav.Link as={Link} to ="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to ="/converter">Media Converter</Nav.Link>
                <Nav.Link as={Link} to ="/tool-a">Tool A</Nav.Link>
                <Nav.Link as={Link} to ="/tool-b">Tool B</Nav.Link>

            </Nav>

        </div>
    );
}

export default Sidebar;
