const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const fs_extra  = require('fs-extra')

async function getOneFolder(completePath) {
  return fs.readdirSync(completePath, (err, files) => {
    if (err) {
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

async function createFolder(completePath) {
  fs.mkdirSync(completePath, (err) => {
    if (err) {
      return err;
    } else {
      console.log("The folder has been created!");
      return "Folder created";
    }
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

async function deleteFolder(completePath) {
  try {
    fs.rmSync(completePath, { recursive: true, force: true });
  } catch (err) {
    console.error(err);
  }
}

async function moveOneFolder(oldpath, newPath) {
  try {
    fs_extra.move(oldpath, newPath);
    return "Folder moved successfully";
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  GetOneFolder: async (partialPath) => {
    let temp = await getOneFolder(path.join(__dirname, "../", partialPath));
    return temp.map((file) => {
      return {
        name: file,
        type: path.extname(file) ? "file" : "directory",
      };
    });
  },

  GetAllFolders: async () => {
    return getAllFolders();
  },

  AddFolder: async (data) => {
    return createFolder(data.data.address + "/" + data.data.name);
  },

  UpdateFolder: async (id, data) => {
    return updateFolder(id, data);
  },

  MoveOneFolder: (oldPath, newPath) => {
    return moveOneFolder(oldPath, newPath);
  },

  DeleteFolder: async (data) => {
    return deleteFolder(data);
  },
};
