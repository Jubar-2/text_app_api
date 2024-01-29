import 'dotenv/config';
import http from 'http';
import requestHendler from './hendler/requestHendler.js';
// console.log(new Session());
const app ={};

app.createServer = ()=>{
    const server = http.createServer(requestHendler);
    server.listen(process.env.port,()=>{
        console.log(`server is start ${process.env.port}`)
    })
}

app.createServer();