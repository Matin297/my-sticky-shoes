import { Box, Skeleton, Stack } from "@mui/material";

export default function ProductLoading() {
  return (
    <Stack>
      <Skeleton variant="text" width={200} height={24} sx={{ mb: 2 }} />
      <Skeleton variant="text" width={120} height={32} sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="rounded" width="100%" height={400} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="80%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={32} sx={{ mb: 3 }} />
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mb: 4 }} />
          <Skeleton variant="rounded" width="100%" height={48} />
        </Box>
      </Box>
    </Stack>
  );
}
