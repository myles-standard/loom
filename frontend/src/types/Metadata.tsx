type Metadata = {
    object: {
        video: {
            codec: string;
            resolution: string;
            displayAspectRatio: string;
            frameRate: number;
        };
        audio: {
            codec: string;
            channels: number;
            channelLayout: string;
            sampleRate: number;
        };
        format: {
            formatLongName: string;
            duration: number;
            size: number;
            bitRate: string;
            encoder: string;
        };
    };
};

export type { Metadata };
