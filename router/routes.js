import createUserHendler from "./ceateUser.js";
import createFile from "./createFile.js";
import createFolder from "./createFolder.js";
import loginUserHendler from "./login.js";
import move from "./move.js";
import nohendler from "./nohendler.js";
import readAll from "./readall.js";
const routers = {
    nohendler: nohendler,
    createuser: createUserHendler,
    login:loginUserHendler,
    createFile:createFile,
    createfolder:createFolder,
    move:move,
    readAll:readAll
}

export default routers;