"use client";

import { Home, Refresh } from "@mui/icons-material";
import { Alert, Button, Container, Stack, Typography } from "@mui/material";
import { LinkButton } from "@/components/LinkButton";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ProfileError({ error, reset }: ErrorProps) {
  return (
    <Container maxWidth="sm" sx={{ p: 4 }}>
      <Stack spacing={2}>
        <Typography color="error" variant="h5">
          Ops, Something is broken!
        </Typography>
        <Alert severity="error">{error.message || "Something went wrong!"}</Alert>
        <Typography variant="caption">{error.stack}</Typography>
        <Stack spacing={1} direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={reset}>
            Try Again
          </Button>
          <LinkButton variant="outlined" startIcon={<Home />} href="/">
            Home
          </LinkButton>
        </Stack>
      </Stack>
    </Container>
  );
}
