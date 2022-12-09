import { User } from "../db/types";
import { expressjwt } from 'express-jwt';
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import getDB from "../db";
import { ObjectId } from "mongodb";



// export default (req, res, next) => {
//     const authHeader = req.headers["authorization"]
//     const token = authHeader
//     if (!token) {
//         return res.sendStatus(401)
//     } else {
//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             console.log(err)
//             if (err) {
                
//                 return res.sendStatus(403)
//             }
//             req.user = user
//             res.json(user)
//             next();
//         })
//     }
// }

const injectUser = async (req:any, res: Response, next: NextFunction) => {
    const db = getDB();
    const users = db.collection<User>('user');
    if (!req.headers.id) {
        req.headers.id = new ObjectId(req.headers.id);
        req.headers.user = await users.findOne({
            _id: req.auth.id
        })
        console.log(req.headers.user)
        
    }
    next()
}

export default () => [
    expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    injectUser,
];