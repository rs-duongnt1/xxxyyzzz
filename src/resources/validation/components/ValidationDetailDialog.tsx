import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItemText from "@mui/material/ListItemText";
import {
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
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
import { Add } from "@mui/icons-material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { nanoid } from "nanoid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface GroupRule {
  id: string;
  name: string;
  rules: string[];
  message: string | null;
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

  const [groupRules, setGroupRules] = React.useState<GroupRule[]>([
    {
      id: nanoid(),
      name: "group rule 1",
      rules: ["email", "katakana"],
      message: null,
    },
    {
      id: nanoid(),
      name: "group rule 2",
      rules: ["string", "katakana"],
      message: null,
    },
  ]);

  const rules = ["email", "string", "katakana", "hirakana"];

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleChangeGroupRule = (
    event: SelectChangeEvent<string[]>,
    rule: GroupRule
  ) => {
    const {
      target: { value },
    } = event;
    const _rules = [...groupRules];
    const index = _rules.findIndex((_rule) => _rule.id === rule.id);
    _rules[index].rules = value as any;
    setGroupRules(_rules);
  };

  const addGroupRule = () => {
    setGroupRules((rules) => [
      ...rules,
      { id: nanoid(), name: "Untitled", rules: [], message: null },
    ]);
  };

  const removeGroupRule = (groupRule: GroupRule) => {
    setGroupRules((groupRules) =>
      groupRules.filter((_groupRule) => _groupRule.id !== groupRule.id)
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
            <Stack px="30px" spacing={3} flex={1}>
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
              <Stack>
                <Typography variant="h6">Base</Typography>
                <Divider />
              </Stack>
              <Stack spacing={2} px={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Required"
                    />
                  </FormGroup>
                  <Stack direction="row">
                    <IconButton color="error">
                      <MessageOutlinedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack>
                  <Typography color="rgb(0 0 0 / 64%)">Length</Typography>
                  <Stack direction="row" justifyContent="space-between">
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
                    <Stack direction="row">
                      <IconButton color="error">
                        <MessageOutlinedIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="h6">Custom</Typography>
                <Divider />
              </Stack>
              <Stack spacing={2} px={2}>
                <Stack spacing={2}>
                  {groupRules.length === 0 && (
                    <Typography fontStyle="italic" color="gray" fontSize="13px" textAlign="center">Empty List</Typography>
                  )}
                  {groupRules.map((groupRule) => (
                    <Stack
                      direction="row"
                      key={groupRule.id}
                      alignItems="flex-end"
                      spacing={1}
                    >
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-select-small">
                          {groupRule.name}
                        </InputLabel>
                        <Select
                          multiple
                          variant="standard"
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={groupRule.rules}
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value: string) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          onChange={(e: SelectChangeEvent<string[]>) =>
                            handleChangeGroupRule(e, groupRule)
                          }
                        >
                          {rules.map((ruleName) => (
                            <MenuItem value={ruleName} key={ruleName}>
                              <Checkbox
                                checked={groupRule.rules.indexOf(ruleName) > -1}
                              />
                              <ListItemText primary={ruleName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row">
                        <IconButton
                          color="error"
                          onClick={() => removeGroupRule(groupRule)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                        <IconButton color="error">
                          <MessageOutlinedIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    onClick={addGroupRule}
                    size="small"
                  >
                    Add
                  </Button>
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
