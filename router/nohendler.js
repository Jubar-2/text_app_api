
const nohendler = (noteneed,calBack)=>{
        calBack(404, {
            message: "Url not found"
        });
}

export default nohendler;