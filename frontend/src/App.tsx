import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import ConversionOptions from './components/ConversionOptions';
import FileInfo from './components/FileInfo';
import UploadFrom from './components/UploadForm';

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <Banner />
      <UploadFrom setFile={setFile} />
      {file && (
        <>
          <FileInfo file={file} />
          <ConversionOptions file={file} />
        </>
      )}
    </div>
  )
}

export default App
