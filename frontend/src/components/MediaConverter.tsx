import { useContext, useState } from 'react';
import UploadFrom from './UploadForm';
import { UserContext } from '../contexts/UserContext';
import EditMedia from './EditMedia';

type Props = {
    file: File | null;
    setFile: (file: File | null) => void;
};

function MediaConverter({ file, setFile }: Props) {
    const { user } = useContext(UserContext);
    const [isUploaded, setIsUploaded] = useState(false);

    if (!user) {
        return <p className="text-center mt-5">Loading…</p>;
    }

    const handleReset = () => {
        setFile(null);
        setIsUploaded(false);
    };

    return (
        <div className="text-center mt-5">
            <h2>Media Converter</h2>

            {!isUploaded ? (
                <UploadFrom
                    file={file}
                    setFile={setFile}
                    onUploadSuccess={() => setIsUploaded(true)}
                />
            ) : (
                <div className="animate-fade-in">
                    <div>
                        <p className="mb-4">
                            File uploaded successfully! You can now convert your media.
                        </p>
                        <button className="btn btn-secondary" onClick={handleReset}>
                            Upload Another File
                        </button>
                    </div>
                    {file && <EditMedia file={file} />}
                </div>
            )}
        </div>
    );
}

export default MediaConverter;
