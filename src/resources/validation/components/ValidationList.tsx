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
import { useDispatch, useSelector } from "react-redux";
import { selectValidationList } from "../selectors";
import { useValidationSlice } from "../slice";


export default function ValidationList() {
  const validations = useSelector(selectValidationList);
  const { actions: validationActions } = useValidationSlice();
  const dispatch = useDispatch();
  // const { data } = validationApi.endpoints.fetchValidationList.useQuery();
  // console.log(data);

  return (
    <Stack>
      <Paper>
        <Stack direction="row" justifyContent="flex-end" p="10px">
          <Button
            variant="contained"
            onClick={() => dispatch(validationActions.toggleOpenDialogAdd())}
          >
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
            {validations.map((validation) => (
              <TableRow
                key={validation.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {validation.id}
                </TableCell>
                <TableCell>{validation.name}</TableCell>
                <TableCell>
                  {validation.fields.map((field) => field.name).join(",")}
                </TableCell>
                <TableCell align="center">
                  <Stack spacing={1} direction="row" justifyContent="center">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            validationActions.setValidationSelected(validation)
                          )
                        }
                      >
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
