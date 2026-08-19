import { Box, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../../../css/navbar.css";

export default function Navbar() {
  // TODO: replace with your actual auth context/hook
  const authMember = "null";

  return (
    <div className="navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/img/logo.png" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={"nav-pill"}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Home
              </NavLink>
            </Box>
            <Box className={"nav-pill"}>
              <NavLink
                to="/bikes"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Bikes
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"nav-pill"}>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Orders
                </NavLink>
              </Box>
            ) : null}
            <Box className={"nav-pill"}>
              <NavLink
                to="/help"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Help
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"nav-pill"}>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "active" : undefined
                  }
                >
                  Profile
                </NavLink>
              </Box>
            ) : null}
          </Stack>
          <Stack className="actions">
            <Box className={"cart-icon"}>
              <ShoppingCartOutlinedIcon />
            </Box>
            {!authMember ? (
              <Box className={"login-button"}>Login</Box>
            ) : (
              <img
                className="user-avatar"
                src={"/icons/user.default.png"}
                aria-haspopup={"true"}
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
