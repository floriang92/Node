# Compte rendu 4FULLB2-Full Stack Back

## Contributeurs 

Ce projet a été realisé par les contributeurs suivants

- Raphaël DA FONSECA
- William HERBIN
- Florian GILLET

## Installation

## Technologies utilisées

### Backend
#### Node js
Node.js est un environnement bas niveau permettant l’exécution de JavaScript côté serveur.\
Version du framework utilisée: 17.9.0 
Plus d'information: [Voir le site Node js](https://nodejs.org/fr/about/)

#### Express js

### FrontEnd 
#### React js

React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page HTML à chaque changement d'état.\
Version de React utilisée: 18.0.0
Plus d'information: [Voir le site React js](https://fr.reactjs.org/)

## Fonctionnalités

### Structure Application (App.js)
#### Les différents fichiers
#### Les différents modules utilisés
#### Mise en place du serveur
#### Déclaration des routes

### Fichiers

#### Route /fileContent
##### Présentation
Cette route de type 'POST' est ulisée pour lire le contenu d'un fichier. 
##### Code

Dans App.js

Déclaration de la route dans App.js:
```
app.post("/fileContent", async function (req, res) {
  let oneFile = await fileController
    .GetOneFile(req.body.path)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  res.json(oneFile);
});
```
Nous faissons appel à la fonction 'GetOneFile' de 'fileController'. Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 

Dans fileController:

La fonction 'readFileSync' permet de lire le contenu d'un fichier. Nous retournons le resultat de la lecture.
```
async function getOneFile(completePath) {
  return fs.readFileSync(completePath, "UTF-8", (err, file) => {
    if (err) {
      return err;
    } else {
      return file;
    }
  });
}
```
##### Demonstration

#### Route /addFile
##### Présentation
Cette route de type 'POST' est ulisée pour créer un nouveau fichier. 
##### Code
Dans App.js:
Nous faissons appel à la fonction 'AddFile' de 'fileController'. Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 
```
app.post("/addFile", async function (req, res) {
  let addedFile = await fileController
    .AddFile(req.body)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  res.json(addedFile);
});
```
Dans fileController:

Pour créer un nouveau fichier, nous utilisons la fonction 'writeFileSync'. Nous envoyons le chemin du fichier en arguments. Cette fonction permet d'écrire dans un fichier s'il existe déjà ou de le créer s'il n'existe pas.
```
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
```
##### Demonstration

#### Route /deleteFile
##### Présentation
Cette route de type 'DELETE' est ulisée pour supprimer un fichier. 
##### Code
Dans App.js:
Nous faissons appel à la fonction 'DeleteFile' de 'fileController'. Nous envoyons le chemin du fichier en arguments. Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 
```
app.delete("/deleteFile", async function (req, res) {
  await fileController
    .DeleteFile(req.body.path)
    .then(() => {
      res.status(200).send("Deletion OK");
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});
```
Dans fileController:
La fonction "unlinkSync" permet de supprimer un fichier.
```
async function deleteFile(completePath) {
  try {
    fs.unlinkSync(completePath);
    //file removed
  } catch (err) {
    console.error(err);
  }
}

```
##### Demonstration

#### Route /moveFile
##### Présentation
Cette route de type 'POST' est ulisée pour déplacer un fichier. 
##### Code
Dans App.js:
Nous faissons appel à la fonction 'MoveOneFile' de 'fileController'. Arguments sont requis, le chemin actuel et le nouveau chemin.
Nous attendons le résultat de cette fonction, puis nous envoyons une réponse au format JSON. 
```
app.post("/moveFile", async function (req, res) {
  console.log(req.body);
  let oneFile = await fileController
    .MoveOneFile(req.body.data.oldPath, req.body.data.newPath)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  res.json(oneFile);
});
```
Dans fileController:
La fonction 'renameSync' permet de modifier le chemin d'un fichier, donc de le déplacer.
```
async function moveOneFile(oldpath, newPath) {
  try {
    fs.renameSync(oldpath, newPath);
    return "file moved successfully";
  } catch (err) {
    console.error(err);
    return err;
  }
}
```
##### Demonstration

### Dossiers

#### Route /folderDetail
##### Présentation
##### Code
##### Demonstration

#### Route /addFolder
##### Présentation
##### Code
##### Demonstration

#### Route /deleteFolder
##### Présentation
##### Code
##### Demonstration

#### Route /moveFolder
##### Présentation
##### Code
##### Demonstration

### Bash

#### Route /bash
##### Présentation
##### Code
##### Demonstration
