class CallApiError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = 444;
    }
}

module.exports = CallApiError;