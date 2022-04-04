import React from 'react'
import { Link} from "react-router-dom";
import './Button.css'

function Button(props) {
  return (
  <Link to={props.link}>
    <button className="custom-button">{props.text}</button>
  </Link>
  )
}

export default Button