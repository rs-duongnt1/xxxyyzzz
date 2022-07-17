import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  TextField,
  Button,
} from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        display: "flex",
      }}
    >
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
      <Stack py="30px" px="30px" spacing={3}>
        <Typography variant="h6">Settings Validation</Typography>
        <Stack>
          <Typography color="rgb(0 0 0 / 64%)">Field Name</Typography>
          <TextField
            variant="standard"
            focused
            color="success"
            defaultValue="email"
          />
        </Stack>
        <Stack direction="row">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Required"
            />
          </FormGroup>
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
        <Stack direction="row">
          <Button variant="contained">Save</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
