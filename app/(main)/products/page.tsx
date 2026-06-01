import { Typography } from "@mui/material";
import type { Metadata } from "next";
import PageMainHeading from "@/app/(main)/_components/PageMainHeading";
import InfiniteProducts from "./_components/InfiniteProducts";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <>
      <PageMainHeading>Products</PageMainHeading>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        Discover our premium collection of footwear
      </Typography>
      <InfiniteProducts />
    </>
  );
}
