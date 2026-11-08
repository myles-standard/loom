import { ArrowBarRight, ListColumnsReverse, Film } from 'react-bootstrap-icons';
import { getRouteObject as routes } from '../Routes';
import { useLocation } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';

type SidebarProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

function Sidebar({ open, setOpen }: SidebarProps) {
    const location = useLocation();
    const currentBasePath = String(location.pathname.match(/^\/[^/]+/));
    const getActiveClass = (routePath: string) => (currentBasePath == routePath ? 'active' : '');

    return (
        <div className="d-flex position-relative sidebar">
            <button onClick={() => setOpen(!open)} className="btn-collapse position-absolute">
                <ArrowBarRight className={open ? 'rotated' : ''} />
            </button>

            <div className="sidebar-container d-flex flex-column">
                <SidebarLayout
                    self="dashboard"
                    open={open}
                    activeClass={getActiveClass(routes('dashboard').route)}
                    Icon={ListColumnsReverse}
                />
                <SidebarLayout
                    self="videoConverter"
                    open={open}
                    activeClass={getActiveClass(routes('videoConverter').route)}
                    Icon={Film}
                />
            </div>
        </div>
    );
}

export default Sidebar;
