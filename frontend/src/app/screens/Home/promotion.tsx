import { Box, Button, Container, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/promotion.css";

export default function PromoBanner() {
  return (
    <div className="promo-banner">
      <Container>
        <Box className={"promo-card"}>
          <img
            className={"promo-img"}
            src="/img/promo/ebike-sale.jpg"
            alt="Select e-bikes on sale"
          />
          <Box className={"promo-overlay"} />
          <Stack className={"promo-content"}>
            <Box className={"limited-badge"}>LIMITED TIME</Box>
            <Box className={"promo-title font-display"}>
              Up to 20% off
              <br />
              select E-Bikes
            </Box>
            <Box className={"promo-desc"}>
              Upgrade your commute this season. Free integrated lights and a
              smart lock on every electric build.
            </Box>
            <Button variant={"contained"} className={"promo-button"}>
              Shop the Sale <ArrowForwardIcon className={"arrow-icon"} />
            </Button>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
