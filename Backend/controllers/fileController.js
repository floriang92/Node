const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function getOneFile(completePath) {
  return fs.readFileSync(completePath, "UTF-8", (err, file) => {
    if (err) {
      return err;
    } else {
      return file;
    }
  });
}

async function createFile(completePath) {
  fs.writeFileSync(completePath, "", (err) => {
    if (err) {
      return err;
    } else {
      console.log("The file has been created!");
      return "File created";
    }
  });
}

async function deleteFile(completePath) {
  try {
    fs.unlinkSync(completePath);
    //file removed
  } catch (err) {
    console.error(err);
  }
}

async function moveOneFile(oldpath, newPath) {
  try {
    fs.renameSync(oldpath, newPath);
    return "file moved successfully";
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  GetOneFile: async (completePath) => {
    let temp = [];
    let oneFile = await getOneFile(completePath);
    oneFile
      .toString()
      .split(/\r?\n/)
      .forEach((line) => {
        temp.push(line);
      });
    return temp;
  },

  AddFile: async (data) => {
    return createFile(data.data.address + "/" + data.data.name);
  },

  MoveOneFile: async (oldPath, newPath) => {
    let updatedFile = await moveOneFile(oldPath, newPath);
    return updatedFile;
  },

  DeleteFile: async (data) => {
    return deleteFile(data);
  },
};
