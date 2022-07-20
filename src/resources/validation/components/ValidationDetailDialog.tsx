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
import Autocomplete, {
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { useDispatch, useSelector } from "react-redux";
import { selectRules, selectValidationSelected } from "../selectors";
import { fieldTypes, useValidationSlice } from "../slice";
import { useEffect } from "react";
import { FieldRule } from "../types";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";

export default function ValidationDetailDialog() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const rules = useSelector(selectRules);
  const validationSelected = useSelector(selectValidationSelected);
  const fieldSelected = validationSelected?.fields[0];
  const { actions: validationActions } = useValidationSlice();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeFieldType = (event: any) => {
    dispatch(
      validationActions.updateFieldType({
        field: fieldSelected,
        type: event.target.value,
      })
    );
  };

  const handleClose = () => {
    dispatch(validationActions.setValidationSelected(null));
  };

  const handleUpdateRule = (value: string[], rule: FieldRule) => {
    dispatch(
      validationActions.updateRule({
        field: fieldSelected,
        rule: rule,
        value: value,
      })
    );
  };

  const addRule = () => {
    dispatch(
      validationActions.addRule({
        field: fieldSelected,
        rule: {
          id: nanoid(),
          title: "Untitledsss",
          value: [],
        },
      })
    );
  };

  const removeRule = (rule: FieldRule) => {
    dispatch(
      validationActions.removeRule({
        field: fieldSelected,
        rule: rule,
      })
    );
  };

  return (
    <div>
      <Dialog
        open={validationSelected !== null}
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
                value={validationSelected?.fields[0].id}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {validationSelected?.fields.map((field) => (
                  <Tab
                    label={field.name}
                    key={field.id}
                    value={field.id}
                    id={field.id}
                    aria-controls={field.id}
                  />
                ))}
              </Tabs>
            </Stack>
            <Stack px="30px" spacing={3} flex={1}>
              <Stack>
                <Typography color="rgb(0 0 0 / 64%)">Field Name</Typography>
                <TextField
                  defaultValue="email"
                  variant="standard"
                  focused
                  color="success"
                />
              </Stack>
              <Stack>
                <FormControl fullWidth>
                  <Typography color="rgb(0 0 0 / 64%)">Field Type</Typography>
                  <Select
                    variant="standard"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={fieldSelected?.type || "string"}
                    onChange={handleChangeFieldType}
                  >
                    {fieldTypes.map((fieldType) => (
                      <MenuItem value={fieldType} key={fieldType}>
                        {fieldType.toLocaleLowerCase()}
                      </MenuItem>
                    ))}
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
                      control={
                        <Checkbox defaultChecked={fieldSelected?.required} />
                      }
                      label="Required"
                    />
                  </FormGroup>
                  <Stack direction="row">
                    <IconButton color="error">
                      <MessageOutlinedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Typography variant="h6">Custom</Typography>
                <Divider />
              </Stack>
              <Stack spacing={2} px={2}>
                <Stack spacing={2}>
                  {fieldSelected?.rules.length === 0 && (
                    <Typography
                      fontStyle="italic"
                      color="gray"
                      fontSize="13px"
                      textAlign="center"
                    >
                      Empty List
                    </Typography>
                  )}
                  {fieldSelected?.rules.map((rule) => (
                    <Stack
                      direction="row"
                      key={rule.id}
                      alignItems="flex-end"
                      spacing={1}
                    >
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          multiple
                          id="checkboxes-tags-demo"
                          options={rules}
                          disableCloseOnSelect
                          onChange={(e, value) => {
                            handleUpdateRule(value, rule);
                          }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option}
                            </li>
                          )}
                          style={{ width: 500 }}
                          renderInput={(params) => {
                            return <TextField variant="standard" placeholder="+1" {...params} />;
                          }}
                        />
                      </FormControl>
                      <Stack direction="row">
                        <IconButton
                          color="error"
                          onClick={() => removeRule(rule)}
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
                  <Button variant="contained" onClick={addRule} size="small">
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
