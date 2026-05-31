"use client";

import { Refresh } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useGetProductsInfinite } from "@/services/generated/products/products";
import { ProductCard } from "./ProductCard";

const LIMIT = 10;
const PRIORITY = 1;

export default function InfiniteProducts() {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, isFetchNextPageError } =
    useGetProductsInfinite(
      { limit: LIMIT },
      { query: { getNextPageParam: lastPage => lastPage.data.nextCursor, initialPageParam: 0 } },
    );

  const productPages = data?.pages ?? [];

  const loadMoreRef = useIntersectionObserver({ fetchNextPage, hasNextPage, isFetchingNextPage });

  if (isLoading) {
    return (
      <Stack sx={{ alignItems: "center" }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (productPages.length === 0) {
    return <Typography variant="h6">No products found</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {productPages.map(group =>
          group.data.products?.map((product, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
              <ProductCard product={product} priority={index <= PRIORITY} />
            </Grid>
          )),
        )}
      </Grid>

      <Box ref={loadMoreRef} sx={{ py: 4, textAlign: "center", minHeight: 40 }}>
        {isFetchingNextPage && <CircularProgress size={32} />}
        {isFetchNextPageError && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => fetchNextPage()}
          >
            Retry Loading More
          </Button>
        )}
      </Box>
    </Box>
  );
}
