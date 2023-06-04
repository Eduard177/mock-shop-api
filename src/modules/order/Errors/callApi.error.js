class CallApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = 500;
    }
}