import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

const DialogComponent = props => {
  const { OPEN, onFormToggle, errorMessage } = props;

  return (
    <Dialog
      open={OPEN}
      onClose={() => onFormToggle(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title"> Error </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{errorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onFormToggle(false)} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  OPEN: PropTypes.bool.isRequired,
  onFormToggle: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default DialogComponent;
