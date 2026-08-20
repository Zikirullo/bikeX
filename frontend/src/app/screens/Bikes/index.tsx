import Banner from "./banner";
import "../../../css/bikes.css";
import Search from "./search";
import Sorting from "./sorting";
import Bikes from "./bikes";
import { Container, Stack } from "@mui/material";

export default function BikesPage() {
  return (
    <div className="bikes-page">
      <Banner />
      <div className="bikes-page">
        <Container>
          <Stack className={"bikes-toolbar"}>
            <Search />
            <Sorting />
          </Stack>
          <Bikes />
        </Container>
      </div>
    </div>
  );
}
