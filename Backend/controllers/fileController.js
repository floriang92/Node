const mongoose = require('mongoose');
const File = require('../models/file')


function getOneFile(id) {
    return new Promise((resolve, reject) => {
      mongoose.model('File').findOne({ _id: id })
        .exec(function (err, file) {
          if (err) {
            res.json({
              error: 1,
              message: "Can't get by id",
            });
          } else {
            resolve(file);
          }
        });
    })
  }

function getAllFiles() {
    return new Promise((resolve, reject) => {
      mongoose.model('File').find({})
        .exec(function (err, files) {
          if (err) {
            reject(err);
          } else {
            resolve(files);
          };
        });
    });
  }


  function createFile(data) {
    return new Promise((resolve, reject) => {
      mongoose.model('File').create(data, function (err, file) {
        if (err) {
          console.log(err);
          reject("Can't add file in DataBase, add Immatriculation field");
        }
        else {
          resolve(file)
        }
      });
  
    });
  }

  function updateFile(id, data) {
    return new Promise((resolve, reject) => {
      mongoose.model('File').findOneAndUpdate({ _id: id }, data, { returnOriginal: false }, function (err, file) {
        if (err) {
          console.log(err);
          reject("Can't update file");
        } else {
          resolve(file);
        }
      });
    })
  }

  function deleteFile(id) {
    return new Promise((resolve, reject) => {
      mongoose.model('File').findOneAndDelete({ _id: id }, function (err, file) {
        if (err) {
          console.log(err);
          reject("Can't delete file");
        } else {
          resolve("File delete OK");
        }
      });
    })
  }

module.exports = {

    GetOneFile: async(id) => {
        let oneFile = await getOneFile(id)
        return oneFile
    },

    GetAllFiles: async() => {
        let allFiles = await getAllFiles()
        return allFiles
    },

    AddFile: async(data) => {
        let addedFile = await createFile(data)
        return addedFile
    },

    UpdateFile: async(id, data) => {
      let updatedFile = await updateFile(id, data) 
      return updatedFile
    },

    DeleteFile: async(id) => {
      let deletedFile = await deleteFile(id)
      return deletedFile
    }
  }