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

    const isValid = (str: string) => {
        return !(
            str.includes('unknown') ||
            str.includes('unknown') ||
            String(str.toLowerCase).includes('n/a')
        );
    };

    const displayInfo = useMemo(() => {
        if (!metadata) return null;

        console.log(metadata.object.video.frameRate, typeof metadata.object.video.frameRate);

        const vCodec = {
            value: metadata.object.video.codec,
            isValid() {
                return isValid(String(this.value));
            },
        };
        const vFrameRate = {
            value: metadata.object.video.frameRate,
            isValid() {
                return isValid(String(this.value));
            },
        };
        const aCodec = {
            value: metadata.object.audio.codec,
            isValid() {
                return isValid(String(this.value));
            },
        };
        const aChannels = {
            value: metadata.object.audio.channels,
            isValid() {
                return isValid(String(this.value));
            },
        };
        const aChannelLayout = {
            value: metadata.object.audio.channelLayout,
            isValid() {
                return isValid(String(this.value));
            },
        };
        const aSampleRate = {
            value: metadata.object.audio.sampleRate + ' Hz',
            isValid() {
                return isValid(String(this.value));
            },
        };

        console.log(aCodec, aCodec.isValid, aCodec.value);

        const vStr = `${vCodec.isValid() ? vCodec.value : ''}, ${vFrameRate.isValid() ? vFrameRate.value : ''}, ${convertToMbps(metadata.object.format.bitRate)}`;
        const aStr = `${aCodec.isValid() ? aCodec.value : ''}, ${aChannels.isValid() ? aChannels.value : ''} channels (${aChannelLayout.isValid() ? aChannelLayout.value : ''}), ${aSampleRate.isValid() ? aSampleRate.value : ''}`;
        const longest = Math.max(vStr.length, aStr.length);

        return { vStr, aStr, longest };
    }, [metadata]);

    const style = displayInfo
        ? {
              minWidth: `${displayInfo.longest}ch`,
          }
        : {};

    return (
        <div className="file-info" id="file-info">
            <h3>File Details</h3>
            <p>
                <span className="file-info-label">Name:</span> {file.name}
            </p>
            <p>
                <span className="file-info-label">Size:</span> {formatFileSize(file.size)}
            </p>
            <p>
                <span className="file-info-label">Type:</span> {file.type}
            </p>
            <p>
                <span className="file-info-label">Last Modified:</span>{' '}
                {file.lastModified ? new Date(file.lastModified).toLocaleString() : 'Unknown'}
            </p>

            {metadata && displayInfo && (
                <Card className="border bg-transparent primary-theme">
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
            )}
        </div>
    );
}

export default FileInfo;
