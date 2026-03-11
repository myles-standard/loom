import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import ConversionOptions from './components/ConversionOptions';
import FileInfo from './components/FileInfo';
import UploadFrom from './components/UploadForm';
import FilePreview from './components/FilePreview';

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <Banner />
      <UploadFrom setFile={setFile} />
      {file && (
            <FilePreview file={file} />
          <FileInfo file={file} />
          <ConversionOptions file={file} />
        </>
      )}
    </div>
  )
}

export default App
