class RegistrationError extends Error{
    constructor(message) {
        super(message)
        this.name = 'RegistrarionError';
        this.statusCode = 400;
    }
}

module.exports = RegistrationError
