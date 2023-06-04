class DatabaseError extends Error {
    private statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
        this.statusCode = 500;
    }
}

module.exports = DatabaseError
