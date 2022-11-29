import {Db, MongoClient} from "mongodb";
const connection = process.env.ATLAS_URI ;
const client = new MongoClient(connection);

let db: Db;

export const connectToServer = async () => {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Successfully connected to MongoDB.')   
}

const getDB = () => db;

export default getDB;