import { Stack } from "@mui/material";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Stack
      sx={{
        height: "100dvh",
        padding: 3,
        justifyContent: "center",
        maxWidth: 600,
        marginX: "auto",
      }}
    >
      {children}
    </Stack>
  );
}
