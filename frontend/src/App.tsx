import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import VideoConverter from './components/VideoConverter';
import EditMedia from './components/EditMedia';
import Layout from './components/layouts/Layout';
import GuardRoute from './components/GuardRoute';
import { ROUTES } from './components/Routes';
import { API_URL } from './config/constants';
import axios from 'axios';
import { UserProvider } from './contexts/UserContext';

import './App.css';
import './index.css';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function App() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <UserProvider>
            <Router>
                <Container className="px-0" fluid>
                    <Routes>
                        {/* Public Routes */}
                        <Route path={ROUTES.home} element={<Login />} />

                        {/* Protected Routes */}
                        <Route element={<GuardRoute />}>
                            <Route element={<Layout />}>
                                <Route path={ROUTES.dashboard} element={<Dashboard />} />
                                <Route
                                    path={ROUTES.videoConverter}
                                    element={<VideoConverter file={file} setFile={setFile} />}
                                />
                                <Route
                                    path={ROUTES.videoConverterEdit}
                                    element={<EditMedia file={file}></EditMedia>}
                                ></Route>
                            </Route>
                        </Route>
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
