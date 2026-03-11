import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import formatFileSize from './FormatFileSize';

type Props = {
    setFile: (file: File | null) => void;
}

function UploadForm({ setFile }: Props) {
    return (
        <Form className="border rouded bg-light p-2">
            <Form.Group controlId="file" className="mb-3">
                <Form.Label>Select a media file:</Form.Label>
                <Form.Control
                    accept="video/*"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    type="file"
                />
            </Form.Group>

            {/* File Info */}
            {file && (
                <div className="mb-3 small text-muted">
                    <div><strong>File:</strong> {file.name}</div>
                    <div><strong>Size:</strong> {formatFileSize(file.size)}</div>
                </div>
            )}
            </Button>
        </Form>
    )
}

export default UploadForm;
