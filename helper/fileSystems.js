import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileHandler = {};

const baseFile = fileURLToPath(import.meta.url)
const baseDir = path.join(baseFile, '../../rootDir/');

fileHandler.createFolder = (folderName, calBack) => {
  const projectFolder = new URL('../rootDir/' + `${folderName}`, import.meta.url);
  fs.mkdir(projectFolder, (err) => {
    if (!err) {
      calBack(false);
    } else {
      calBack(true);
    }

  });
}

fileHandler.createFile = (folderName, fileName, calBack) => {

  fs.open(`${baseDir + folderName}/${fileName}.txt`, 'wx', (err, fd) => {
    if (!err && fd) {

      const data = '';
      fs.writeFile(fd, data, (err) => {
        if (!err) {
          fs.close(fd, (err) => {
            if (!err) {
              calBack(false);
            } else {

              calBack(true);
            }
          });
        } else {
          calBack(true);
        }
      });
    } else {

      calBack(true)
    }
  })
}

fileHandler.moveFs = (folderName, oldDir, newDir, calBack) => {
  const basename = path.basename(`${baseDir + folderName}/${oldDir}`);
  const newParent =path.basename(newDir);
  const fileName = basename.split('.');
  fs.rename(`${baseDir + folderName}/${oldDir}`, `${baseDir + folderName}/${newDir}/${basename}`, (err) => {
    if (!err) {
        calBack(false,{newParent,file:fileName[0]});
    }else{
      calBack(true,newParent);
    }
  });
}




export default fileHandler;