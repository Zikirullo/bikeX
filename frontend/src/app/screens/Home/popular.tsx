import { Box, Container, Grid, Typography } from "@mui/material";
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

  return (
    <div className="home-section">
      <Container>
        <Box className="section-header">
          <Box
            className="section-header-title font-display"
            data-badge="HANDPICKED"
          >
            The Most Wanted
          </Box>
          <Box
            className="section-header-action"
            onClick={() => navigate("/bikes")}
          >
            View all <ArrowForwardIcon fontSize="small" />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {popularBikes.length > 0 ? (
            popularBikes.map((bike: Bike) => {
              const imagePath = bike.bikeImages
                ? `${api}/${bike.bikeImages}`
                : "/img/bike-placeholder.png";

              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={bike._id}>
                  <Box
                    className="custom-card"
                    onClick={() => navigate(`/bikes/${bike._id}`)}
                  >
                    <Box className="custom-card-media">
                      <img
                        className="custom-card-img"
                        src={imagePath}
                        alt={bike.bikeName}
                      />
                      <Box className="custom-card-media-overlay" />
                      <Box className="custom-card-media-content">
                        <Typography className="custom-card-title">
                          {bike.bikeName}
                        </Typography>
                        <Box className="custom-card-badge">
                          {bike.bikeViews} <VisibilityIcon fontSize="inherit" />
                        </Box>
                      </Box>
                    </Box>
                    <Box className="custom-card-body">
                      <Typography className="custom-card-subtext">
                        {bike.bikeBrandName}
                      </Typography>
                      <Typography className="custom-card-price font-display">
                        ${bike.bikePrice}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Box className="no-data">
              Popular bikes are currently unavailable.
            </Box>
          )}
        </Grid>
      </Container>
    </div>
  );
}
