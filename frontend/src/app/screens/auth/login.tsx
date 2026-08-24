import { useState } from "react";
import {
  Box,
  Card,
  Container,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { LoginInput } from "../../../lib/types/user";
import UserService from "../../services/User.service";
import { setAuth } from "./auth.slice";
import "../../../css/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<LoginInput>({
    userNick: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof LoginInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.userNick || !form.userPassword) {
      setError("Please enter your nickname and password.");
      return;
    }

    setLoading(true);
    try {
      const userService = new UserService();
      const user = await userService.login(form);
      dispatch(setAuth({ user }));
      navigate("/");
    } catch (err) {
      console.log("ERROR in login", err);
      setError("Invalid nickname or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="auth-page">
      <Container maxWidth="xs">
        <Card className="auth-card">
          <Typography variant="h4" className="auth-title">
            Welcome back
          </Typography>
          <Typography className="auth-subtitle">
            Log in to your BikeX account
          </Typography>

          {error && (
            <Alert severity="error" className="auth-alert">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} className="auth-form">
            <Stack className="auth-fields">
              <TextField
                label="Nickname"
                value={form.userNick}
                onChange={handleChange("userNick")}
                fullWidth
                className="auth-input"
              />
              <TextField
                label="Password"
                type="password"
                value={form.userPassword}
                onChange={handleChange("userPassword")}
                fullWidth
                className="auth-input"
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </Box>

          <Typography className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
