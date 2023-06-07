import 'dotenv/config';
import * as express from "express";
import * as cors from "cors";

const routes = require('./routes')

const {connectionDB} = require("./src/database/connetions.database");

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', routes);

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`running server in port: `,process.env.PORT || 3000)
})
// TODO: swagger implementation later
// swaggerDocument.host = process.env.SWAGGER_HOST || "localhost:3000"
//
// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument)
// );

connectionDB();
