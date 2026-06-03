"use client";

import {
  Add,
  AddShoppingCart,
  Check,
  ChevronLeft,
  Circle,
  Favorite,
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
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/services/mock/products";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  function handleAddToCard() {
    if (!size || !color) {
      toast.warning("Please select the variants: size, color");
      return;
    }

    toast.success(`Added to you cart successfully`);
  }

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
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="secondary" onClick={() => setIsFavorite(fav => !fav)}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
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
                {product.sizes.map(({ id, title }) => (
                  <Chip
                    icon={id === size ? <Check /> : <Circle />}
                    clickable={false}
                    key={id}
                    label={title}
                    onClick={() => setSize(id)}
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Select Color
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {product.colors.map(({ id, title, code }) => (
                  <Chip
                    variant="outlined"
                    key={id}
                    label={title}
                    clickable={false}
                    icon={id === color ? <Check /> : <Circle />}
                    onClick={() => setColor(id)}
                    sx={{
                      bgcolor: code,
                      cursor: "pointer",
                      color: theme => theme.palette.getContrastText(code),
                    }}
                  />
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
                <IconButton disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}>
                  <Remove />
                </IconButton>
                <Typography variant="body1" align="center">
                  {quantity}
                </Typography>
                <IconButton
                  disabled={quantity >= product.stock}
                  onClick={() => setQuantity(q => q + 1)}
                >
                  <Add />
                </IconButton>
              </Stack>
            </Stack>

            <Button
              variant="outlined"
              size="large"
              startIcon={<AddShoppingCart />}
              fullWidth
              onClick={handleAddToCard}
            >
              Add to Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
