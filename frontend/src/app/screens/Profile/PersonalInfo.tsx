import { Box, Stack, Card, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import type { User } from "../../../lib/types/user";

interface PersonalInfoProps {
  user: User;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
  const memberSince = new Date(user.createdAt).getFullYear();

  const fields = [
    { label: "Nickname", value: user.userNick },
    { label: "Phone", value: user.userPhone },
    { label: "User Type", value: user.userType },
    { label: "Member Since", value: String(memberSince) },
  ];

  return (
    <Card className="personal-info-card">
      <Stack direction="row" className="personal-info-header">
        <PersonIcon className="personal-info-icon" fontSize="small" />
        <Typography className="personal-info-title">
          Personal Information
        </Typography>
      </Stack>
      <Stack direction="row" className="personal-info-fields">
        {fields.map((field) => (
          <Box key={field.label} className="personal-info-field">
            <Typography className="personal-info-field-label">
              {field.label}
            </Typography>
            <Typography className="personal-info-field-value">
              {field.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
