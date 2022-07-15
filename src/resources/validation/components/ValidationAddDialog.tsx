import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper, Stack, TextField, Typography } from "@mui/material";

interface ValidationAddDialogProps {
  open: boolean;
  onClose?: Function;
}
export default function ValidationAddDialog({
  open,
  onClose,
}: ValidationAddDialogProps) {
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create new validation</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack>
              <Typography>Name</Typography>
              <TextField placeholder="Enter the name" variant="standard" />
            </Stack>
            <Stack>
              <Typography>Fields</Typography>

              <Stack direction="row">
                <Typography color="rgba(0,0,0,.54)">email</Typography>
              </Stack>
            </Stack>
            <Stack direction="row">
              <Button variant="contained">Add field</Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleClose()} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
