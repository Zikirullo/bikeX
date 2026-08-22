import {
  Box,
  Container,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import { retrievePopularBikes } from "./selector";
import { api } from "../../../lib/config";
import type { Bike } from "../../../lib/types/bike";

const popularBikesRetriever = createSelector(
  retrievePopularBikes,
  (popularBikes) => ({ popularBikes }),
);

export default function PopularBikes() {
  const { popularBikes } = useSelector(popularBikesRetriever);
  const navigate = useNavigate();

  const goToDetails = (id: string) => navigate(`/bikes/${id}`);
  const goToAllBikes = () => navigate("/bikes");

  return (
    <div className="popular-bikes-frame">
      <Container>
        <Stack className="popular-section">
          <Stack
            direction="row"
            className="section-header"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box className="category-title">The most wanted</Box>
            <Box
              className="view-all"
              onClick={goToAllBikes}
              sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              View all <ArrowForwardIcon className="arrow-icon" />
            </Box>
          </Stack>
          <Stack
            direction="row"
            className="cards-frame"
            sx={{ flexWrap: "wrap", gap: 3 }}
          >
            {popularBikes.length !== 0 ? (
              popularBikes.map((bike: Bike) => {
                const imagePath = bike.bikeImages
                  ? `${api}/${bike.bikeImages}`
                  : "/img/bike-placeholder.png";

                return (
                  <Card
                    key={bike._id}
                    className={"card"}
                    onClick={() => goToDetails(bike._id)}
                    sx={{
                      cursor: "pointer",
                      width: 270,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        image={imagePath}
                        alt={bike.bikeName}
                        sx={{ height: 220, objectFit: "cover" }}
                      />
                      <Box
                        className={"card-cover"}
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
                        }}
                      />
                      <Stack
                        direction="row"
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          left: 12,
                          right: 12,
                          justifyContent: "space-between",
                          width: "auto",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#fff",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: 180,
                          }}
                        >
                          {bike.bikeName}
                        </Typography>
                        <Typography
                          sx={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            fontWeight: 500,
                          }}
                        >
                          {bike.bikeViews}
                          <VisibilityIcon
                            sx={{ fontSize: 20, marginLeft: "5px" }}
                          />
                        </Typography>
                      </Stack>
                    </Box>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {bike.bikeBrandName}
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        ${bike.bikePrice}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Box className="no-data">Popular bikes are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
