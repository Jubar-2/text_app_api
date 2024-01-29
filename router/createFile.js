/*
 * Title:       Text app api.
 * Description: Creating api for create file page in text app.
 * Author:      Md Jubaer Rahman
 * Date:        26/12/2023
 *
 */



// Dependencies
//



const move = (requsetPropartis, calBack) => {
    const method = typeof requsetPropartis.method === "string" && requsetPropartis.method === "POST" ? true : false;

    if (method) {
        const requestedData = JSON.parse(requsetPropartis.bodyData);

        const fsName = typeof requestedData.fsName === 'string' && requestedData.fsName.length > 0  ? requestedData.fsName : false;

        const ext = 'text';

        const parent = typeof requestedData.parent === 'string'?  requestedData.parent : false;

    

        if (fsName && ext && parent  ) {

            const allData = {
                fsName,
                ext,
                parent
            };


            hendler.insert(allData,'dir',(val)=>{
                console.log(val);
                const insertedId = val.insertedId.toString();
                fileHandler.createFile(parent,insertedId,(err)=>{
                    if(!err){
                        calBack(200,{message:"susscess create"});
                    }else{
                         hendler.delete({_id:val.insertedId},'dir',(data)=>{
                            calBack(400,{message:"susscess create faild"});
                         })
                    }
                });
            });

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

export default move;

