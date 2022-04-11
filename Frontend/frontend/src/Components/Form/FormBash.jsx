import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { baseUrl } from "../../Environnement";
import { Input } from "antd";
const { TextArea } = Input;

function FormBash(props) {
  const [command, setCommand] = React.useState("");
  const [commandResult, setCommandResult] = React.useState("");

  const handleSubmit = () => {
    axios
      .post(baseUrl + "/bash", { data: command })
      .then(function (response) {
        setCommandResult(response.data);
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
      }}
    >
      <div className="text-field">
        <TextField
          onChange={(e) => {
            setCommand(e.target.value);
          }}
          className="text-field"
          required
          id="outlined-required"
          label="Commande"
          variant="outlined"
          value={command}
        />
      </div>
      <TextArea
        disabled
        className="text-field"
        id="outlined-required"
        label="Résultat"
        value={commandResult}
        variant="outlined"
        style={{
          width: "20vw",
          height: "20vh",
          border: "4px solid green",
          borderRadius: "5px",
          backgroundColor: "black",
          color: "greenyellow",
        }}
      />
      <button className="button-modal" type="submit">
        Valider la commande
      </button>
    </form>
  );
}

export default FormBash;
