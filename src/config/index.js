const fs= require('fs');
const dotenv = require("dotenv");
const path = require("path");

class ConfigService {
    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = path.join(process.cwd(), `.env`);
            const existPath = fs.existsSync(envFilePath);
            if (!existPath) {
                console.log(`.env file does not exist: ${envFilePath}`);
                process.exit(0);
            }
            this.envConfig = dotenv.parse(fs.readFileSync(envFilePath));
        } else {
            this.envConfig = {
                PORT: process.env.PORT,
                MONGO_URI: process.env.MONGO_URI,
                SWAGGER_HOST: process.env.SWAGGER_HOST
            };
        }
    }

    get(key) {
        return this.envConfig[key];
    }
}

module.exports = {ConfigService}
