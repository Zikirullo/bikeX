import { Box, Container, Stack } from "@mui/material";
import { BikeType } from "../../../lib/enum/bikes.enum";

const categories = [
  {
    name: "MOUNTAIN",
    image: "/img/mountain-bike.png",
    value: BikeType.MOUNTAIN,
  },
  {
    name: "ROAD",
    image: "/img/road-bike.png",
    value: BikeType.ROAD,
  },
  {
    name: "ELECTRIC",
    image: "/img/electric-bike.png",
    value: BikeType.ELECTRIC,
  },
  {
    name: "HYBRID",
    image: "/img/hybrid-bike.png",
    value: BikeType.HYBRID,
  },
  {
    name: "KIDS",
    image: "/img/kid-bike.png",
    value: BikeType.KIDS,
  },
];

interface BikesBannerProps {
  title: string;
  selectedType?: BikeType;
  onTypeChange: (type: BikeType | undefined) => void;
}

export default function BikesBanner({
  title,
  selectedType,
  onTypeChange,
}: BikesBannerProps) {
  return (
    <div className="bikes-banner">
      <Container>
        <Box className={"banner-heading font-display"}>{title}</Box>

        <Stack className={"bike-row"}>
          {categories.map((category) => (
            <Box
              className={`bike-card ${
                selectedType === category.value ? "selected" : ""
              }`}
              key={category.value}
              onClick={() => {
                if (selectedType === category.value) {
                  onTypeChange(undefined);
                } else {
                  onTypeChange(category.value);
                }
              }}
              sx={{ cursor: "pointer" }}
            >
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
