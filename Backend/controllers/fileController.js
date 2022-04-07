const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function getOneFile(completePath) {
  return fs.readFileSync(completePath, (err, file) => {
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

  UpdateFile: async (id, data) => {
    let updatedFile = await updateFile(id, data);
    return updatedFile;
  },

  DeleteFile: async (data) => {
    return deleteFile(data);
  },
};
