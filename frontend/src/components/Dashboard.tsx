import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import VideoStats from './layouts/VideoStats';
import ContentLayout from './layouts/ContentLayout';

function Dashboard() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p className="text-center mt-5">Loading…</p>;
    }

    return (
        <ContentLayout self="dashboard">
            <div className="dashboard-grid">
                <VideoStats user={user} />
                <VideoStats user={user} />
                <VideoStats user={user} />
            </div>
        </ContentLayout>
    );
}

export default Dashboard;
