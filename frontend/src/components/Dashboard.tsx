import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useOutletContext } from 'react-router-dom';
import MediaStats from './layouts/MediaStats';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {
    const { user } = useContext(UserContext);
    const { sidebarOpen } = useOutletContext<{ sidebarOpen: boolean }>();

    const rowClasses = sidebarOpen
        ? 'row-cols-1 row-cols-md-2 row-cols-lg-3'
        : 'row-cols-1 row-cols-md-2 row-cols-lg-4';

    if (!user) {
        return <p className="text-center mt-5">Loading…</p>;
    }

    return (
        <div className="mt-5" id="dashboard">
            <h2 className="mb-4">Dashboard</h2>
            <Row className={`g-4 ${rowClasses}`}>
                <Col>
                    <MediaStats user={user} />
                </Col>
                <Col>
                    <MediaStats user={user} />
                </Col>
                <Col>
                    <MediaStats user={user} />
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
