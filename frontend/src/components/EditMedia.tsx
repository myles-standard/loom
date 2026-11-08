import FilePreview from './FilePreview';
import FileInfo from './FileInfo';
import ConversionOptions from './ConversionOptions';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import type { Metadata } from '../types/Metadata';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../src/config/constants';
import ContentLayout from './layouts/ContentLayout';

function EditMedia({
    file: initialFile,
    metadata: initialMetadata,
}: {
    file: File | null;
    metadata?: Metadata | null;
}) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [metadata, setMetadata] = useState<Metadata | null>(initialMetadata || null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/media/${id}`);
                const data = response.data;

                setMetadata({ object: data.metadata });
            } catch (error) {
                console.error('Failed to load file', error);
            } finally {
                setLoading(false);
            }
        };

        if (id && !metadata) {
            fetchFile();
        } else {
            setLoading(false);
        }
    }, [id, metadata]);

    if (loading) return <p className="loading">Loading video</p>;

    return (
        <ContentLayout self="videoConverterEdit">
            {initialFile && (
                <Row className="g-3 mt-0" id="edit-media-row">
                    <Col lg={7} id="edit-media-text">
                        <Tabs defaultActiveKey="summary" id="edit-media-tabs" className="mb-3">
                            <Tab eventKey="summary" title="Summary">
                                <FileInfo
                                    file={
                                        initialFile || ({ name: 'Uploaded Video', size: 0 } as File)
                                    }
                                    metadata={metadata}
                                />
                            </Tab>
                            <Tab eventKey="dimentions" title="Dimentions">
                                <p>Dimentions content goes here.</p>
                            </Tab>
                            <Tab eventKey="video" title="Video">
                                <ConversionOptions file={initialFile} />
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col lg={5} id="edit-media-preview">
                        <FilePreview file={initialFile} />
                    </Col>
                </Row>
            )}
        </ContentLayout>
    );
}

export default EditMedia;
