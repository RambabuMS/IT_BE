import express from 'express';
import bike from './bikes.js';
import user from './users.js';
import production from './productionRecord.js';

const app = express();
app.use("/",bike,user,production);

export default app;