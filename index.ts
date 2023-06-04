import * as express from "express";
import * as cors from "cors";

const routes = require('./routes')

const {connectionDB} = require("./src/database/connetions.database");

const app = express();
// const swaggerDocument = require("./swagger.json");

app.use(express.json());
app.use('/api', routes);

app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
