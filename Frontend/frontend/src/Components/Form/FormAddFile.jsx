import React from "react";
import { PathContext } from "../../Contexts/PathContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { baseUrl } from "../../Environnement";

function FormAddFile() {
  const { pathState } = React.useContext(PathContext);
  const [addFileHandler, setAddFileHandler] = React.useState({
    address: pathState.path,
    name: "test.js",
  });
  const handleSubmit1 = () => {
    axios
      .post(baseUrl + "/addFile", { data: addFileHandler })
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
      }}
    >
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
  );
}

export default FormAddFile;
