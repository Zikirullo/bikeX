import { Box, Button, Container, Grid, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/popularBikes.css";

const bikes = [
  {
    tag: "BEST SELLER",
    category: "MOUNTAIN",
    brand: "Trek",
    name: "Trailblazer X1",
    rating: 4.8,
    reviews: 214,
    price: "$2,499",
    image: "/img/Terra Road Off-road.jpg",
  },
  {
    tag: "EDITOR'S PICK",
    category: "ROAD",
    brand: "Specialized",
    name: "Velocity R7",
    rating: 4.9,
    reviews: 302,
    price: "$2,899",
    image: "/img/Terra Road Off-road.jpg",
  },
  {
    tag: "NEW",
    category: "ELECTRIC",
    brand: "Rad Power",
    name: "Voltix E-Cruiser",
    rating: 4.6,
    reviews: 489,
    price: "$1,899",
    image: "/img/Cerpe.png",
  },
  {
    tag: "BEST SELLER",
    category: "KIDS",
    brand: "Woom",
    name: "Junior Rider 20",
    rating: 4.9,
    reviews: 256,
    price: "$429",
    image: "/img/Top Fuel.jpeg",
  },
];

export default function PopularBikes() {
  return (
    <div className="popular-bikes">
      <Container>
        <Stack className={"section-header"}>
          <Stack className={"heading-block"}>
            <Box className={"overline"}>HANDPICKED</Box>
            <Box className={"section-title font-display"}>Featured Bikes</Box>
          </Stack>
          <Box className={"view-all"}>
            View all <ArrowForwardIcon className={"arrow-icon"} />
          </Box>
        </Stack>

        <Grid container spacing={3} className={"bikes-grid"}>
          {bikes.map((bike, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              className={"bikes-grid-item"}
              key={index}
            >
              <Box className={"bike-card"}>
                <Box className={"bike-img-frame"}>
                  <img
                    className={"bike-img"}
                    src={bike.image}
                    alt={bike.name}
                  />
                  <Box className={"bike-tag"}>{bike.tag}</Box>
                  <Box className={"favorite-icon"}>
                    <FavoriteBorderIcon fontSize={"small"} />
                  </Box>
                </Box>
                <Stack className={"bike-details"}>
                  <Stack className={"bike-meta"}>
                    <Box className={"bike-category"}>{bike.category}</Box>
                    <Box className={"bike-brand"}>{bike.brand}</Box>
                  </Stack>
                  <Box className={"bike-name font-display"}>{bike.name}</Box>
                  <Stack className={"bike-rating"}>
                    <StarIcon className={"star-icon"} fontSize={"small"} />
                    <Box className={"rating-num"}>{bike.rating}</Box>
                    <Box className={"rating-count"}>({bike.reviews})</Box>
                  </Stack>
                  <Stack className={"bike-footer"}>
                    <Box className={"bike-price font-display"}>
                      {bike.price}
                    </Box>
                    <Button variant={"outlined"} className={"details-button"}>
                      View Details
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
