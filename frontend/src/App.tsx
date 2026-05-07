import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import MediaConverter from './components/MediaConverter';
import Layout from './components/layouts/Layout';
import GuardRoute from './components/GuardRoute';
import { ROUTES } from './components/Routes';
import { API_URL } from '../src/config/api';
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
                <Container className="">
                    <Routes>
                        {/* Public Routes */}
                        <Route path={ROUTES.home} element={<Login />} />

                        {/* Protected Routes */}
                        <Route element={<GuardRoute />}>
                            <Route element={<Layout />}>
                                <Route path={ROUTES.dashboard} element={<Dashboard />} />
                                <Route
                                    path={ROUTES.mediaConverter}
                                    element={<MediaConverter file={file} setFile={setFile} />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
