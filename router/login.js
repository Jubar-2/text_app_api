/*
 * Title:       Text app api.
 * Description: Creating api for login user page in text app.
 * Author:      Md Jubaer Rahman
 * Date:        31/12/2023
 *
 */

// Dependencies
import hendler from '../helper/croud.js';
import utilise from '../helper/Hash.js';
//

const loginUserHendler = (requsetPropartis, calBack) => {
    const method = typeof requsetPropartis.method === "string" && requsetPropartis.method === "POST" ? true : false;

    if (method) {

        const requestedData = JSON.parse(requsetPropartis.bodyData);

        const email = typeof requestedData.email === 'string' && requestedData.email.length > 0 ? requestedData.email : false;

        const password = typeof requestedData.password === 'string' && requestedData.password.length > 5 && requestedData.password.length < 22 ? requestedData.password : false;


        if (email && password) {

            const allData = {
                email,
                password
            };
            hendler.find({ email: allData.email }, 'user', (err, data) => {

                if (data && !err) {
                    if (data[0].password === utilise.hash(password)) {
                        calBack(200, {
                            login: true,
                            message: "login sussess"
                        });
                    } else {
                        calBack(400, {
                            login: false,
                            message: "password is not match"
                        });
                    }
                } else {
                    calBack(400, { message: "email is not exeists" });
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


export default loginUserHendler;