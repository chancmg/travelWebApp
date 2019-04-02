import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
const activate = [
  {
    value: "1",
    label: "Yes"
  },
  {
    value: "0",
    label: "No"
  }
];
const DialogComponent = ({
  OPEN,
  onFormToggle,
  onFormSubmit,
  onFormChange,
  type,
  serviceData
}) => {
  return (
    <Dialog
      open={OPEN}
      onClose={() => onFormToggle(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{type} Service </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="standard-name"
          label="Service Description"
          value={serviceData.serviceDesc}
          onChange={event => onFormChange(event.target.value, "serviceDesc")}
          fullWidth
        />
        {type === "Edit" && (
          <TextField
            id="standard-select-currency-native"
            select
            label="Activated"
            SelectProps={{
              native: true,
              value: serviceData.serviceStatus,
              onChange: event => {
                onFormChange(event.target.value, "serviceStatus");
              }
            }}
            helperText="Please select Action"
            margin="normal"
            fullWidth
          >
            {activate.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onFormToggle(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={onFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  OPEN: PropTypes.bool.isRequired
};

export default DialogComponent;
