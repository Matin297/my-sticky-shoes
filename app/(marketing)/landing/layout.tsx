import { Box } from "@mui/material";
import LandingFooter from "./_components/LandingFooter";
import LandingHeader from "./_components/LandingHeader";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <LandingHeader />
      <Box sx={{ flex: 1 }} component="main">
        {children}
      </Box>
      <LandingFooter />
    </Box>
  );
}
