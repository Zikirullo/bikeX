import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import type { User, UserUpdateInput } from "../../../lib/types/user";
import UserService from "../../services/User.service";
import { getImagePath } from "../../../lib/config";

const userService = new UserService();

interface EditProfileDialogProps {
  open: boolean;
  user: User;
  onClose: () => void;
  onSaved: (user: User) => void;
}

export default function EditProfileDialog({
  open,
  user,
  onClose,
  onSaved,
}: EditProfileDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userNick, setUserNick] = useState(user.userNick);
  const [userPhone, setUserPhone] = useState(user.userPhone);
  const [userDesc, setUserDesc] = useState(user.userDesc ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarSrc =
    previewUrl ?? getImagePath(user.userImage, "/img/profile-placeholder.png");

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const input: UserUpdateInput = {
        _id: user._id,
        userNick,
        userPhone,
        userDesc,
        userImage: user.userImage,
      };
      const updated = await userService.update(input, imageFile ?? undefined);
      onSaved(updated);
    } catch (err) {
      console.log("ERROR updating profile", err);
      setError("Couldn't save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      className="edit-profile-dialog"
      slotProps={{
        paper: {
          className: "edit-profile-paper",
        },
      }}
    >
      <DialogTitle className="edit-profile-title font-display">
        Edit Profile
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ position: "relative", width: 88, height: 88 }}>
              <Avatar
                src={avatarSrc}
                sx={{ width: 88, height: 88 }}
                className="edit-profile-avatar"
              />
              <IconButton
                size="small"
                onClick={handlePickImage}
                className="edit-profile-avatar-btn"
                aria-label="Change photo"
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Box>
          </Box>

          <TextField
            label="Nickname"
            value={userNick}
            onChange={(e) => setUserNick(e.target.value)}
            fullWidth
            className="edit-profile-field"
          />
          <TextField
            label="Phone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            fullWidth
            className="edit-profile-field"
          />
          <TextField
            label="Description"
            value={userDesc}
            onChange={(e) => setUserDesc(e.target.value)}
            multiline
            rows={3}
            fullWidth
            className="edit-profile-field"
          />
          {error && (
            <Typography className="edit-profile-error">{error}</Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions className="edit-profile-actions">
        <Button
          onClick={onClose}
          disabled={saving}
          className="edit-profile-cancel-btn"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving}
          className="edit-profile-save-btn"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
