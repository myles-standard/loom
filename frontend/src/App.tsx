import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConversionOptions from './components/ConversionOptions';
import FileInfo from './components/FileInfo';
import FilePreview from './components/FilePreview';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/layouts/Layout';

import { UserProvider, UserContext } from './contexts/UserContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import './App.css';
import './index.css';

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <UserProvider>
      <Router>
        <Container className="">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashboardRoute file={file} setFile={setFile} />
                </Layout>
              }
            />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

function DashboardRoute({
  file,
  setFile,
}: {
  file: File | null;
  setFile: (f: File | null) => void;
}) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="loading">Loading</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Dashboard file={file} setFile={setFile} />
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

export default App;
