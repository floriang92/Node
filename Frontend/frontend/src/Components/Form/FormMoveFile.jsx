import React from "react";
import { PathContext } from "../../Contexts/PathContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { baseUrl } from "../../Environnement";

function FormMoveFile(props) {
  const { pathState } = React.useContext(PathContext);
  const [moveFileHandler, setMoveFileHandler] = React.useState({
    oldPath: pathState.path,
    newPath: "",
  });
  const handleSubmit1 = () => {
    let url;
    let re = /(?:\.([^.]+))?$/;
    re.exec(moveFileHandler.oldPath)[1] ? (url = "/moveFile") : (url = "/moveFolder");
    console.log(moveFileHandler)
    moveFileHandler.newPath !== "" &&
      axios
        .post(baseUrl + url, { data: moveFileHandler })
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
        handleSubmit1();
        props.handleClose();
        // window.location.reload();
      }}
    >
      <div className="text-field">
        <TextField
          onChange={(e) => {
            setMoveFileHandler({
              ...moveFileHandler,
              oldPath: e.target.value,
            });
          }}
          className="text-field"
          required
          id="outlined-required"
          label="Emplacement de départ"
          variant="outlined"
          value={moveFileHandler.oldPath}
        />
      </div>
      <div className="text-field">
        <TextField
          onChange={(e) => {
            setMoveFileHandler({
              ...moveFileHandler,
              newPath: e.target.value,
            });
          }}
          className="text-field"
          required
          id="outlined-required"
          label="Emplacement d'arrivée"
          value={moveFileHandler.newPath}
          variant="outlined"
          placeholder="new/path/file.txt"
        />
      </div>
      <button className="button-modal" type="submit">
        Valider le déplacement
      </button>
    </form>
  );
}

export default FormMoveFile;
