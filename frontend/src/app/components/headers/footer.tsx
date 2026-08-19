import { Box, Container, Grid, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/footer.css";

const footerColumns = [
  {
    title: "SHOP",
    links: [
      { label: "Mountain", to: "/bikes?category=mountain" },
      { label: "Road", to: "/bikes?category=road" },
      { label: "Electric", to: "/bikes?category=electric" },
      { label: "Kids", to: "/bikes?category=kids" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "Order Status", to: "/orders" },
      { label: "Warranty", to: "/warranty" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Sustainability", to: "/sustainability" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Cookies", to: "/cookies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Grid container spacing={4} className={"footer-grid"}>
          <Grid size={{ xs: 12, md: 3 }} className={"footer-grid-item"}>
            <Stack className={"brand-block"}>
              <NavLink to="/">
                <img
                  className={"footer-logo"}
                  src="/img/logo.png"
                  alt="bikeX"
                />
              </NavLink>
              <Box className={"brand-desc"}>
                Precision-built bikes for riders who refuse to slow down.
                Designed in Colorado, ridden everywhere.
              </Box>
            </Stack>
          </Grid>

          {footerColumns.map((column, index) => (
            <Grid
              size={{ xs: 6, md: 3 }}
              className={"footer-grid-item"}
              key={index}
            >
              <Stack className={"link-column"}>
                <Box className={"column-title font-display"}>
                  {column.title}
                </Box>
                {column.links.map((link, linkIndex) => (
                  <NavLink
                    className={"footer-link"}
                    to={link.to}
                    key={linkIndex}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box className={"footer-divider"} />

        <Stack className={"legal-bar"}>
          <Box className={"copyright"}>
            © {year} bikeX. All rights reserved.
          </Box>
          <Stack className={"legal-links"}>
            {legalLinks.map((link, index) => (
              <NavLink className={"legal-link"} to={link.to} key={index}>
                {link.label}
              </NavLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </footer>
  );
}
