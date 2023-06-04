class AuthenticationError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
        this.statusCode = 401;
    }
}


module.exports = AuthenticationError
