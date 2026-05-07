import axios from 'axios';
import { API_URL } from '../../config/api';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import formatFileSize from '../FormatFileSize';

type User = {
    id: string;
    email: string;
    displayName: string;
};

type Props = {
    user: User | null;
};

type MediaStats = {
    fileCount: number;
    totalSize: number;
    storageRemaining: number;
};

function MediaStats({ user }: Props) {
    const [stats, setStats] = useState<MediaStats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (!user) return;

        const fetchStats = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/user/stats`);
                setStats(response.data);
            } catch (error) {
                const err = axios.isAxiosError(error) ? error : undefined;
                setMessage(err?.response?.data?.error || 'Error fetching stats');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [user]);

    return (
        <Card className="border rounded bg-white">
            <Card.Body>
                <Card.Title>Media</Card.Title>

                {loading ? (
                    <Spinner animation="border" role="status" size="sm" />
                ) : stats ? (
                    <div className="text-start">
                        <label htmlFor="storage-info">Storage Information</label>
                        <div id="storage-info">
                            <div>
                                <span>Total Files:</span>&nbsp;
                                <strong>{stats.fileCount}</strong>
                            </div>
                            <div>
                                <span>Storage Used:</span>&nbsp;
                                <strong>{formatFileSize(stats.totalSize)}</strong>
                            </div>
                            <div>
                                <span>Available:</span>&nbsp;
                                <strong>{formatFileSize(stats.storageRemaining)}</strong>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>{message || 'No stats available.'}</p>
                )}
            </Card.Body>
        </Card>
    );
}

export default MediaStats;
