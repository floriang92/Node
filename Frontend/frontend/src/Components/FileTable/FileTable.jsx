import React from "react";
import "./FileTable.css";
import { Table, Tag, Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../Environnement";
import { DirectoryIcon, FileIcon, BackArrow } from "../Svg";
import { PathContext } from "../../Contexts/PathContext";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

export default function FileTable() {
  const [lineItems, setLineItems] = React.useState();
  const [refreshComponent, setRefreshComponent] = React.useState(true);
  const [dataUsers, setDataUsers] = React.useState(null);
  const { pathState, pathDispatch } = React.useContext(PathContext);
  const [url, setUrl] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const [addFileHandler, setAddFileHandler] = React.useState({
    address: pathState.path,
    name: "",
  });

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleSubmit1 = () => {
    console.log(addFileHandler);
  };

  const body1 = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Ajouter un fichier</h2>
      <p id="simple-modal-description">
        L'emplacement est par défaut set à l'endroit où vous vous situez.
        <strong> Pensez à rajouter l'extension du fichier ! </strong>
      </p>
      <form onSubmit={handleSubmit1}>
        <div className="text-field">
          <TextField
            onChange={(e) => {
              setAddFileHandler({
                ...addFileHandler,
                address: e.target.value,
              });
            }}
            className="text-field"
            required
            id="outlined-required"
            label="Emplacement"
            variant="outlined"
            value={addFileHandler.address}
          />
        </div>
        <div className="text-field">
          <TextField
            onChange={(e) => {
              setAddFileHandler({
                ...addFileHandler,
                name: e.target.value,
              });
            }}
            className="text-field"
            required
            id="outlined-required"
            label="Nom Fichier avec extension"
            defaultValue="test.js"
            variant="outlined"
          />
        </div>
        <button className="button-modal" type="submit">
          Créer un fichier
        </button>
      </form>
    </div>
  );
  const body2 = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Ajouter un fichier</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );
  const body3 = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Ajouter un fichier</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  React.useEffect(() => {
    const callApi = () => {
      axios
        .post(baseUrl + "/folderDetail", { path: pathState.path })
        .then(function (response) {
          // handle success
          console.log(response.data);
          setRefreshComponent(true);
          setUrl(pathState.path);
          setLineItems(
            response.data.map((file, index) => {
              console.log(file.name);

              return (
                <div
                  className={
                    file.type !== "file" ? "lineItems file" : "lineItems"
                  }
                  key={index}
                >
                  {file.type !== "file" ? DirectoryIcon : FileIcon}
                  <p
                    className={file.type !== "file" ? "file-text" : ""}
                    onClick={(e) => {
                      pathDispatch({
                        type: "deeperPath",
                        payload: e.target.innerText,
                      });
                    }}
                  >
                    {file.name}
                  </p>
                </div>
              );
            })
          );
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    if (refreshComponent) {
      callApi();
      setRefreshComponent(false);
    }
  }, [pathState.path]);

  return (
    <Space style={{ display: "flex", justifyContent: "right" }}>
      <div className="container-global">
        <div className="container-button-modal">
          <div className="ajouter-ficher">
            <button className="button-modal-ajouter" onClick={handleOpen}>
              Ajouter un ficher
            </button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body1}
            </Modal>
          </div>
          <div className="ajouter-ficher">
            <button className="button-modal" onClick={handleOpen2}>
              Déplacer un ficher
            </button>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body2}
            </Modal>
          </div>
          <div className="ajouter-ficher">
            <button className="button-modal" onClick={handleOpen3}>
              Exécuter une commande Shell
            </button>
            <Modal
              open={open3}
              onClose={handleClose3}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body3}
            </Modal>
          </div>
        </div>
        <div className="container-header">
          <div className="left-part-icon-url">
            <img
              data-test-selector="commits-avatar-stack-avatar-image"
              src="https://avatars.githubusercontent.com/u/58976208?s=48&amp;v=4"
              width="24"
              height="24"
              alt="@Willix-IT"
              class="avatar-user"
            />
            <h3 class="user-title">Deepyjr </h3>
            <p class="url">{url}</p>
          </div>
          <div className="right-part">
            <div
              className="containerArrow"
              onClick={(e) => {
                pathDispatch({
                  type: "higherPath",
                });
              }}
            >
              {BackArrow} Previous Page
            </div>
          </div>
        </div>
        <div className="container-items">{lineItems}</div>
      </div>
    </Space>
  );
}
