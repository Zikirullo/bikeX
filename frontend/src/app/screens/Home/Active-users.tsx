import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import UserService from "../../services/User.service";
import { getImagePath } from "../../../lib/config";
import type { User } from "../../../lib/types/user";

const userService = new UserService();

export default function ActiveUsers() {
  const [topUsers, setTopUsers] = useState<User[]>([]);

  useEffect(() => {
    userService
      .getTopUsers()
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => Number(b.userPoints ?? 0) - Number(a.userPoints ?? 0),
        );
        setTopUsers(sorted.slice(0, 4));
      })
      .catch((err) => console.log("ERROR fetching top users", err));
  }, []);

  return (
    <div className="home-section">
      <Container>
        <Box className="section-header">
          <Box
            className="section-header-title font-display"
            data-badge="COMMUNITY"
          >
            Active Riders
          </Box>
        </Box>

        <Grid container spacing={3}>
          {topUsers.length > 0 ? (
            topUsers.map((user: User) => {
              const imagePath = getImagePath(
                user.userImage,
                "/img/profile-placeholder.png",
              );

              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={user._id}>
                  <Box className="custom-card" style={{ cursor: "default" }}>
                    <Box className="custom-card-media" style={{ height: 220 }}>
                      <img
                        className="custom-card-img"
                        src={imagePath}
                        alt={user.userNick}
                      />
                      <Box className="custom-card-media-overlay" />
                    </Box>
                    <Box className="custom-card-body">
                      <Typography className="custom-card-title">
                        {user.userNick}
                      </Typography>
                      <Typography
                        className="custom-card-subtext"
                        style={{ color: "#ff8a3d" }}
                      >
                        {user.userPoints ?? 0} pts
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Box className="no-data">No Active Riders found.</Box>
          )}
        </Grid>
      </Container>
    </div>
  );
}
