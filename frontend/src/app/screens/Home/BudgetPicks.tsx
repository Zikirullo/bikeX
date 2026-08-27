import { useEffect } from "react";
import { Box, Container, Stack } from "@mui/material";
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
      .catch((err) => {
        console.log("ERROR fetching budget picks", err);
      });
  }, [dispatch]);

  const goToDetails = (id: string) => {
    navigate(`/bikes/${id}`);
  };

  return (
    <div className={"budget-picks-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title font-display"}>Budget Picks</Box>
          <Stack className={"cards-frame"}>
            {bikes.length !== 0 ? (
              bikes.map((bike: Bike) => {
                const imagePath = bike.bikeImages
                  ? `${api}/${bike.bikeImages}`
                  : "/img/bike-placeholder.png";

                return (
                  <Box
                    key={bike._id}
                    className={"budget-card"}
                    onClick={() => goToDetails(bike._id)}
                  >
                    <Box className={"budget-card-image-frame"}>
                      <Box
                        component="img"
                        src={imagePath}
                        alt={bike.bikeName}
                        className={"budget-card-image"}
                      />
                      <Box className={"budget-card-overlay"} />
                      <Stack
                        direction="row"
                        className={"budget-card-overlay-content"}
                      >
                        <Box className={"budget-card-name"}>
                          {bike.bikeName}
                        </Box>
                        <Stack direction="row" className={"budget-card-views"}>
                          <Box>{bike.bikeViews}</Box>
                          <VisibilityIcon fontSize="inherit" />
                        </Stack>
                      </Stack>
                    </Box>
                    <Stack direction="row" className={"budget-card-footer"}>
                      <Box className={"budget-card-brand"}>
                        {bike.bikeBrandName}
                      </Box>
                      <Box className={"budget-card-price font-display"}>
                        ${bike.bikePrice}
                      </Box>
                    </Stack>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">No Budget Picks available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
