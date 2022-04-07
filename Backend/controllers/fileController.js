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

function getAllFiles() {
  return new Promise((resolve, reject) => {
    mongoose
      .model("File")
      .find({})
      .exec(function (err, files) {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
  });
}

function createFile(data) {
  return new Promise((resolve, reject) => {
    mongoose.model("File").create(data, function (err, file) {
      if (err) {
        console.log(err);
        reject("Can't add file in DataBase, add Immatriculation field");
      } else {
        resolve(file);
      }
    });
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
    let temp = []
    let oneFile = await getOneFile(completePath);
    oneFile.toString().split(/\r?\n/).forEach(line =>  {
      temp.push(line);
    });
    return temp;
  },

  GetAllFiles: async () => {
    let allFiles = await getAllFiles();
    return allFiles;
  },

  AddFile: async (data) => {
    let addedFile = await createFile(data);
    return addedFile;
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
