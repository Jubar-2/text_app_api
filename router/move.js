/*
 * Title:       Text app api.
 * Description: Creating api for create file page in text app.
 * Author:      Md Jubaer Rahman
 * Date:        26/12/2023
 *
 */


// Dependencies
import { ObjectId } from 'mongodb';
import hendler from "../helper/croud.js";
//



const createFile = (requsetPropartis, calBack) => {
    const method = typeof requsetPropartis.method === "string" && requsetPropartis.method === "POST" ? true : false;

    if (method) {
        const requestedData = JSON.parse(requsetPropartis.bodyData);

        const oldPath = typeof requestedData.oldPath === 'string' && requestedData.oldPath.length > 0 ? requestedData.oldPath : false;

        const ext = typeof requestedData.ext === 'string' ? requestedData.ext : false;

        const newPath = typeof requestedData.newPath === 'string' ? requestedData.newPath : false;

        const baseFolder = typeof requestedData.baseFolder === 'string' ? requestedData.baseFolder : false;



        if (oldPath && ext && newPath && baseFolder) {

            const allData = {
                oldPath,
                newPath,
                ext
            };

            hendler.move(baseFolder, oldPath, newPath, (err,newParent) => {
                if (!err) {
                    hendler.update({_id: new ObjectId(newParent.file)},newParent.newParent,'dir',(obj)=>{
                        if(obj){
                            calBack(200,{message:"susscess movie"});
                        }
                    })
                }
            });

            // hendler.insert(allData,'dir',(val)=>{
            //     console.log(val);
            //     const insertedId = val.insertedId.toString();
            //     fileHandler.createFile(parent,insertedId,(err)=>{
            //         if(!err){
            //             calBack(200,{message:"susscess create"});
            //         }else{
            //              hendler.delete({_id:val.insertedId},'dir',(data)=>{
            //                 calBack(400,{message:"susscess create faild"});
            //              })
            //         }
            //     });
            // });

            // hendler.find({email:allData.email},(err, data) => {
            //     if(err){
            //         hendler.insert(allData ,(val)=>{
            //             const insertedId = val.insertedId.toString();
            //             if(val){
            //                 fileHandler.createFolder(insertedId,(err)=>{
            //                     if(!err){

            //                         calBack(200,{message:"susscess fully insert"})
            //                     }else{
            //                         calBack(200,{message:"create folder faild"})
            //                     }
            //                 });
            //             }else{
            //                 calBack(400,{message:"problem on insertId"})
            //             }
            //         });
            //     }else{
            //         calBack(400,{message:"email is not unic"})
            //     }
            // });

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

export default createFile;

