import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

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
      .catch((err) => {
        console.log("ERROR fetching top users", err);
      });
  }, []);

  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title font-display"}>Active Riders</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider defaultMode="dark">
              {topUsers.length !== 0 ? (
                topUsers.map((user: User) => {
                  const imagePath = getImagePath(
                    user.userImage,
                    "/img/profile-placeholder.png",
                  );

                  return (
                    <Card key={user._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={user.userNick} />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow className={"card-body"}>
                        <Typography className={"user-nickname"}>
                          {user.userNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Riders!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
