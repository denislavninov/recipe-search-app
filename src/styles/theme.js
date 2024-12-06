import { createTheme } from "@mui/material/styles";
import { deepOrange, teal } from "@mui/material/colors";

export const apptTheme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: teal[500],
    },
  },
});
