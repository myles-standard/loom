import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_URL } from '../config/api';

type Props = {
    file: File;
};

type VideoFormat = 'mp4' | 'webm' | 'avi' | 'mkv' | 'gif';

function ConversionOptions({ file }: Props) {
    const [targetFormat, settargetFormat] = useState<'mp4' | 'webm' | 'avi' | 'mkv' | 'gif'>('mp4');
    const [isConverting, setIsConverting] = useState<boolean>(false);

    const handleConvert = async () => {
        setIsConverting(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetFormat', targetFormat);

        try {
            const response = await fetch(`${API_URL}/api/convert`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Conversion complete');

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `converted-mm.${targetFormat}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="p-3 border rounded bg-white mt-3" id="conversion-options">
            <h5>Conversion Options</h5>
            <Form.Group>
                <Form.Label for="conversion-format">Convert to:</Form.Label>
                <Form.Select
                    value={targetFormat}
                    onChange={(e) => settargetFormat(e.target.value as VideoFormat)}
                    className="mb-2"
                    id="conversion-format"
                >
                    <option value="avi">AVI</option>
                    <option value="gif">gif</option>
                    <option value="mkv">MKV</option>
                    <option value="mp4">MP4</option>
                </Form.Select>
                <Button onClick={handleConvert} variant="success" disabled={isConverting}>
                    {isConverting ? 'Processing...' : 'Convert'}
                </Button>
            </Form.Group>
        </div>
    );
}

export default ConversionOptions;
