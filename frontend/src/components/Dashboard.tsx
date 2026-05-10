import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useOutletContext } from 'react-router-dom';
import VideoStats from './layouts/VideoStats';
import ContentLayout from './layouts/ContentLayout';

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
        <ContentLayout self={['dashboard']}>
            <div className="dashboard-grid">
                <VideoStats user={user} />
                <VideoStats user={user} />
                <VideoStats user={user} />
            </div>
        </ContentLayout>
    );
}

export default Dashboard;
