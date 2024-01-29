/*
 * Title:       Text app api.
 * Description: Creating api for create file page in text app.
 * Author:      Md Jubaer Rahman
 * Date:        26/12/2023
 *
 */

// Dependencies
import hendler from '../helper/croud.js';
//



const readAll = async (requsetPropartis, calBack) => {
    const method = typeof requsetPropartis.method === "string" && requsetPropartis.method === "GET" ? true : false;

    if (method) {
        const requestedData = requsetPropartis.queryObj.id;

        const userDir = typeof requestedData === 'string' && requestedData.length > 0 ? requestedData : false;

        if (userDir) {
            const dataFlow = [];
            const filter = { parent: "6591a18e2b96f0eb45874687" };
            let xs = "";
            
            const makingOutput = async (element) => {
                const x = {
                    fsName: element.fsName,
                    ext: element.ext,
                    parent: []
                }
             

                let returnValue;
               
            return  await  hendler.findAll({ parent: element._id.toString() }, 'dir', async (err, data) => {
                    if (!err && data) {
                        if(data.length > 0){
                            for(let i = 0 ; i < data.length ; i++){

                                data[i].child =  await makingOutput(data[i]);
                               
                            }
                            
                            return data;
                            
                        }else{
                            console.log(`=${data}`);
                          return  returnValue = [];
                        }
                       
                    }else{
                       return returnValue = [];
                    }
                });
                
            }

       await  hendler.findAll(filter, 'dir', async (err, data) => {
            if (!err && data) {
                for(let i = 0 ; i<data.length ; i++){
                    data[i].child = await makingOutput(data[i]);
                    dataFlow.push(data[i]);
                }
              
                calBack(200,dataFlow);
            }else{
                calBack(400, {
                    message: "Request method is must be post"
                });
            }
        })

        await hendler.mongoClient.close();
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

export default readAll;

