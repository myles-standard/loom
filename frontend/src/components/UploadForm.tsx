import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Check2Circle, XLg } from 'react-bootstrap-icons';
import axios from 'axios';
import formatFileSize from './FormatFileSize';

import './UploadForm.css';

type Props = {
    file: File | null;
    setFile: (file: File | null) => void;
    onUploadSuccess: () => void;
};

function UploadForm({ file, setFile, onUploadSuccess }: Props) {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [progress, setProgress] = useState(0);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files?.[0] || null);
        setMessage('');
        setProgress(0);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (event) => {
                    if (!event.total) return;
                    const percentCompleted = Math.round((event.loaded * 100) / event.total);
                    setProgress(percentCompleted);
                },
            });

            setMessage('Upload successful!');
            onUploadSuccess();
        } catch (error) {
            const err = axios.isAxiosError(error) ? error : undefined;
            setMessage(err?.response?.data?.error || 'An error occurred during upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Form className="border rounded bg-light p-2 upload-form" onSubmit={handleSubmit}>
            <Form.Group controlId="file" className="mb-3">
                <Form.Label>Select a media file:</Form.Label>

                <Form.Control
                    accept="video/*"
                    name="file"
                    onChange={handleFileChange}
                    type="file"
                />
            </Form.Group>

            {/* File Info */}
            {file && (
                <div className="mb-3 small text-muted">
                    <div>
                        <strong>File:</strong> {file.name}
                    </div>
                    <div>
                        <strong>Size:</strong> {formatFileSize(file.size)}
                    </div>
                </div>
            )}

            {/* Upload Progress */}
            {uploading && <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />}

            <Button type="submit" disabled={!file || uploading}>
                {uploading ? (
                    <>
                        <Spinner size="sm" className="me-2" animation="border" />
                        Uploading...
                    </>
                ) : (
                    'Upload'
                )}
            </Button>

            {message && (
                <div className="mt-3">
                    {message.includes('successful') ? (
                        <Check2Circle className="text-success me-2" />
                    ) : (
                        <XLg className="text-danger me-2" />
                    )}
                    {message}
                </div>
            )}
        </Form>
    );
}

export default UploadForm;
