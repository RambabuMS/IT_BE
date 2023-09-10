const express = require('express');
const app = express();
const DB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/index');

dotenv.config();
const port = process.env.PORT | 5000;

DB();
app.use(cors())
app.use(express.json());
app.use("/api",routes);

app.listen(port,()=>console.log(`Server listening on ${port}`))

