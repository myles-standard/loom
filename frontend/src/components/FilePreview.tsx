type Props = {
    file: File;
};

/**
 * Preview the uploaded video on request.
 * @returns
 */
function FilePreview({ file }: Props) {
    return (
        <div className="d-flex justify-content-center">
            <div className="">
                <strong>
                    <span className="d-block">Preview:</span>
                </strong>
                <video id="file-preview" controls width="100%" height="auto">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default FilePreview;
