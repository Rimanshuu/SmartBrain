// true only for full http(s) links, so we don't send half-typed text to the backend
export const isValidUrl = (value) => {
    try {
        const url = new URL(value.trim());
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
};
