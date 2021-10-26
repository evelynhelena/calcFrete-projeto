import express from 'express';
const app = express();
import cors from "cors";
import router from "./routes.js";
import dotenv from 'dotenv';
dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(3333, () =>{
    console.log("Server Online");
})