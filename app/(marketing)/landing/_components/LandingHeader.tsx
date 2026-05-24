"use client";

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { LinkButton } from "@/components/LinkButton";

export default function LandingHeader() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link href="/">
            <Typography color="primary" sx={{ typography: { sx: "h6", md: "h5" } }}>
              My Sticky Shoes
            </Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LinkButton variant="text" href="#about">
              About
            </LinkButton>
            <LinkButton variant="text" href="#features">
              Features
            </LinkButton>
            <LinkButton variant="text" href="#collections">
              Collections
            </LinkButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
