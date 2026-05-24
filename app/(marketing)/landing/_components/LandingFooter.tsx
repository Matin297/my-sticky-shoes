import { Box, Container, Link, Stack, Typography } from "@mui/material";

export default function LandingFooter() {
  return (
    <Box component="footer" sx={{ py: 4, borderTop: 1, borderColor: "divider", mt: 4 }}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} My Sticky Shoes. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="/privacy" underline="hover" color="text.secondary">
              Privacy
            </Link>
            <Link href="/terms" underline="hover" color="text.secondary">
              Terms
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
