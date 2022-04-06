import React from "react";
import "./Infos.css";
import { Divider } from 'antd';
export default function Infos() {
  return (
    <div style={{display:"flex", flexDirection:"column", width: "20vw"}} >
      <div>
          <h4>About</h4>
          <p>@ Readme</p>
          <p>@ 0 stars</p>
          <p>@ 2 watching</p>
          <p>@ 3 forks</p>
      </div>
      <hr color="#8B949E" style={{width:"100%"}}/>
      <div>
        <h4>Releases</h4>
          <p>V.1.0.0-alpha.01</p>
      </div>
      <hr color="#8B949E" style={{width:"100%"}}/>
      <div>
        <h4>Packages</h4>
          <p>No packages published</p>
      </div>
      <hr color="#8B949E" style={{width:"100%"}}/>
      <div>
        <h4>Contributors</h4>
          <p>Raphael Da Fonseca</p>
          <p>William Herbin</p>
          <p>Florian Gillet</p>
      </div>
    </div>
  );
}
