import { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
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
  const [userNick, setUserNick] = useState(user.userNick);
  const [userPhone, setUserPhone] = useState(user.userPhone);
  const [userDesc, setUserDesc] = useState(user.userDesc ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const updated = await userService.update(input);
      onSaved(updated);
    } catch (err) {
      console.log("ERROR updating profile", err);
      setError("Couldn't save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Avatar
            src={getImagePath(user.userImage, "/img/profile-placeholder.png")}
            sx={{ width: 72, height: 72 }}
          />
          <TextField
            label="Nickname"
            value={userNick}
            onChange={(e) => setUserNick(e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={userDesc}
            onChange={(e) => setUserDesc(e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
          {error && (
            <Stack sx={{ color: "error.main", fontSize: 14 }}>{error}</Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
