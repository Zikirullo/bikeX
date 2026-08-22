import { Box, Button, Grid, Stack } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { retrieveBikes } from "./selector";
import { api } from "../../../lib/config";
import type { Bike } from "../../../lib/types/bike";

const bikesRetriever = createSelector(retrieveBikes, (bikes) => ({ bikes }));

export default function Bikes() {
  const { bikes } = useSelector(bikesRetriever);

  const navigate = useNavigate();

  const goToDetails = (id: string) => {
    navigate(`/bikes/${id}`);
  };

  return (
    <Box className={"bikes-listing"}>
      <Box className={"results-count"}>
        Showing <span className={"count-num"}>{bikes.length}</span> bikes
      </Box>

      {bikes.length !== 0 ? (
        <Grid container spacing={3} className={"bikes-grid"}>
          {bikes.map((bike: Bike) => {
            const imagePath = bike.bikeImages
              ? `${api}/${bike.bikeImages}`
              : "/img/bike-placeholder.png";

            return (
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
                className={"bikes-grid-item"}
                key={bike._id}
              >
                <Box className={"bike-card"}>
                  <Box className={"bike-img-frame"}>
                    <img
                      className={"bike-img"}
                      src={imagePath}
                      alt={bike.bikeName}
                    />

                    <Box className={"favorite-icon"}>
                      <FavoriteBorderIcon fontSize={"small"} />
                    </Box>
                  </Box>

                  <Stack className={"bike-details"}>
                    <Stack className={"bike-meta"}>
                      <Box className={"bike-category"}>{bike.bikeType}</Box>

                      <Box className={"bike-brand"}>{bike.bikeBrandName}</Box>
                    </Stack>

                    <Box className={"bike-name font-display"}>
                      {bike.bikeName}
                    </Box>

                    <Stack className={"bike-rating"}>
                      <VisibilityIcon
                        className={"star-icon"}
                        fontSize={"small"}
                      />

                      <Box className={"rating-num"}>{bike.bikeViews}</Box>

                      <Box className={"rating-count"}>views</Box>
                    </Stack>

                    <Stack className={"bike-footer"}>
                      <Box className={"bike-price font-display"}>
                        ${bike.bikePrice}
                      </Box>

                      <Button
                        variant={"outlined"}
                        className={"details-button"}
                        onClick={() => goToDetails(bike._id)}
                      >
                        View Details
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box className="no-data">Bikes are not available!</Box>
      )}
    </Box>
  );
}
