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
import { UserAuth } from "../../../lib/enum/user.enum";
import type { UserInput } from "../../../lib/types/user";
import UserService from "../../services/User.service";
import { setAuth } from "./auth.slice";
import "../../../css/auth.css";

interface SignupForm {
  userNick: string;
  userPhone: string;
  userPassword: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<SignupForm>({
    userNick: "",
    userPhone: "",
    userPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof SignupForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.userNick || !form.userPhone || !form.userPassword) {
      setError("Please fill in nickname, phone, and password.");
      return;
    }

    setLoading(true);
    try {
      const userService = new UserService();
      // NOTE: userAuth defaulted to PHONE since UserInput requires it
      // but the form only collects nick/phone/password — confirm this is right.
      const input: UserInput = {
        userAuth: UserAuth.PHONE,
        userNick: form.userNick,
        userPhone: form.userPhone,
        userPassword: form.userPassword,
      };
      const user = await userService.signup(input);
      dispatch(setAuth({ user }));
      navigate("/");
    } catch (err) {
      console.log("ERROR in signup", err);
      setError("Something went wrong creating your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="auth-page">
      <Container maxWidth="xs">
        <Card className="auth-card">
          <Typography variant="h4" className="auth-title">
            Create your account
          </Typography>
          <Typography className="auth-subtitle">
            Join BikeX to start riding
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
                label="Phone"
                value={form.userPhone}
                onChange={handleChange("userPhone")}
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
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </Box>

          <Typography className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
