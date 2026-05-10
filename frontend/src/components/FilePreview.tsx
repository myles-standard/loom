type Props = {
    file: File;
};

/**
 * Preview the uploaded video on request.
 * @returns
 */
function FilePreview({ file }: Props) {
    return (
        <div>
            <h5>Source Preview</h5>
            <video controls height="600">
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default FilePreview;
