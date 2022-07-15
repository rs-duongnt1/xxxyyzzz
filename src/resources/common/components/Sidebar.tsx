import { Stack } from "@mui/material";
import { indigo } from "@mui/material/colors";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { LAYOUT_HEADER_HEIGHT, LAYOUT_SIDEBAR_WIDTH } from "../constants";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import { useRouter } from "next/router";

export default function Sidebar() {
  return (
    <Stack
      bgcolor={indigo[900]}
      color="white"
      sx={{
        py: "15px",
        position: "fixed",
        width: `${LAYOUT_SIDEBAR_WIDTH}px`,
        height: `100vh`,
        top: 0,
        left: 0,
      }}
    >
      <MenuList />
    </Stack>
  );
}

function MenuList() {
  const [open, setOpen] = React.useState(true);

  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="list-subheader"
      subheader={
        <ListSubheader
          sx={{
            backgroundColor: "transparent",
            color: "white",
          }}
          component="div"
          id="list-subheader"
        >
          Service
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => navigate("/resources/authentication")}>
        <ListItemIcon>
          <PeopleAltIcon sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Authentication" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/resources/validation")}>
        <ListItemIcon>
          <FactCheckOutlinedIcon sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Validation" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/resources/storage")}>
        <ListItemIcon>
          <FolderCopyOutlinedIcon sx={{ color: "#fff" }} />
        </ListItemIcon>
        <ListItemText primary="Storage" />
      </ListItemButton>
      
      {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}
