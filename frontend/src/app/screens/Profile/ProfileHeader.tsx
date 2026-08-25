import {
  Box,
  Stack,
  Card,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { User } from "../../../lib/types/user";
import { getImagePath } from "../../../lib/config";

interface ProfileHeaderProps {
  user: User;
  onEdit?: () => void;
}

export default function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  const memberSince = new Date(user.createdAt).getFullYear();
  const imagePath = getImagePath(
    user.userImage,
    "/img/profile-placeholder.png",
  );

  return (
    <Card className="profile-header-card">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        className="profile-header-stack"
      >
        <Avatar
          src={imagePath}
          alt={user.userNick}
          className="profile-header-avatar"
        />
        <Box className="profile-header-info">
          <Typography variant="h4" className="profile-header-name">
            {user.userNick}
          </Typography>
          <Typography className="profile-header-phone">
            {user.userPhone}
          </Typography>
          <Chip
            label={`${user.userType} · Since ${memberSince}`}
            size="small"
            className="profile-header-badge"
          />
        </Box>
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          onClick={onEdit}
          className="profile-header-edit-btn"
        >
          Edit Profile
        </Button>
      </Stack>
    </Card>
  );
}
