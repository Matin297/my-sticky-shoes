import { Typography } from "@mui/material";
import type { Metadata } from "next";
import InfiniteProducts from "./_components/InfiniteProducts";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <Typography component="h1" sx={{ typography: { xs: "h3", md: "h2" } }}>
        Products
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        Discover our premium collection of footwear
      </Typography>
      <InfiniteProducts />
    </>
  );
}
