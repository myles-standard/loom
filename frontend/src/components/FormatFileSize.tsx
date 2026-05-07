/**
 * Humanize file sizes by converting bytes to megabytes and formatting the result with two decimal places.
 * @param bytes
 * @returns
 */
function formatFileSize(bytes: number): string {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
}

export default formatFileSize;
