"use client";

import { DarkMode, LightMode, Settings as SystemMode } from "@mui/icons-material";
import {
  Box,
  type BoxProps,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { type ReactNode, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

const MODE_ICONS: Record<ThemeMode, ReactNode> = {
  light: <LightMode fontSize="large" />,
  dark: <DarkMode fontSize="large" />,
  system: <SystemMode fontSize="large" />,
};

export default function ThemeToggle(props: BoxProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
    handleClose();
  };

  return (
    <Box {...props}>
      <Tooltip title="Theme Settings">
        <IconButton onClick={handleClick}>{MODE_ICONS[mode]}</IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleModeChange("light")} selected={mode === "light"}>
          <ListItemIcon>
            <LightMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleModeChange("dark")} selected={mode === "dark"}>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleModeChange("system")} selected={mode === "system"}>
          <ListItemIcon>
            <SystemMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
