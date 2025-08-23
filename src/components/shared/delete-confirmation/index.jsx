import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

/**
 * DeleteWithConfirm Component
 * A reusable component to display a confirmation dialog before performing delete actions.
 *
 * @param {string} title - Tooltip text for the delete icon.
 * @param {string} confirmTitle - Title text displayed in the confirmation dialog.
 * @param {string} message - Message content displayed inside the confirmation dialog.
 * @param {Function} onConfirm - Callback function executed when the user confirms the delete action.
 */
const DeleteWithConfirm = ({ title, confirmTitle, message, onConfirm }) => {
  const [open, setOpen] = useState(false);

  // Responsive Design
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /**
   * Opens the confirmation dialog.
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Closes the confirmation dialog.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the confirm action, executes the provided callback,
   * and then closes the dialog.
   */
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      {/* Delete Icon Button */}
      <Delete
        titleAccess={title}
        onClick={handleClickOpen}
        sx={{ cursor: "pointer", color: "#ff0000", marginLeft: "0.8rem" }}
      />
      {/* Confirmation Dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            backgroundColor: "#292929",
            color: "#fff",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">{confirmTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#B4B2B0" }}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Prop validation using PropTypes
DeleteWithConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  confirmTitle: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteWithConfirm;
