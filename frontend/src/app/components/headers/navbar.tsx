import { useState } from "react";
import { Badge, Box, Button, Container, Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import "../../../css/navbar.css";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../screens/auth/suth.selector";

import UserService from "../../services/User.service";
import { clearAuth } from "../../screens/auth/auth.slice";
import { selectBasketCount } from "../Basket/selector";
import Basket from "../Basket/Basket";
import { getImagePath } from "../../../lib/config";

export default function Navbar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const basketCount = useSelector(selectBasketCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const userService = new UserService();
      await userService.logout();
    } catch (err) {
      console.log("ERROR in logout", err);
    } finally {
      dispatch(clearAuth());
      setMenuOpen(false);
      navigate("/");
    }
  };

  const avatarSrc = getImagePath(user?.userImage, "/icons/user.default.png");

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
            {isAuthenticated ? (
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
            {isAuthenticated ? (
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
          <Stack
            className="actions"
            direction="row"
            sx={{ alignItems: "center" }}
          >
            <Box
              className={"cart-icon"}
              onClick={() => setBasketOpen(true)}
              sx={{ cursor: "pointer" }}
            >
              <Badge badgeContent={basketCount} color="warning">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Box>
            {!isAuthenticated ? (
              <NavLink to="/login" className={"login-button"}>
                Login
              </NavLink>
            ) : (
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <img
                  className="user-avatar"
                  src={avatarSrc}
                  alt={user?.userNick ?? "User"}
                  aria-haspopup={"true"}
                  onClick={() => setMenuOpen((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                />
                {menuOpen && (
                  <Button
                    onClick={handleLogout}
                    className="navbar-logout-btn"
                    size="small"
                  >
                    Log out
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>

      <Basket open={basketOpen} onClose={() => setBasketOpen(false)} />
    </div>
  );
}
