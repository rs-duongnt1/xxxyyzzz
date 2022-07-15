import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {},
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
          boxShadow: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
          borderRadius: "8px",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.component === "th" && {
            color: "rgb(0 0 0 / 64%)",
            fontSize: "12px",
          }),
          ...(ownerState.component === "td" && {
            fontSize: "13px",
            color: "rgba(0,0,0,.54)",
          }),
        }),
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          tr: {
            transition: "background-color .15s cubic-bezier(0.4,0,0.2,1)",
            ":hover": {
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
            },
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "8px 20px",
        },
      },
    },
  },
});

export default theme;
