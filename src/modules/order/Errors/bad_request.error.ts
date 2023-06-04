class BadRequestError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

module.exports = BadRequestError;