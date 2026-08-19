import { Box, Container, Grid, Stack } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";

const services = [
  {
    icon: <LocalShippingOutlinedIcon />,
    title: "Free Shipping",
    description: "Doorstep delivery on every order over $500, fully insured.",
  },
  {
    icon: <ShieldOutlinedIcon />,
    title: "Lifetime Warranty",
    description: "Frames covered for life. Components for two full years.",
  },
  {
    icon: <EditOutlinedIcon />,
    title: "Pro Assembly",
    description: "Ships 90% built. Free white-glove setup in metro areas.",
  },
  {
    icon: <BoltOutlinedIcon />,
    title: "30-Day Rides",
    description: "Not the one? Return it within 30 days, no questions.",
  },
];

export default function ServicesSection() {
  return (
    <div className="services-section">
      <Container>
        <Grid container spacing={4} className={"services-grid"}>
          {services.map((service, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              className={"services-grid-item"}
              key={index}
            >
              <Stack className={"service-card"}>
                <Box className={"service-icon"}>{service.icon}</Box>
                <Box className={"service-title font-display"}>
                  {service.title}
                </Box>
                <Box className={"service-desc"}>{service.description}</Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
