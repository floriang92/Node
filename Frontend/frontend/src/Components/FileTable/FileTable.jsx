import React from "react";
import "./FileTable.css";
import { Table, Tag, Space } from "antd";
import axios from "axios";
import { baseUrl } from "../../Environnement";
import { DirectoryIcon, FileIcon } from "../Svg";
import { PathContext } from "../../Contexts/PathContext";

export default function FileTable() {
  const [lineItems, setLineItems] = React.useState();
  const [refreshComponent, setRefreshComponent] = React.useState(true);
  const [dataUsers, setDataUsers] = React.useState(null);
  const { pathState, pathDispatch } = React.useContext(PathContext);

  React.useEffect(() => {
    const callApi = () => {
      axios
        .post(baseUrl + "/folderDetail", { path: pathState.path })
        .then(function (response) {
          // handle success
          console.log(response.data);
          setRefreshComponent(true);
          setLineItems(
            response.data.map((file, index) => {
              console.log(file.name);
              return (
                <div className="lineItems" key={index}>
                  {file.type !== "file" ? DirectoryIcon : FileIcon}
                  <p
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
            <h3 class="user-title">Willix-IT </h3>
            <p class="url">Animation Slide / rotate</p>
          </div>
        </div>
        <div className="container-items">{lineItems}</div>
      </div>
    </Space>
  );
}
