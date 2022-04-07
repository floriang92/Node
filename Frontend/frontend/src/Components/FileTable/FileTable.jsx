import React from "react";
import "./FileTable.css";
import { Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../Environnement";
import { DirectoryIcon, FileIcon, BackArrow } from "../Svg";
import { PathContext } from "../../Contexts/PathContext";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import FormAddFile from "../Form/FormAddFile";
import FormDelete from "../Form/FormDelete";
import FileDisplay from "../FileDisplay/FileDisplay";

function getModalStyle() {
  const top = 50;
  const left = 50;

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
  const { pathState, pathDispatch } = React.useContext(PathContext);
  const [url, setUrl] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [bodyDelete, setBodyDelete] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [fileContent, setFileContent] = React.useState({
    name: "",
    lines: null,
  });

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
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

  const body1 = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Ajouter un fichier</h2>
      <p id="simple-modal-description">
        L'emplacement est par défaut à l'endroit où vous vous situez.
        <strong>
          {" "}
          Pensez à rajouter l'extension du fichier, sinon il sera considéré
          comme un dossier !{" "}
        </strong>
      </p>
      <FormAddFile handleClose={handleClose} />
    </div>
  );
  const body2 = (
    <div></div>
  );

  React.useEffect(() => {
    const callApi = () => {
      axios
        .post(baseUrl + "/folderDetail", { path: pathState.path })
        .then(function (response) {
          // handle success
          setRefreshComponent(true);
          setUrl(pathState.path);
          setLineItems(
            response.data.map((file, index) => {
              return (
                <div
                  className={
                    file.type !== "file" ? "lineItems file" : "lineItems"
                  }
                  key={index}
                >
                  {file.type !== "file" ? DirectoryIcon : FileIcon}
                  <p
                    className="file-text"
                    onClick={(e) => {
                      if (file.type === "file") {
                        axios
                          .post(baseUrl + "/fileContent", {
                            path: pathState.path + "/" + file.name,
                          })
                          .then((res) =>
                            setFileContent({
                              name: pathState.path + "/" + file.name,
                              lines: res.data,
                            })
                          )
                          .catch((err) => console.log(err));
                      } else {
                        pathDispatch({
                          type: "deeperPath",
                          payload: e.target.innerText,
                        });
                      }
                    }}
                  >
                    {file.name}
                  </p>
                  <svg
                    width="16"
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="delete-svg"
                    onClick={() => {
                      setBodyDelete(
                        <div style={modalStyle} className={classes.paper}>
                          <h2 id="simple-modal-title">Ajouter un fichier</h2>
                          <p id="simple-modal-description">
                            Voulez-vous vraiment supprimer ce{" "}
                            {file.type === "file" ? "fichier" : "dossier"} ?
                            <strong>
                              {" "}
                              S'il s'agit d'un dossier, la suppression sera
                              récursive{" "}
                            </strong>
                          </p>
                          <FormDelete
                            name={file.name}
                            handleClose={handleClose}
                          />
                        </div>
                      );
                      handleOpenDelete();
                    }}
                  >
                    <path
                      fill="#fff"
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    ></path>
                  </svg>
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
              {body2}
            </Modal>
          </div>
        </div>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {bodyDelete}
        </Modal>
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
              onClick={() => {
                if (pathState.path !== "data") {
                  pathDispatch({
                    type: "higherPath",
                  });
                }
                setFileContent({ name: "", lines: null });
              }}
            >
              {BackArrow} Previous Page
            </div>
          </div>
        </div>
        <div className="container-items">{lineItems}</div>
        {fileContent.lines ? <FileDisplay lines={fileContent} /> : null}
      </div>
    </Space>
  );
}
