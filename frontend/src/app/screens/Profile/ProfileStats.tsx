import { Stack, Card, Typography } from "@mui/material";

export interface ProfileStat {
  label: string;
  value: string;
}

interface ProfileStatsProps {
  stats: ProfileStat[];
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <Stack direction="row" className="profile-stats-row">
      {stats.map((stat) => (
        <Card key={stat.label} className="profile-stat-card">
          <Typography variant="h4" className="profile-stat-value">
            {stat.value}
          </Typography>
          <Typography className="profile-stat-label">{stat.label}</Typography>
        </Card>
      ))}
    </Stack>
  );
}
