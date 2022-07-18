import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Add,  } from "@mui/icons-material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface ValidationDetailDialogProps {
  open: boolean;
  onClose?: Function;
}
export default function ValidationDetailDialog({
  open,
  onClose,
}: ValidationDetailDialogProps) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [moreRules, setMoreRules] = React.useState<string[]>([]);

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  // const addMoreRule = () => {
  //   setMoreRules((rules: any[]) => [...rules, 1]);
  // };

  const handleChangeRule = (event: SelectChangeEvent<typeof moreRules>) => {
    const {
      target: { value },
    } = event;
    setMoreRules(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Settings Validation</DialogTitle>
        <DialogContent>
          <Stack direction="row">
            <Stack direction="row">
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                <Tab label="username" {...a11yProps(0)} />
                <Tab label="password" {...a11yProps(1)} />
                <Tab label="email" {...a11yProps(2)} />
                <Tab label="gender" {...a11yProps(3)} />
              </Tabs>
            </Stack>
            <Stack px="30px" spacing={3}>
              <Stack>
                <Typography color="rgb(0 0 0 / 64%)">Field Name</Typography>
                <TextField
                  variant="standard"
                  focused
                  color="success"
                  defaultValue="email"
                />
              </Stack>
              <Stack>
                <FormControl fullWidth>
                  <Typography color="rgb(0 0 0 / 64%)">Field Type</Typography>
                  <Select
                    variant="standard"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    label="Age"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>String</MenuItem>
                    <MenuItem value={20}>Number</MenuItem>
                    <MenuItem value={30}>Object</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Required"
                  />
                </FormGroup>
                <ModeEditOutlineOutlinedIcon />
              </Stack>
              <Stack>
                <Typography color="rgb(0 0 0 / 64%)">Length</Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    type="number"
                    label="Max length"
                    variant="standard"
                    size="small"
                    focused
                    defaultValue={0}
                  />
                  <TextField
                    type="number"
                    label="Min length"
                    variant="standard"
                    size="small"
                    focused
                    defaultValue={10}
                  />
                </Stack>
              </Stack>
              <Stack>
                <Typography color="rgb(0 0 0 / 64%)" mb={2}>More rules</Typography>

                <Stack direction="row">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-select-small">My rule</InputLabel>
                    <Select
                      multiple
                      variant="standard"
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={moreRules}
                      label="Age"
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      onChange={handleChangeRule}
                    >
                      <MenuItem value="katakana">Katakana</MenuItem>
                      <MenuItem value="hirakana">Hirakana</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    color="primary"
                    // onClick={addMoreRule}
                  >
                    <Add />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleClose()} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
