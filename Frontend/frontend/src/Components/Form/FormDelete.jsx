import React from "react";
import { PathContext } from "../../Contexts/PathContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { baseUrl } from "../../Environnement";
import { Path } from "react-router-dom";

function FormDelete(props) {
  const { pathState } = React.useContext(PathContext);
  const handleSubmit = () => {
    let url;
    let re = /(?:\.([^.]+))?$/;
    re.exec(pathState.path + "/" + props.name)[1]
      ? (url = "/deleteFile")
      : (url = "/deleteFolder");
    console.log(baseUrl + url);
    console.log(pathState.path + "/" + props.name);
    axios
      .delete(baseUrl + url, {
        data: { path: pathState.path + "/" + props.name },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const useStyles = makeStyles((theme) => ({
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  }));

  const classes = useStyles();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleClose();
        window.location.reload();
      }}
    >
      <button className="button-modal" type="submit">
        Supprimer
      </button>
    </form>
  );
}

export default FormDelete;
