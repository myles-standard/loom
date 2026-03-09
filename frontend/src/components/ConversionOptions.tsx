import { useState } from 'react';

type Props = {
    file: File;
}

function ConversionOptions({ file }: Props) {
    const [format, setFormat] = useState<"mp4" | "webm" | "avi" | "mkv" | "gif">("mp4");

    const handleConvert = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("format", format);

        fetch("/api/convert", {
            method: "POST",
            body: formData,
        });
    };

    return (
        <div>
            <h3>Conversion Options</h3>
            <label htmlFor="format">Select output format:</label>
            <select id="format" value={format} onChange={(e) => setFormat(e.target.value as any)}>
                <option value="avi">AVI</option>
                <option value="gif">gif</option>
                <option value="mkv">MKV</option>
                <option value="mp4">MP4</option>
                <option value="webm">WebM</option>
            </select>
            <button onClick={handleConvert}>Convert</button>
        </div>
    )
}

export default ConversionOptions;
