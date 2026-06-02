"use client";

import {
  Add,
  AddShoppingCart,
  ChevronLeft,
  FavoriteBorder,
  Remove,
  Share,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/services/mock/products";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <Stack spacing={2}>
      <IconButton component={Link} href="/products" sx={{ alignSelf: "flex-start" }}>
        <ChevronLeft fontSize="large" />
      </IconButton>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: "relative", width: "100%", height: { xs: 400, md: 300 } }}>
            <Image
              alt={product.name}
              src={product.image}
              fill
              loading="eager"
              sizes="(max-width: 900px) 100vw, 40vw"
              style={{ objectFit: "cover", borderRadius: 12 }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="secondary">
                <FavoriteBorder />
              </IconButton>
              <IconButton size="small" color="secondary">
                <Share />
              </IconButton>
            </Stack>

            <Typography variant="h4" component="h1">
              {product.name}
              {product.isNew && (
                <Chip label="New Arrival" color="secondary" size="small" sx={{ ml: 1 }} />
              )}
            </Typography>

            <Typography color="textSecondary">Brand: {product.brand.title}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="textSecondary">
                ({product.reviewCount} reviews)
              </Typography>
            </Box>

            <Typography variant="h4" color="primary">
              ${product.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ whiteSpace: "pre-line" }}>
              {product.description}
            </Typography>

            <Divider />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Select Size
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {product.sizes.map(size => (
                  <Chip key={size} label={size} sx={{ cursor: "pointer" }} />
                ))}
              </Box>
            </Box>

            <Stack>
              <Typography variant="subtitle1" gutterBottom>
                Quantity
                <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                  ({product.stock} in stock)
                </Typography>
              </Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <IconButton>
                  <Remove />
                </IconButton>
                <Typography variant="body1" align="center">
                  {1}
                </Typography>
                <IconButton>
                  <Add />
                </IconButton>
              </Stack>
            </Stack>

            <Button variant="outlined" size="large" startIcon={<AddShoppingCart />} fullWidth>
              Add to Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
