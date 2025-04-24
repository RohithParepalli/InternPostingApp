import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { dbconnect } from './config/db.js';
import jobroutes from './routes/jobroute.js'
dotenv.config();
const Port = process.env.PORT||4000;
const app =express();
const __dirname = path.resolve();
app.use(express.json());
app.use('/api/jobs',jobroutes);
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/dist')));
    app.get('/{*any}',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'));
    })
}
app.listen(Port,()=>{
    dbconnect();
    console.log(`server running on port :${Port}`);
})