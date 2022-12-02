import dotenv from 'dotenv';
dotenv.config();

import authRouter from '../src/middlewares/verrifyAuth';
import express, { Request, Response, urlencoded } from "express";
import  getDB, { connectToServer }  from "./db";
import { User } from './db/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('hello Moez');
})

// app.use((error:Error,req:Request , res: Response )=>{
//     res.sendStatus(500).json({message : error.message});
// } )

app.get("/auth", authRouter);



// login
app.post('/login', async (req, res) => {
    const db = getDB();
    const users = db.collection<User>('user');
    const user = await users.findOne({
        email:req.body.email,
    });

    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if(user === null || !passwordValid){
        return res.status(401).json({
            accessToken: null ,
            message : 'Email or password incorrect'
        })
    }
    const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.status(200).json({accessToken})    
})




// registration 
app.post("/register",async (req, res) => {
    const db = getDB();
    const users = db.collection<User>('user');
    const password = await bcrypt.hash(req.body.password, 10);

    await users.insertOne({
        email:req.body.email,
        password,
        username:req.body.username,
    })
    res.status(200).json({message: 'Registred Suceesfully'})
})


connectToServer().then(async () => {
    app.listen(port, ()=>{
        return console.log(`Express is listening at port ${port} `)
    })
})

