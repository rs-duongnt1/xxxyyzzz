import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenDialogAdd } from "../selectors";
import { useValidationSlice } from "../slice";

export default function ValidationAddDialog() {

  const openDialogAdd = useSelector(selectOpenDialogAdd);
  const { actions: validationActions } = useValidationSlice();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(validationActions.toggleOpenDialogAdd());
  };

  return (
    <Dialog
      open={openDialogAdd}
      fullWidth
      maxWidth="sm"
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">New Validation</DialogTitle>
      <DialogContent>
        <Stack>
          <Stack>
            <Typography>Name</Typography>
            <TextField fullWidth variant="standard" />
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
  );
}
