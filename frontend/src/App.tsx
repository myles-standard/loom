import { useState } from 'react';
import Banner from './components/Banner';
import ConversionOptions from './components/ConversionOptions';
import FileInfo from './components/FileInfo';
import UploadFrom from './components/UploadForm';
import FilePreview from './components/FilePreview';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Banner />
      <Container>
        <UploadFrom file={file} setFile={setFile} />
        {file && (
          <Row className="mt-4">
            <FilePreview file={file} />
            <FileInfo file={file} />
            <ConversionOptions file={file} />
          </Row>
        )}
      </Container>
    </>
  )
}

export default App
