import { Box, Button, Grid, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

const bikes = [
  {
    tag: "BEST SELLER",
    category: "MOUNTAIN",
    brand: "Trek",
    name: "Trailblazer X1",
    rating: 4.8,
    reviews: 214,
    price: "$2,499",
    image: "/img/Cerpe.png",
  },
  {
    tag: null,
    category: "MOUNTAIN",
    brand: "Giant",
    name: "Summit Pro 29",
    rating: 4.7,
    reviews: 168,
    price: "$3,199",
    image: "/img/bikes/summit-pro-29.jpg",
  },
  {
    tag: "EDITOR'S PICK",
    category: "ROAD",
    brand: "Specialized",
    name: "Velocity R7",
    rating: 4.9,
    reviews: 302,
    price: "$2,899",
    image: "/img/bikes/velocity-r7.jpg",
  },
  {
    tag: null,
    category: "ROAD",
    brand: "Cannondale",
    name: "Aero Elite Carbon",
    rating: 4.9,
    reviews: 141,
    price: "$4,299",
    image: "/img/bikes/aero-elite-carbon.jpg",
  },
  {
    tag: "NEW",
    category: "ELECTRIC",
    brand: "Rad Power",
    name: "Voltix E-Cruiser",
    rating: 4.6,
    reviews: 489,
    price: "$1,899",
    image: "/img/bikes/voltix-e-cruiser.jpg",
  },
  {
    tag: null,
    category: "ELECTRIC",
    brand: "Specialized",
    name: "Surge E-MTB",
    rating: 4.8,
    reviews: 97,
    price: "$5,499",
    image: "/img/bikes/surge-e-mtb.jpg",
  },
  {
    tag: "BEST SELLER",
    category: "KIDS",
    brand: "Woom",
    name: "Junior Rider 20",
    rating: 4.9,
    reviews: 256,
    price: "$429",
    image: "/img/bikes/junior-rider-20.jpg",
  },
  {
    tag: null,
    category: "KIDS",
    brand: "Guardian",
    name: "SureStop 24",
    rating: 4.7,
    reviews: 132,
    price: "$389",
    image: "/img/bikes/surestop-24.jpg",
  },
  {
    tag: null,
    category: "MOUNTAIN",
    brand: "Santa Cruz",
    name: "Ridgeline Trail",
    rating: 4.8,
    reviews: 176,
    price: "$3,899",
    image: "/img/bikes/ridgeline-trail.jpg",
  },
  {
    tag: null,
    category: "ELECTRIC",
    brand: "Aventon",
    name: "Level Commuter",
    rating: 4.6,
    reviews: 214,
    price: "$1,699",
    image: "/img/bikes/level-commuter.jpg",
  },
  {
    tag: null,
    category: "ROAD",
    brand: "Trek",
    name: "Domane Endurance",
    rating: 4.8,
    reviews: 188,
    price: "$3,499",
    image: "/img/bikes/domane-endurance.jpg",
  },
  {
    tag: null,
    category: "KIDS",
    brand: "Woom",
    name: "Trail Explorer 16",
    rating: 4.9,
    reviews: 88,
    price: "$349",
    image: "/img/bikes/trail-explorer-16.jpg",
  },
];

export default function Bikes() {
  return (
    <Box className={"bikes-listing"}>
      <Box className={"results-count"}>
        Showing <span className={"count-num"}>{bikes.length}</span> bikes
      </Box>

      <Grid container spacing={3} className={"bikes-grid"}>
        {bikes.map((bike, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            className={"bikes-grid-item"}
            key={index}
          >
            <Box className={"bike-card"}>
              <Box className={"bike-img-frame"}>
                <img className={"bike-img"} src={bike.image} alt={bike.name} />
                {bike.tag ? <Box className={"bike-tag"}>{bike.tag}</Box> : null}
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
                  <Box className={"bike-price font-display"}>{bike.price}</Box>
                  <Button variant={"outlined"} className={"details-button"}>
                    View Details
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
