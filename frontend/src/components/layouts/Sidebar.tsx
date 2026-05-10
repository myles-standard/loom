import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { ArrowBarRight, ListColumnsReverse, Film } from 'react-bootstrap-icons';
import { ROUTES } from '../Routes';
import { Collapse } from 'react-bootstrap';

type SidebarProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

function Sidebar({ open, setOpen }: SidebarProps) {
    return (
        <div className="d-flex position-relative sidebar border-secondary-subtle">
            <button onClick={() => setOpen(!open)} className="btn-collapse position-absolute">
                <ArrowBarRight className={open ? 'rotated' : ''} />
            </button>

            <div className="sidebar-container d-flex flex-column">
                <Nav.Link
                    as={Link}
                    to={ROUTES.dashboard}
                    className="d-flex justify-content-between align-items-center"
                >
                    <Collapse in={open} dimension="width">
                        <div className="text-nowrap">Dashboard</div>
                    </Collapse>

                    <div className="sidebar-icon-only d-flex justify-content-center align-items-center">
                        <ListColumnsReverse />
                    </div>
                </Nav.Link>

                <Nav.Link
                    as={Link}
                    to={ROUTES.videoConverter}
                    className="d-flex justify-content-between align-items-center"
                >
                    <Collapse in={open} dimension="width">
                        <div className="text-nowrap">Video Converter</div>
                    </Collapse>

                    <div className="sidebar-icon-only d-flex justify-content-center align-items-center">
                        <Film />
                    </div>
                </Nav.Link>
            </div>
        </div>
    );
}

export default Sidebar;
