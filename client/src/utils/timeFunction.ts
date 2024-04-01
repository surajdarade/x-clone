const timeSince = (timestamp: string): string => {
    const time = Date.parse(timestamp);
    const now = Date.now();
    const secondsPast = (now - time) / 1000;
    const suffix = 'ago';

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const key in intervals) {
        if (Object.prototype.hasOwnProperty.call(intervals, key)) {
            const interval = intervals[key];
            if (secondsPast >= interval) {
                const count = Math.floor(secondsPast / interval);
                return `${count} ${key} ${count > 1 ? '' : ''} ${suffix}`;
            }
        }
    }

    return '';
};

export default timeSince;
