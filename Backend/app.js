const express = require('express');
const path = require('path');
const fileController = require('./controllers/fileController')
const driverController = require('./controllers/driverController')
const cors = require('cors');



////////////////////////////////////////////////////////////////////////////// DB CONNECTION //////////////////////////////////////////////////////////////
const mongoose = require('mongoose');
const Connect = async () => {
    let url = "mongodb+srv://admin:P%40ssword1234@cluster0.zsclg.mongodb.net/NodeJSFile?retryWrites=true&w=majority";
    try {
        let client = await mongoose.connect(url);
        console.log("Database is connected!");
    } catch (error) {
        console.log(error.stack);
        process.exit(1);
    }
}
Connect();



////////////////////////////////////////////////////////////////////////////// APP SETUP //////////////////////////////////////////////////////////////


const app = express();
app.use(cors({
    origin: "*"
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;


////////////////////////////////////////////////////////////////////////////// APP ROUTES CARS //////////////////////////////////////////////////////////////


app.get('/files', async function (req, res, next) {
    let allFiles = await fileController.GetAllFiles()
        .then((result) => {
            return (result);
        })
        .catch((error) => {
            return (error)
        })

    res.json(allFiles)
})

app.get('/file/:id', async function (req, res, next) {
    let oneFile = await fileController.GetOneFile(req.params.id)
        .then((result) => {
            return (result);
        })
        .catch((error) => {
            return (error)
        })
    res.json(oneFile)
})

app.post('/file', async function (req, res, next) {
    let addedFile = await fileController.AddFile(req.body)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return error
        })
    res.json(addedFile)
})

app.put('/file/:id', async function (req, res, next) {
    let updatedFile = await fileController.UpdateFile(req.params.id, req.body)
    .then((result) => {
        res.status(200).send("Update OK")
    })
    .catch((error) => {
        res.status(400).send(error)
    })
  })

  app.delete('/file/:id', async function (req, res, next) {
    let deletedFile = await fileController.DeleteFile(req.params.id)
    .then((result) => {
        res.status(200).send("Deletion OK")
    })
    .catch((error) => {
        res.status(400).send(error)
    })
  })

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});

