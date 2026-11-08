import { API_URL } from './config/constants';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getRouteObject as routes } from './components/Routes';
import { UserProvider } from './contexts/UserContext';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Dashboard from './components/Dashboard';
import EditMedia from './components/EditMedia';
import GuardRoute from './components/GuardRoute';
import Layout from './components/layouts/Layout';
import Login from './components/auth/Login';
import VideoConverter from './components/VideoConverter';

import './App.css';
import './index.css';

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

const socket = io(API_URL, {
    withCredentials: true,
});

function App() {
    const [file, setFile] = useState<File | null>(null);
    const [primaryTheme, setPrimaryTheme] = useState<string>('#FFFFFF');

    useEffect(() => {
        const handdleUpdates = (data: { value: string }) => {
            console.log('Received colour update:', data.value);
            setPrimaryTheme(data.value);
        };

        socket.on('colourUpdate', handdleUpdates);

        return () => {
            socket.off('colourUpdate', handdleUpdates);
        };
    }, []);

    useEffect(() => {
        console.log('Updating CSS variable to:', primaryTheme);
        const root = document.documentElement;
        root.style.setProperty('--primary-theme', primaryTheme);
    }, [primaryTheme]);

    return (
        <UserProvider>
            <Router>
                <Container className="px-0" fluid>
                    <Routes>
                        {/* Public Routes */}
                        <Route path={routes('home').route} element={<Login />} />

                        {/* Protected Routes */}
                        <Route element={<GuardRoute />}>
                            <Route element={<Layout />}>
                                <Route path={routes('dashboard').route} element={<Dashboard />} />
                                <Route
                                    path={routes('videoConverter').route}
                                    element={<VideoConverter file={file} setFile={setFile} />}
                                />
                                <Route
                                    path={routes('videoConverterEdit').route}
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
