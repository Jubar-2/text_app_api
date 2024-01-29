/*
 * Title: Text app api.
 * Description: Create hendler function for hendl user request.
 * Author: Md Jubaer Rahman
 * Date: 26/12/2023
 *
 */

// Dependencies
import { decode } from 'querystring';
import { StringDecoder } from "string_decoder";
import url from "url";
import routers from "../router/routes.js";

// Funsition
const requestHendler = (req, res) => {
   
    const pars = url.parse(req.url, false);
    const trimPath = pars.pathname.replace(/^\/|\/+$/g, "");
    const method = req.method.toUpperCase();
    const stringDecoder = new StringDecoder("utf8");
    const queryString = pars.query;
     const queryObj = decode(queryString);
    //   const queryString = pars.query;

    //chacking path find or not
    
    const chosenHendler = routers[trimPath]
        ? routers[trimPath]
        : routers["nohendler"];

    let bodyData="";

    const requsetHendler = {
        trimPath,
        method,
        queryObj
    };

    req.on("data", (buffer) => {
        bodyData += stringDecoder.write(buffer);
    });

    req.on("end", () => {
        bodyData += stringDecoder.end();
        requsetHendler.bodyData = bodyData;
        chosenHendler(requsetHendler, (status, payload) => {
            const statusCode = typeof status === "number" ? status : 500;
            const payloadObject = typeof payload === "object" ? payload : {};
            const payloadObjectString = JSON.stringify(payloadObject);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            
            res.end(payloadObjectString);
        });
    });
};

export default requestHendler;
