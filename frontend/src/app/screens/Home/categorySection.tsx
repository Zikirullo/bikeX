import { Box, Container, Grid, Stack } from "@mui/material";
import "../../../css/categorySection.css";

const categories = [
  {
    name: "Mountain",
    image: "/img/Monteria electic bicycle.jpg",
  },
  {
    name: "Road",
    image: "/img/Terra Road Off-road.jpg",
  },
  {
    name: "Electric",
    image: "/img/Cerpe.png",
  },
  {
    name: "Kids",
    image: "/img/Top Fuel.jpeg",
  },
];
export default function CategorySection() {
  return (
    <div className="category-section">
      <Container>
        <Box className={"section-title font-display"}>Shop by Category</Box>
        <Grid container spacing={3} className={"category-grid"}>
          {categories.map((category, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              className={"category-grid-item"}
              key={index}
            >
              <Box className={"category-card"}>
                <img
                  className={"category-img"}
                  src={category.image}
                  alt={category.name}
                />
                <Box className={"category-overlay"} />
                <Stack className={"category-info"}>
                  <Box className={"category-name font-display"}>
                    {category.name}
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
