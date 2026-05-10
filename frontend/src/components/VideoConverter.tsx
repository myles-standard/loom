import { useContext, useState } from 'react';
import UploadForm from './UploadForm';
import { UserContext } from '../contexts/UserContext';
import ContentLayout from './layouts/ContentLayout';
import { Navigate } from 'react-router-dom';

type Props = {
    file: File | null;
    setFile: (file: File | null) => void;
};

function VideoConverter({ file, setFile }: Props) {
    const { user } = useContext(UserContext);
    const [isUploaded, setIsUploaded] = useState(false);
    const [fileId, setFileId] = useState<string>('');

    if (!user) {
        return <p className="text-center mt-5">Loading…</p>;
    }

    if (isUploaded && fileId) return <Navigate to={`${fileId}`} relative="path" />;

    return (
        <ContentLayout self={['video', 'converter']}>
            <UploadForm
                file={file}
                setFile={setFile}
                onUploadSuccess={() => setIsUploaded(true)}
                onFileId={setFileId}
            />
        </ContentLayout>
    );
}

export default VideoConverter;
