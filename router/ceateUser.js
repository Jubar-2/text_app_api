/*
 * Title:       Text app api.
 * Description: Creating api for create user page in text app.
 * Author:      Md Jubaer Rahman
 * Date:        26/12/2023
 *
 */

// Dependencies
import hendler from '../helper/croud.js';
import fileHandler from '../helper/fileSystems.js';
import utilise from '../helper/Hash.js';
//

const createUserHendler = (requsetPropartis, calBack) => {
    const method = typeof requsetPropartis.method === "string" && requsetPropartis.method === "POST" ? true : false;

    if (method) {
        const requestedData = JSON.parse(requsetPropartis.bodyData);

        const name = typeof requestedData.name === 'string' && requestedData.name.length > 0 && requestedData.name.length < 30 ? requestedData.name : false;

        const email = typeof requestedData.email === 'string' && requestedData.email.length > 0 ? requestedData.email : false;

        const password = typeof requestedData.password === 'string' && requestedData.password.length > 5 && requestedData.password.length < 22 ? requestedData.password : false;

        const confirmPassword = typeof requestedData.confirmPassword === 'string' && requestedData.confirmPassword.length > 5 && requestedData.confirmPassword.length < 22 && requestedData.confirmPassword === requestedData.password ? true : false;

        if (name && email && password && confirmPassword) {

            const allData = {
                name,
                email,
                password: utilise.hash(password)
            }
            hendler.find({ email: allData.email }, 'user', (err, data) => {
                if (err) {
                    hendler.insert(allData, 'user', (val) => {
                        const insertedId = val.insertedId.toString();
                        if (val) {
                            fileHandler.createFolder(insertedId, (err) => {
                                if (!err) {

                                    calBack(200, { message: "susscess fully insert", response: true })
                                } else {
                                    calBack(200, { message: "create folder faild" })
                                }
                            });
                        } else {
                            calBack(400, { message: "problem on insertId" })
                        }
                    });
                } else {
                    calBack(400, { message: "email is not unic" })
                }
            });

        } else {
            calBack(400, {
                message: "All find is requird"
            });
        }

    } else {
        calBack(400, {
            message: "Request method is must be post"
        });
    }
}


export default createUserHendler;