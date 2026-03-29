import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { ArrowsExpandVertical, ListColumnsReverse, Film } from 'react-bootstrap-icons';
import { ROUTES } from '../Routes';

function Sidebar() {
  return (
    <div className="sidebar border-secondary-subtle">
      <Nav className="flex-column parent">
        <Nav.Link as={Link} to={ROUTES.dashboard}>
          <span className="d-flex justify-content-between align-items-center text-nowrap">
            Media Magic
            <ArrowsExpandVertical />
          </span>
        </Nav.Link>
      </Nav>

      <Nav className="flex-column children">
        <Nav.Link as={Link} to={ROUTES.dashboard}>
          <span className="d-flex justify-content-between align-items-center text-nowrap">
            Dashboard
            <ListColumnsReverse />
          </span>
        </Nav.Link>
        <Nav.Link as={Link} to={ROUTES.mediaConverter}>
          <span className="d-flex justify-content-between align-items-center text-nowrap">
            Media Converter
            <Film />
          </span>
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
