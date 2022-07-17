import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ValidationAddDialog from "./ValidationAddDialog";
import ValidationDetail from "./ValidationDetail";
import ValidationList from "./ValidationList";

export default function Validation() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const router = useRouter();
  const { id: validationId } = router.query;

  return (
    <Stack className="validation-page" spacing={2}>
      {!validationId && (
        <Stack>
          <ValidationList
            onAdd={() => setOpenAddDialog(true)}
            onEdit={(validationId: string) =>
              router.push(`validation?id=${validationId}`)
            }
          />
          <ValidationAddDialog
            open={openAddDialog}
            onClose={() => setOpenAddDialog(false)}
          />
        </Stack>
      )}
      {validationId && (
        <Stack>
          <ValidationDetail />
        </Stack>
      )}
    </Stack>
  );
}
