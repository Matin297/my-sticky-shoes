import { createTheme } from "@mui/material/styles";
import * as colors from "./colors";
import { DARK } from "./dark";
import { LIGHT } from "./light";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: colors.indigo,
    secondary: colors.teal,
    error: colors.rose,
    warning: colors.amber,
    info: colors.blue,
    success: colors.emerald,
    grey: colors.slate,
  },
  colorSchemes: {
    light: LIGHT,
    dark: DARK,
  },
});

export default theme;
