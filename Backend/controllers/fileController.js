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

function updateFile(id, data) {
  return new Promise((resolve, reject) => {
    mongoose
      .model("File")
      .findOneAndUpdate(
        { _id: id },
        data,
        { returnOriginal: false },
        function (err, file) {
          if (err) {
            console.log(err);
            reject("Can't update file");
          } else {
            resolve(file);
          }
        }
      );
  });
}

function deleteFile(id) {
  return new Promise((resolve, reject) => {
    mongoose.model("File").findOneAndDelete({ _id: id }, function (err, file) {
      if (err) {
        console.log(err);
        reject("Can't delete file");
      } else {
        resolve("File delete OK");
      }
    });
  });
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

  DeleteFile: async (id) => {
    let deletedFile = await deleteFile(id);
    return deletedFile;
  },
};
