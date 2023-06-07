class NotFoundError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}


module.exports = NotFoundError
