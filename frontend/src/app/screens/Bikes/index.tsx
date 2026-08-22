import "../../../css/bikes.css";
import Search from "./search";
import Sorting from "./sorting";
import Bikes from "./bikes";
import { Container, Stack } from "@mui/material";
import BikesBanner from "./banner";

export default function BikesPage() {
  return (
    <div className="bikes-page">
      <Container>
        <BikesBanner title="Find Your Ride" />
        <Stack className={"bikes-toolbar"}>
          <Search />
          <Sorting />
        </Stack>
        <Bikes />
      </Container>
    </div>
  );
}
