"use client";

import {
  ArrowForward,
  LocalShippingOutlined,
  ReplayOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { LinkButton } from "@/components/LinkButton";
import Marquee from "@/components/Marquee";
import { MARQUEE1, MARQUEE2 } from "./constants";

const FEATURES = [
  {
    title: "Premium Quality",
    description: "Crafted with the finest materials for lasting comfort and durability.",
    icon: <ShoppingBagOutlined fontSize="large" color="primary" />,
  },
  {
    title: "Free Shipping",
    description: "Free standard shipping on all orders over $50.",
    icon: <LocalShippingOutlined fontSize="large" color="primary" />,
  },
  {
    title: "30-Day Returns",
    description: "Hassle-free returns within 30 days of purchase.",
    icon: <ReplayOutlined fontSize="large" color="primary" />,
  },
];

export default function LandingPage() {
  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          textAlign: "center",
          py: { xs: 8, md: 12 },
          background: theme =>
            `linear-gradient(90deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.primary.dark} 100%)`,
          backgroundSize: "150% 100%",
          animation: "breathe 2s ease-in-out infinite alternate",
          "@keyframes breathe": {
            "0%": { backgroundPosition: "0% 0%" },
            "100%": { backgroundPosition: "100% 0%" },
          },
          color: "white",
        }}
      >
        <Typography
          color="secondary"
          gutterBottom
          sx={{ typography: { xs: "h3", md: "h2", lg: "h1" } }}
        >
          Step into Infinity
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          A personal playground for exploring web technologies
        </Typography>
        <LinkButton
          href="/signup"
          color="secondary"
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
        >
          Explore
        </LinkButton>
      </Box>

      <Container component={Stack} spacing={5} maxWidth="xl">
        <Box id="about" sx={{ scrollMarginTop: "80px" }}>
          <Typography
            align="center"
            variant="h3"
            sx={{ mb: 4, typography: { xs: "h4", lg: "h3" } }}
          >
            About
          </Typography>
          <Typography
            align="center"
            variant="body1"
            color="textSecondary"
            sx={{ maxWidth: "lg", marginInline: "auto" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl
            nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas
            erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus.
            Mattis pellentesque id nibh tortor id aliquet lectus proin. Sapien faucibus et molestie
            ac feugiat sed lectus vestibulum. Ullamcorper velit sed ullamcorper morbi tincidunt
            ornare massa eget. Dictum varius duis at consectetur lorem. Nisi vitae suscipit tellus
            mauris a diam maecenas sed enim. Velit ut tortor pretium viverra suspendisse potenti
            nullam. Et molestie ac feugiat sed lectus. Non nisi est sit amet facilisis magna.
            Dignissim diam quis enim lobortis scelerisque fermentum. Odio ut enim blandit volutpat
            maecenas volutpat. Ornare lectus sit amet est placerat in egestas erat. Nisi vitae
            suscipit tellus mauris a diam maecenas sed. Placerat duis ultricies lacus sed turpis
            tincidunt id aliquet.
          </Typography>
        </Box>

        <Box id="features" sx={{ scrollMarginTop: "80px" }}>
          <Typography
            align="center"
            variant="h3"
            sx={{ mb: 4, typography: { xs: "h4", lg: "h3" } }}
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            {FEATURES.map(feature => (
              <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
                <Card sx={{ height: "100%" }}>
                  <CardContent component={Stack} spacing={1}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography align="center" variant="h6">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Box id="collections" sx={{ scrollMarginTop: "80px", mt: 5 }}>
        <Typography variant="h3" align="center" sx={{ typography: { xs: "h4", lg: "h3" } }}>
          Collections
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 4 }} color="textSecondary">
          Smile, we are gonna get it together somehow
        </Typography>

        <Stack spacing={2}>
          <Marquee direction="left" pixelsPerSecond={20}>
            {MARQUEE1.map(({ id, src, title }) => (
              <ImageCard key={id} src={src} title={title} />
            ))}
          </Marquee>

          <Marquee direction="right" pixelsPerSecond={20}>
            {MARQUEE2.map(({ id, src, title }) => (
              <ImageCard key={id} src={src} title={title} />
            ))}
          </Marquee>
        </Stack>
      </Box>
    </Box>
  );
}

function ImageCard({ src, title }: { src: string; title: string }) {
  return (
    <Box
      sx={{
        overflow: "hidden",
        borderRadius: 2,
        position: "relative",
        flexShrink: 0,
        width: { xs: 200, sm: 250, md: 280 },
        height: { xs: 180, sm: 220, md: 250 },
        mx: 1,
      }}
    >
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 600px) 200px, (max-width: 900px) 250px, 280px"
        style={{ objectFit: "cover" }}
        priority={false}
      />
    </Box>
  );
}
