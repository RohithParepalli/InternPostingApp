import express from 'express';
import dotenv from 'dotenv';
import { dbconnect } from './config/db.js';
import jobroutes from './routes/jobroute.js'
dotenv.config();
const Port = process.env.PORT||4000;
const app =express();
app.use(express.json());
app.use('/api/jobs',jobroutes);

app.listen(Port,()=>{
    dbconnect();
    console.log(`server running on port :${Port}`);
})