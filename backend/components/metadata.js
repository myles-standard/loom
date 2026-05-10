import ffmpeg from 'fluent-ffmpeg';

async function videoMetadata(file) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(file.path, (err, metadata) => {
            if (err) {
                console.error('Error probing video file:', err);
                reject(err);
            } else {
                resolve(metadata);
            }
        });
    });
}

function processMetadata(metadata) {
    const videoStream = metadata.streams.find(s => s.codec_type === 'video');
    const audioStream = metadata.streams.find(s => s.codec_type === 'audio');
    const format = metadata.format;

    let obj = {
        video: {},
        audio: {},
        format: {},
    };

    if (videoStream) {
        obj.video.codec = videoStream.codec_name.toUpperCase() || 'unknown';
        obj.video.resolution = `${videoStream.width || 'unknown'}x${videoStream.height || 'unknown'}`;
        obj.video.displayAspectRatio = videoStream.display_aspect_ratio || 'unknown';
        
        const [num, den] = videoStream.avg_frame_rate ? videoStream.avg_frame_rate.split('/').map(Number) : [0, 1];
        obj.video.frameRate = den !== 0 ? (num / den).toFixed(2) + ' FPS' : 'unknown';
    }

    if (audioStream) {
        obj.audio.codec = audioStream.codec_name.toUpperCase() || 'unknown';
        obj.audio.channels = audioStream.channels || 'unknown';
        obj.audio.channelLayout = audioStream.channel_layout || 'unknown';
        obj.audio.sampleRate = audioStream.sample_rate || 'unknown';
    }

    if (format) {
        obj.format.formatLongName = format.format_long_name || 'unknown';
        obj.format.duration = format.duration ? format.duration.toFixed(2) || 'unknown' : 'unknown';
        obj.format.size = format.size ? (format.size / (1024 * 1024)).toFixed(2) + ' MB' : 'unknown';
        obj.format.bitRate = format.bit_rate ? (format.bit_rate / 1000).toFixed(2) + ' kbps' : 'unknown';
        obj.format.encoder = format.tags && format.tags.encoder ? format.tags.encoder : 'unknown';
    }

    return {
        object: obj,
    };
}

const mediaMetadata = {
    videoMetadata,
    processMetadata,
};

export default mediaMetadata;
