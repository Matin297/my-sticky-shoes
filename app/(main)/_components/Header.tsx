"use client";

import { AppBar, Box, Toolbar } from "@mui/material";
import { LinkButton } from "@/components/LinkButton";

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LinkButton href="/profile">Profile</LinkButton>
          <LinkButton href="/profile">Profile</LinkButton>
          <LinkButton href="/profile">Profile</LinkButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
