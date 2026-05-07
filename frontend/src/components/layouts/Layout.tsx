import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import './layout.css';
import { useState } from 'react';

function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="app-layout d-flex">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="main">
                <Topbar />
                <div className="content">
                    <Outlet context={{ sidebarOpen }} />
                </div>
            </div>
        </div>
    );
}

export default Layout;
