"use client";

import { Box } from "@mui/material";
import { type ReactNode, useEffect, useRef, useState } from "react";

const FRAME_PER_SECOND = 60;

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  pixelsPerSecond?: number;
}

export default function Marquee({
  children,
  direction = "left",
  pixelsPerSecond = 50,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const translateXPosition = useRef(0);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const oneRoundWidth = container.scrollWidth / 3;

    const animate = () => {
      if (hovered || !container) return;

      const pixelsPerFrame = pixelsPerSecond / FRAME_PER_SECOND;

      if (direction === "left") {
        translateXPosition.current -= pixelsPerFrame;

        if (translateXPosition.current <= -oneRoundWidth) {
          translateXPosition.current = 0;
        }
      } else {
        translateXPosition.current += pixelsPerFrame;

        if (translateXPosition.current >= 0) {
          translateXPosition.current = -oneRoundWidth;
        }
      }

      container.style.transform = `translateX(${translateXPosition.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [direction, pixelsPerSecond, hovered]);

  return (
    <Box
      sx={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        ref={containerRef}
        sx={{ display: "flex", width: "fit-content", willChange: "transform" }}
      >
        {children}
        {children}
        {children}
      </Box>
    </Box>
  );
}
