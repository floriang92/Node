const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function getOneFolder() {
  return fs.readdirSync(__dirname, (err, files) => {
    if (err) {
      console.log("bla");
      return err;
    } else {
      return files;
    }
  });
}

function getAllFolders() {
  return new Promise((resolve, reject) => {
    mongoose
      .model("Folder")
      .find({})
      .exec(function (err, folders) {
        if (err) {
          reject(err);
        } else {
          resolve(folders);
        }
      });
  });
}

function createFolder(data) {
  return new Promise((resolve, reject) => {
    mongoose.model("Folder").create(data, function (err, folder) {
      if (err) {
        console.log(err);
        reject("Can't add folder in DataBase, add Immatriculation field");
      } else {
        resolve(folder);
      }
    });
  });
}

function updateFolder(id, data) {
  return new Promise((resolve, reject) => {
    mongoose
      .model("Folder")
      .findOneAndUpdate(
        { _id: id },
        data,
        { returnOriginal: false },
        function (err, folder) {
          if (err) {
            console.log(err);
            reject("Can't update folder");
          } else {
            resolve(folder);
          }
        }
      );
  });
}

function deleteFolder(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .model("Folder")
      .findOneAndDelete({ _id: id }, function (err, folder) {
        if (err) {
          console.log(err);
          reject("Can't delete folder");
        } else {
          resolve("Folder delete OK");
        }
      });
  });
}

module.exports = {
  GetOneFolder: async () => {
    let temp = await getOneFolder();
    return temp.map((file) => {
      return {
        name: file,
        type: path.extname(file) ? "file" : "directory",
      };
    });
  },

  GetAllFolders: async () => {
    let allFolders = await getAllFolders();
    return allFolders;
  },

  AddFolder: async (data) => {
    let addedFolder = await createFolder(data);
    return addedFolder;
  },

  UpdateFolder: async (id, data) => {
    let updatedFolder = await updateFolder(id, data);
    return updatedFolder;
  },

  DeleteFolder: async (id) => {
    let deletedFolder = await deleteFolder(id);
    return deletedFolder;
  },
};
