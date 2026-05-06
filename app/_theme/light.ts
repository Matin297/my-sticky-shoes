import type { ColorSystemOptions } from "@mui/material/styles";
import * as colors from "./colors";

export const LIGHT: ColorSystemOptions = {
  palette: {
    primary: {
      main: colors.indigo[600],
      light: colors.indigo[400],
      dark: colors.indigo[700],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.teal[600],
      light: colors.teal[400],
      dark: colors.teal[700],
      contrastText: "#ffffff",
    },
    error: {
      main: colors.rose[600],
      light: colors.rose[400],
      dark: colors.rose[700],
      contrastText: "#ffffff",
    },
    warning: {
      main: colors.amber[600],
      light: colors.amber[400],
      dark: colors.amber[700],
      contrastText: "#ffffff",
    },
    info: {
      main: colors.blue[600],
      light: colors.blue[400],
      dark: colors.blue[700],
      contrastText: "#ffffff",
    },
    success: {
      main: colors.emerald[600],
      light: colors.emerald[400],
      dark: colors.emerald[700],
      contrastText: "#ffffff",
    },
    background: {
      default: colors.slate[50],
      paper: "#ffffff",
    },
    text: {
      primary: colors.slate[900],
      secondary: colors.slate[600],
      disabled: colors.slate[400],
    },
    divider: colors.slate[200],
    action: {
      active: colors.indigo[600],
      hover: colors.indigo[100],
      selected: colors.indigo[200],
      disabled: colors.slate[300],
      disabledBackground: colors.slate[100],
      focus: colors.indigo[400],
    },
  },
};
