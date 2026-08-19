import { Box, Button, Container, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/header.css";

export default function Header() {
  return (
    <div className="header">
      <Box className={"header-bg"}>
        <img className={"header-bg-img"} src="/img/header.avif" alt="header" />
        <Box className={"header-overlay"} />
      </Box>
      <Container>
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"collection-badge"}>SEASON 2026 COLLECTION</Box>
            <Box className={"head-main-txt"}>
              RIDE MORE.
              <br />
              <span className={"accent"}>LIVE FREE.</span>
            </Box>
            <Box className={"wel-txt"}>
              Precision-engineered bikes built for riders who refuse to slow
              down. From alpine singletrack to midnight city streets — find the
              machine that moves like you do.
            </Box>
            <Stack className={"cta-group"}>
              <Button variant={"contained"} className={"shop-button"}>
                Shop Bikes <ArrowForwardIcon className={"arrow-icon"} />
              </Button>
              <Button variant={"outlined"} className={"fit-button"}>
                Find Your Fit
              </Button>
            </Stack>
            <Stack className={"stats"}>
              <Box className={"stat-item"}>
                <Box className={"stat-num"}>12k+</Box>
                <Box className={"stat-label"}>Riders</Box>
              </Box>
              <Box className={"stat-item"}>
                <Box className={"stat-num"}>4.9★</Box>
                <Box className={"stat-label"}>Avg. Rating</Box>
              </Box>
              <Box className={"stat-item"}>
                <Box className={"stat-num"}>60+</Box>
                <Box className={"stat-label"}>Models</Box>
              </Box>
            </Stack>
          </Stack>
          <Stack>
            <img className={"header-image"} src="/img/logo.png" alt="" />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
