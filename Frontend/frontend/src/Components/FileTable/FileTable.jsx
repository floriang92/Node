import React from "react";
import "./FileTable.css";
import { Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../Environnement";
import { DirectoryIcon, FileIcon, BackArrow } from "../Svg";
import { PathContext } from "../../Contexts/PathContext";
import FileDisplay from "../FileDisplay/FileDisplay";
import ModalDelete from "../Modal/ModalDelete";
import ModalCreate from "../Modal/ModalCreate";
import ModalMove from "../Modal/ModalMove";
import ModalCommand from "../Modal/ModalCommand";

export default function FileTable() {
  const [lineItems, setLineItems] = React.useState();
  const [refreshComponent, setRefreshComponent] = React.useState(true);
  const { pathState, pathDispatch } = React.useContext(PathContext);
  const [url, setUrl] = React.useState(null);
  const [modalToDisplay, setModalToDisplay] = React.useState(null);
  const [fileContent, setFileContent] = React.useState({
    name: "",
    lines: null,
  });

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
                      setModalToDisplay(
                        <ModalDelete file={file} reset={setModalToDisplay} />
                      );
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
            <button
              className="button-modal-ajouter"
              onClick={() =>
                setModalToDisplay(<ModalCreate reset={setModalToDisplay} />)
              }
            >
              Ajouter un ficher
            </button>
          </div>
          <div className="ajouter-ficher">
            <button
              className="button-modal"
              onClick={() => {
                setModalToDisplay(<ModalMove reset={setModalToDisplay} />);
              }}
            >
              Déplacer un ficher
            </button>
          </div>
          <div className="ajouter-ficher">
            <button
              className="button-modal"
              onClick={() => {
                setModalToDisplay(<ModalCommand reset={setModalToDisplay} />);
              }}
            >
              Exécuter une commande Shell
            </button>
          </div>
        </div>
        {modalToDisplay}
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
