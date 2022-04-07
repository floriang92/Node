import React from "react";
import "./FileTable.css";
import { Table, Tag, Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../Environnement";
import { DirectoryIcon, FileIcon, BackArrow } from "../Svg";
import { PathContext } from "../../Contexts/PathContext";

export default function FileTable() {
  const [lineItems, setLineItems] = React.useState();
  const [refreshComponent, setRefreshComponent] = React.useState(true);
  const [dataUsers, setDataUsers] = React.useState(null);
  const { pathState, pathDispatch } = React.useContext(PathContext);
  const [url, setUrl] = React.useState(null);

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
