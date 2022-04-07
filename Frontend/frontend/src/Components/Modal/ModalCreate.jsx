import React from "react";
import Modal from "@material-ui/core/Modal";
import FormAddFile from "../Form/FormAddFile";
import { makeStyles } from "@material-ui/core/styles";

function ModalCreate(props) {
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: "#0D1117",
      border: "2px solid #fff",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "20px",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  }));
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    props.reset(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title" style={{ color: "white" }}>
          Ajouter un fichier
        </h2>
        <p id="simple-modal-description">
          L'emplacement est par défaut à l'endroit où vous vous situez.
          <strong>
            {" "}
            Pensez à rajouter l'extension du fichier, sinon il sera considéré
            comme un dossier !{" "}
          </strong>
        </p>
        <FormAddFile handleClose={handleClose} />
      </div>
    </Modal>
  );
}

export default ModalCreate;
