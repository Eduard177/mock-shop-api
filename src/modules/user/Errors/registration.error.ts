class RegistrationError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super(message)
        this.name = 'RegistrationError';
        this.statusCode = 400;
    }
}

module.exports = RegistrationError
