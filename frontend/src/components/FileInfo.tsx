import formatFileSize from './FormatFileSize';
import Card from 'react-bootstrap/Card';
import type { Metadata } from '../types/Metadata';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useMemo } from 'react';

type Props = {
    file: File;
    metadata?: Metadata | null;
};

function FileInfo({ file, metadata }: Props) {
    function convertToMbps(bitRate: string): string {
        const numericBitRate = parseFloat(bitRate);
        if (isNaN(numericBitRate)) return 'unknown';
        return (numericBitRate / 1000).toFixed(2) + ' Mbps';
    }

    const displayInfo = useMemo(() => {
        if (!metadata) return null;

        const vStr = `${metadata.object.video.codec}, ${metadata.object.video.frameRate}, ${convertToMbps(metadata.object.format.bitRate)}`;
        const aStr = `${metadata.object.audio.codec}, ${metadata.object.audio.channels} channels (${metadata.object.audio.channelLayout}), ${metadata.object.audio.sampleRate} Hz`;
        const longest = Math.max(vStr.length, aStr.length);

        return { vStr, aStr, longest };
    }, [metadata]);

    const style = displayInfo
        ? {
              minWidth: `${displayInfo.longest}ch`,
          }
        : {};

    return (
        <div>
            <h3>File Details</h3>
            <p>
                <b>Name:</b> {file.name}
            </p>
            <p>
                <b>Size:</b> {formatFileSize(file.size)}
            </p>
            <p>
                <b>Type:</b> {file.type}
            </p>
            <p>
                <b>Last Modified:</b>{' '}
                {file.lastModified ? new Date(file.lastModified).toLocaleString() : 'Unknown'}
            </p>

            {metadata && displayInfo && (
                <Card className="border rounded bg-white">
                    <Card.Body>
                        <div>
                            <Row>
                                <Col>
                                    <strong>Tracks</strong>
                                </Col>
                                <Col>Video</Col>
                                <Col className="text-nowrap flex-grow-1" style={style}>
                                    {displayInfo.vStr}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col></Col>
                                <Col>Audio</Col>
                                <Col className="text-nowrap flex-grow-1" style={style}>
                                    {displayInfo.aStr}
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col>
                                    <strong>Resolution</strong>
                                </Col>
                                <Col></Col>
                                <Col style={style}>{metadata.object.video.resolution}</Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
                // <div>
                //     <h5>Metadata</h5>
                //     <pre style={{ fontSize: '0.8em', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                //         {JSON.stringify(metadata, null, 2)}
                //     </pre>
                // </div>
            )}
        </div>
    );
}

export default FileInfo;
