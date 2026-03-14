import { useContext } from 'react';
import UploadFrom from './UploadForm';
import { UserContext } from '../contexts/UserContext';

type Props = {
    file: File | null;
    setFile: (file: File | null) => void;
};

function Dashboard({ file, setFile }: Props) {
    const { user } = useContext(UserContext);

    // by the time Dashboard renders the route protector has already
    // checked user existence, but we still guard against null for TS.
    if (!user) {
        return <p className="text-center mt-5">Loading…</p>;
    }

    return (
        <div className="text-center mt-5">
            <h2>Dashboard</h2>
            <UploadFrom file={file} setFile={setFile} />
        </div>
    );
}

export default Dashboard;
