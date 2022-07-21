import { Stack } from "@mui/material";
import { useFetchValidationListQuery } from "../api";
import ValidationAddDialog from "./ValidationAddDialog";
import ValidationDetailDialog from "./ValidationDetailDialog";
import ValidationList from "./ValidationList";

export default function Validation() {
  const { data: validations } = useFetchValidationListQuery();
  console.log(validations);
  return (
    <Stack className="validation-page" spacing={2}>
      <ValidationList />
      <ValidationDetailDialog />
      <ValidationAddDialog />
    </Stack>
  );
}