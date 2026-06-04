"use client";

import { Home, ShoppingBag, Web } from "@mui/icons-material";
import { AppBar, Box, Toolbar } from "@mui/material";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import ThemeToggle from "@/app/_components/ThemeToggle";
import { LinkButton } from "@/components/LinkButton";
import ProfileMenu from "./ProfileMenu";

interface NavLink {
  id: number;
  title: string;
  path: Route;
  icon: ReactNode;
}

const NAV_LINKS: NavLink[] = [
  {
    id: 1,
    title: "home",
    path: "/",
    icon: <Home />,
  },
  {
    id: 2,
    title: "products",
    path: "/products",
    icon: <ShoppingBag />,
  },
  {
    id: 3,
    title: "landing",
    path: "/landing",
    icon: <Web />,
  },
];

export default function Header() {
  const pathname = usePathname();

  const isNavLinkActive = (navLinkPath: string) => {
    if (navLinkPath === "/") return pathname === "/";
    return pathname.startsWith(navLinkPath);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          {NAV_LINKS.map(({ id, path, title, icon }) => {
            return (
              <LinkButton
                color={isNavLinkActive(path) ? "secondary" : "primary"}
                key={id}
                href={path}
                startIcon={icon}
              >
                {title}
              </LinkButton>
            );
          })}
          <ThemeToggle sx={{ ml: "auto" }} />
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
