import Row from 'react-bootstrap/Row';
import FilePreview from './FilePreview';
import FileInfo from './FileInfo';
import ConversionOptions from './ConversionOptions';

function EditMedia({ file }: { file: File }) {
    return (
        <>
            {file && (
                <Row className="mt-4">
                    <FilePreview file={file} />
                    <FileInfo file={file} />
                    <ConversionOptions file={file} />
                </Row>
            )}
        </>
    );
}

export default EditMedia;
