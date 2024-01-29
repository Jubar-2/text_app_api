import 'dotenv/config';
import { MongoClient } from 'mongodb';
export default async function connectToCluster() {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(process.env.DB_URI);
        // console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        // console.log('Successfully connected to MongoDB Atlas!');
        const db =   mongoClient.db('textApp');
        const collection =  db.collection('user');
        const documents = await collection.find({}).toArray();
    console.log('Found the following records:');
    console.log(documents);
         mongoClient.close();
    } catch (error) {
      
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
    
 }

 