import 'dotenv/config';
import { MongoClient } from 'mongodb';

const hendler = {};

const connectToCluster = async () => {
    hendler.mongoClient;

    try {
        hendler.mongoClient = new MongoClient(process.env.DB_URI);
        // console.log('Connecting to MongoDB Atlas cluster...');
        await hendler.mongoClient.connect();
        // console.log('Successfully connected to MongoDB Atlas!');
        // const db = mongoClient.db('student');
        // const collection =  db.collection('class_6');
        // const documents = await collection.find({}).toArray();
        // console.log('Found the following records:');


    } catch (error) {

        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }

}


hendler.insert = async (obj, database, calBack) => {

    await connectToCluster();
    try {
        if (hendler['mongoClient']) {

            const insetObj = typeof obj === 'object' ? obj : false;

            if (insetObj) {
                const db = hendler.mongoClient.db('textApp');
                const collection = db.collection(database);
                const result = await collection.insertOne(obj);
                await hendler.mongoClient.close();
                calBack(result);
            } else { await hendler.mongoClient.close(); }


        }
    } catch (err) {
        console.log(err)
    }
}

hendler.delete = async (obj, database, calBack) => {
    await connectToCluster();
    try {
        if (hendler['mongoClient']) {

            const insetObj = typeof obj === 'object' ? obj : false;
            if (insetObj) {
                const db = hendler.mongoClient.db('textApp');
                const collection = db.collection(database);
                const data = await collection.deleteOne(insetObj);
                await hendler.mongoClient.close();
                calBack(data);
            } else {
                await hendler.mongoClient.close();
            }

        }
    } catch (err) {
        await hendler.mongoClient.close();
        console.log(err)
    }
}

hendler.update = async (obj, updteObj, database, calBack) => {
    await connectToCluster();
    try {
        if (hendler['mongoClient']) {

            const insetObj = typeof obj === 'object' ? obj : false;
            const updatedObj = typeof obj === 'object' ? updteObj : false;
            if (insetObj && updatedObj) {
                const db = hendler.mongoClient.db('textApp');
                const collection = db.collection(database);
                const updateData = { $set: updatedObj }
                const data = await collection.updateOne(insetObj, updateData, { upsert: true });
                await hendler.mongoClient.close();
                calBack(data);
            } else {
                await hendler.mongoClient.close();
            }

        }
    } catch (err) {
        await hendler.mongoClient.close();
        // console.log(err)
    }
}

// hendler.update({_id: new ObjectId('65998aad755fc93c5d17c141') },{parent:"udated 1 "},'dir',(data)=>{
// console.log(data)
// });

hendler.find = async (obj,calectionName, calBack) => {
    await connectToCluster();
    try {
        if (hendler['mongoClient']) {

            const insetObj = typeof obj === 'object' ? obj : false;
            if (insetObj) {
                const db = hendler.mongoClient.db('textApp');
                const collection = db.collection(calectionName);
                const data = await collection.find(insetObj).toArray();
                const dataLength = data.length > 0 ? false : true;
                 await hendler.mongoClient.close();
                // console.log("close")
               return calBack(dataLength, data);
            } else {
                await hendler.mongoClient.close();
            }

        }
    } catch (err) {
        await hendler.mongoClient.close();
       
         console.log(err)
    }
}

hendler.findAll = async (obj,calectionName, calBack) => {
    await connectToCluster();
    try {
        if (hendler['mongoClient']) {

            const insetObj = typeof obj === 'object' ? obj : false;
            if (insetObj) {
                const db = hendler.mongoClient.db('textApp');
                const collection = db.collection(calectionName);
                const data = await collection.find(insetObj).toArray();
                const dataLength = data.length > 0 ? false : true;
                // await hendler.mongoClient.close();
                // console.log("close")
               return calBack(dataLength, data);
            } else {
                await hendler.mongoClient.close();
            }

        }
    } catch (err) {
        await hendler.mongoClient.close();
        calBack(true, null);
        // console.log(err)
    }
}


export default hendler;