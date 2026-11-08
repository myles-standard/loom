import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { type ElementType } from 'react';
import { getRouteObject as routes } from '../Routes';
import type { RouteKey } from '../Routes';
import { Collapse } from 'react-bootstrap';

function SidebarLayout({
    self,
    open,
    activeClass,
    Icon,
}: {
    self: RouteKey;
    open: boolean;
    activeClass: string;
    Icon: ElementType;
}) {
    return (
        <Nav.Link
            as={Link}
            to={routes(self).route}
            className={`d-flex justify-content-between align-items-center mb-1 ${activeClass}`}
        >
            <Collapse in={open} dimension="width">
                <div className="text-nowrap">{routes(self).label}&nbsp;&nbsp;</div>
            </Collapse>
            <div className="sidebar-icon-only d-flex justify-content-center align-items-center">
                <Icon />
            </div>
        </Nav.Link>
    );
}

export default SidebarLayout;
