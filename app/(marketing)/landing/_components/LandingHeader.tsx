"use client";

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { LinkButton } from "@/components/LinkButton";

export default function LandingHeader() {
  return (
    <AppBar color="default" position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography color="primary" sx={{ typography: { sx: "h6", md: "h5" } }}>
            <Link href="/">My Sticky Shoes</Link>
          </Typography>

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
            <LinkButton variant="text" href="/faq">
              Faq
            </LinkButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
