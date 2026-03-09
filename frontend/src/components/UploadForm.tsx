import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
            <Button
                className="text-end"
                type="submit"
                variant="primary"
            >
                Upload
            </Button>
        </Form>
    )
}

export default UploadForm;
