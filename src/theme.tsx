import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F5A623",
    },
    background: {
      default: "#FFFBF0",
      paper: "#FFFBF0",
    },
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h4: {
          fontFamily: "Fraunces, serif",
          fontWeight: 700,
          fontSize: "2rem",
          textAlign: "center",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "999px !important",
          textTransform: "none",
          fontWeight: 600,
          "&.Mui-selected": {
            background: "#C04A1A",
            color: "#FFFFFF",
            border: "1px solid #C04A1A !important",
            "&:hover": {
              background: "#A03A12",
            },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: "8px",
        },
        grouped: {
          border: "1px solid #7A4E08 !important",
          color: "#7A4E08",
          backgroundColor: "#FFFBF0",
          "&.Mui-selected": {
            background: "#C04A1A",
            color: "#FFFFFF",
            border: "1px solid #C04A1A !important",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            backgroundColor: "#FFFFFF",
          },
        },
      },
    },
  },
});

export default theme;
