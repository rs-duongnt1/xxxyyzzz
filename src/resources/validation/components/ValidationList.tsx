import {
  Button,
  Card,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useEffect } from "react";
import { useAppSlice } from "resources/app/slice";
import { useDispatch } from "react-redux";

function createData(id: string, name: string, fields: string[]) {
  return { id, name, fields };
}

const rows = [
  createData("SIArpPBXjZbZJmKfbjDb", "Register", [
    "name",
    "email",
    "password",
    "age",
  ]),
  createData("VoNyPrmOrstCE1UVHGFG", "Login", ["email", "password"]),
  createData("rlY3A07fBmwIIkeD6BpV", "UpdateProfile", [
    "email",
    "avatar",
    "fullname",
  ]),
];

interface ValidationListProps {
  onAdd: Function;
  onEdit: Function;
}
export default function ValidationList({ onAdd, onEdit }: ValidationListProps) {
  return (
    <Stack>
      <Paper>
        <Stack direction="row" justifyContent="flex-end" p="10px">
          <Button variant="contained" onClick={() => onAdd()}>
            Add new validation
          </Button>
        </Stack>

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={300} sx={{ fontWeight: "bold" }}>
                id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fields</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.fields.join(",")}</TableCell>
                <TableCell align="center">
                  <Stack spacing={1} direction="row" justifyContent="center">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => onEdit(row.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy UUID">
                      <IconButton size="small">
                        <ContentCopyOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
