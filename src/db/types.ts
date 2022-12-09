import { ObjectId } from "mongodb";

export interface User {
    email: string;
    password: string;
    username: string;
};

export interface Song {
    userId: ObjectId;
    filename: string;
    mimetype: string;
    title: string; 
    genre?: string; 
    release?:Date;
    duration: number;
    lyrics?:string;
    uploaded: Date; 
};