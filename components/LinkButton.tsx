"use client";

import { Button, type ButtonProps } from "@mui/material";
import type { Route } from "next";
import Link from "next/link";

interface NavButtonProps extends Omit<ButtonProps, "href"> {
  href: Route;
}

export function LinkButton({ href, children, ...props }: NavButtonProps) {
  return (
    <Button LinkComponent={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
