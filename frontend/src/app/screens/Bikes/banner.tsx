import { Box, Container, Stack } from "@mui/material";
const categories = [
  { name: "MOUNTAIN", image: "/img/mountain-bike.png" },
  { name: "ROAD", image: "/img/road-bike.png" },
  { name: "ELECTRIC", image: "/img/electric-bike.png" },
  { name: "HYBRID", image: "/img/hybrid-bike.png" },
  { name: "KIDS", image: "/img/kid-bike.png" },
];
interface CategoryTitle {
  title: string;
}

export default function BikesBanner({ title }: CategoryTitle) {
  return (
    <div className="bikes-banner">
      <Container>
        <Box className={"banner-heading font-display"}>{title}</Box>
        <Stack className={"bike-row"}>
          {categories.map((category, index) => (
            <Box className={"bike-card"} key={index}>
              <Box className={"img-frame"}>
                <img src={category.image} alt={category.name} />
              </Box>
              <Box className={"card-overlay"} />
              <Box className={"card-glow"} />
              <Stack className={"label-block"}>
                <Box className={"label-text font-display"}>{category.name}</Box>
                <Box className={"label-underline"} />
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </div>
  );
}
