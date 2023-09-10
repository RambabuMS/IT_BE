import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import DB from './config/db.js';

const app = express();
dotenv.config();
const port = process.env.PORT | 5000;

DB();
app.use(cors());
app.use(express.json());
app.use("/api",routes);

app.listen(port,()=>console.log(`Server listening on ${port}`))