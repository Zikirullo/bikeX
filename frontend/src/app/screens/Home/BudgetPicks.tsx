import { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import BikesService from "../../services/Bikes.service";
import { api } from "../../../lib/config";
import type { Bike } from "../../../lib/types/bike";
import { retrieveBikes } from "../Bikes/selector";
import { setCBikes } from "../Bikes/slice";

const bikesRetriever = createSelector(retrieveBikes, (bikes) => ({ bikes }));
const bikesService = new BikesService();

export default function BudgetPicks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bikes } = useSelector(bikesRetriever);

  useEffect(() => {
    bikesService
      .getBikes({ page: 1, limit: 4, order: "bikePriceAsc", search: "" })
      .then((data) => dispatch(setCBikes(data)))
      .catch((err) => console.log("ERROR fetching budget picks", err));
  }, [dispatch]);

  return (
    <div className="home-section-alt">
      <Container>
        <Box className="section-header">
          <Box
            className="section-header-title font-display"
            data-badge="AFFORDABLE RIDES"
          >
            Budget Picks
          </Box>
        </Box>

        <Grid container spacing={3}>
          {bikes.length > 0 ? (
            bikes.map((bike: Bike) => {
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
            <Box className="no-data">No Budget Picks available right now.</Box>
          )}
        </Grid>
      </Container>
    </div>
  );
}
