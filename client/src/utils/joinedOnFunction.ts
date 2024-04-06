const timeSince = (timestamp: string): string => {
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = new Date(timestamp);
    const now = new Date();

    const yearDiff = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();

    // Check if the timestamp is within the current year
    if (yearDiff === 0) {
        // Check if the timestamp is within the current month
        if (monthDiff === 0) {
            return `${months[date.getMonth()]} ${date.getFullYear()}`;
        } else {
            return `${months[date.getMonth()]} ${date.getFullYear()}`;
        }
    } else {
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
};

export default timeSince;
