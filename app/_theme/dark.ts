import type { ColorSystemOptions } from "@mui/material/styles";
import * as colors from "./colors";

export const DARK: ColorSystemOptions = {
  palette: {
    primary: {
      main: colors.indigo[400],
      light: colors.indigo[300],
      dark: colors.indigo[500],
      contrastText: colors.slate[900],
    },
    secondary: {
      main: colors.teal[400],
      light: colors.teal[300],
      dark: colors.teal[500],
      contrastText: colors.slate[900],
    },
    error: {
      main: colors.rose[400],
      light: colors.rose[300],
      dark: colors.rose[500],
      contrastText: colors.slate[900],
    },
    warning: {
      main: colors.amber[400],
      light: colors.amber[300],
      dark: colors.amber[500],
      contrastText: colors.slate[900],
    },
    info: {
      main: colors.blue[400],
      light: colors.blue[300],
      dark: colors.blue[500],
      contrastText: colors.slate[900],
    },
    success: {
      main: colors.emerald[400],
      light: colors.emerald[300],
      dark: colors.emerald[500],
      contrastText: colors.slate[900],
    },
    background: {
      default: colors.slate[900],
      paper: colors.slate[800],
    },
    text: {
      primary: colors.slate[50],
      secondary: colors.slate[400],
      disabled: colors.slate[500],
    },
    divider: colors.slate[800],
    action: {
      active: colors.indigo[400],
      hover: colors.indigo[900],
      selected: colors.indigo[800],
      disabled: colors.slate[600],
      disabledBackground: colors.slate[700],
      focus: colors.indigo[300],
    },
  },
};
