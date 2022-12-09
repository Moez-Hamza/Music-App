import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth';
import express from "express";
import { connectToServer }  from "./db";
import router from './routes/auth'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('hello Moez');
})


app.use("/auth", authRouter);
app.use(router);

connectToServer().then(async () => {
    app.listen(port, ()=>{
        return console.log(`Express is listening at port ${port} `)
    })
})

