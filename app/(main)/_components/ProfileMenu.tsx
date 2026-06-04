import { Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getUsernameInitials } from "@/lib/utils";
import { useLogout } from "@/services/generated/auth/auth";
import { useGetCurrentUser } from "@/services/generated/profile/profile";

export default function ProfileMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { data, isLoading: isProfileLoading } = useGetCurrentUser();
  const user = data?.data.user;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    router.push("/profile");
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        handleMenuClose();
        router.push("/login");
        toast.success("Logged out successfully");
      },
    });
  };

  if (isProfileLoading) {
    return null;
  }

  return (
    <Box>
      <Tooltip title="Profile Settings">
        <IconButton>
          <Avatar sx={{ width: 35, height: 35 }} onClick={handleMenuOpen} src={user?.avatar}>
            {user?.name ? getUsernameInitials(user.name) : <Person />}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu open={open} anchorEl={anchorEl} onClose={handleMenuClose}>
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout} disabled={isLogoutPending}>
          <ListItemIcon>
            {isLogoutPending ? <CircularProgress size={20} /> : <Logout fontSize="small" />}
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
