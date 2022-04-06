import React from "react";
import "./FileTable.css";
import { Table, Tag, Space } from "antd";

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default function FileTable() {
  const [lineItems, setLineItems] = React.useState();
  const [dataUsers, setDataUsers] = React.useState([
    {
      key: "1",
      firstName: "John",
      lastName: "Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      firstName: "Jim",
      lastName: "Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      firstName: "Joe",
      lastName: "Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ])

 
  React.useEffect(() => {
    setLineItems(dataUsers.map((user, index) => {
      return(<div className="lineItems">
        <p>TESSSSSSSSSSSSSSST</p>
      </div>)
    }))
  },[dataUsers])

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
        <div className="container-items">
          {lineItems}

        </div>
      </div>
    </Space>
  );
}
