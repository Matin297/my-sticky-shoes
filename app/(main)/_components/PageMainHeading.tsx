import { Typography, type TypographyProps } from "@mui/material";

export default function PageMainHeading(props: TypographyProps) {
  return <Typography component="h1" sx={{ typography: { xs: "h3", md: "h2" } }} {...props} />;
}
