const timeSince = (timestamp: string): string => {
    const time = Date.parse(timestamp);
    const now = Date.now();
    const secondsPast = (now - time) / 1000;
    // const suffix = 'ago';

    const intervals: { [key: string]: number } = {
        y: 31536000,
        mon: 2592000,
        w: 604800,
        d: 86400,
        h: 3600,
        min: 60,
        s: 1
    };

    for (const key in intervals) {
        if (Object.prototype.hasOwnProperty.call(intervals, key)) {
            const interval = intervals[key];
            if (secondsPast >= interval) {
                const count = Math.floor(secondsPast / interval);
                return `${count}${key}`;
            }
        }
    }

    return '';
};

export default timeSince;
