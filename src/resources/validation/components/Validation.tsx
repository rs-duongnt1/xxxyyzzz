import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ValidationDetailDialog from "./ValidationDetailDialog";
import ValidationList from "./ValidationList";

export default function Validation() {
  const router = useRouter();
  const { id: validationId } = router.query;
  const [openAddDialog, setOpenAddDialog] = useState(
    validationId ? true : false
  );

  return (
    <Stack className="validation-page" spacing={2}>
      <Stack>
        <ValidationList
          onAdd={() => setOpenAddDialog(true)}
          onEdit={(validationId: string) => {
            setOpenAddDialog(true);
          }}
        />
      </Stack>
      <ValidationDetailDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </Stack>
  );
}
