import { Stack } from "@mui/material";
import { LAYOUT_HEADER_HEIGHT, LAYOUT_SIDEBAR_WIDTH } from "../constants";

export default function Header() {
  return (
    <Stack
      bgcolor="primary.main"
      sx={{
        width: `calc(100% - ${LAYOUT_SIDEBAR_WIDTH}px)`,
        height: `${LAYOUT_HEADER_HEIGHT}px`,
        marginLeft: `${LAYOUT_SIDEBAR_WIDTH}px`
      }}
    ></Stack>
  );
}
