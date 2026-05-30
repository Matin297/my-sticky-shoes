"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { toast } from "sonner";
import type { Product } from "@/services/mock/products";

interface ProductCardProps {
  product: Product;
  priority: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const handleAddToCart = () => {
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: 200 }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          loading={priority ? "eager" : "lazy"}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" color="textSecondary">
          {product.category.title}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
            ({product.rating})
          </Typography>
        </Box>
        <Typography variant="body2" gutterBottom>
          {product.description.length > 80
            ? `${product.description.slice(0, 80)}...`
            : product.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Typography>${product.price.toFixed(2)}</Typography>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
