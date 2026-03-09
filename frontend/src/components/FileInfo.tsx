type Props = {
    file: File;
};

function fileSizeInMb(size: number): string {
    const oneMb = 1024 * 1024;
    return (size / oneMb).toFixed(2) + " MB";
}

function FileInfo({ file }: Props) {
    return (
        <div>
            <h3>File Details</h3>
            <p><b>Name:</b> {file.name}</p>
            <p><b>Size:</b> {fileSizeInMb(file.size)}</p>
            <p><b>Type:</b> {file.type}</p>
            <p><b>Last Modified:</b> {file.lastModified ? new Date(file.lastModified).toLocaleString() : "Unknown"}</p>
        </div>
    )
}

export default FileInfo;
