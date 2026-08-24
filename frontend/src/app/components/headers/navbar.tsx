import { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
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

export default function Navbar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

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
          <Stack className="actions">
            <Box className={"cart-icon"}>
              <ShoppingCartOutlinedIcon />
            </Box>
            {!isAuthenticated ? (
              <NavLink to="/login" className={"login-button"}>
                Login
              </NavLink>
            ) : (
              <Box sx={{ position: "relative" }}>
                <img
                  className="user-avatar"
                  src={user?.userImage || "/icons/user.default.png"}
                  aria-haspopup={"true"}
                  onClick={() => setMenuOpen((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                />
                {menuOpen && (
                  <Box className="user-menu">
                    <NavLink
                      to="/profile"
                      className="user-menu-item"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <Box className="user-menu-item" onClick={handleLogout}>
                      Log out
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
