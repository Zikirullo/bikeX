import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { OrderStatus } from "../../../lib/enum/order.enum";
import type { Order } from "../../../lib/types/order";
import type { User } from "../../../lib/types/user";

import { clearAuth, setAuth } from "../auth/auth.slice";
import { selectUser } from "../auth/suth.selector";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import PersonalInfo from "./PersonalInfo";
import PaymentMethods from "./PaymentMethods";

import "../../../css/profile.css";
import UserService from "../../services/User.service";
import OrderService from "../../services/Order.service";
import EditProfileDialog from "./EditProfileDialog";

const userService = new UserService();
const orderService = new OrderService();

const ALL_STATUSES = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
];

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const refreshUser = useCallback(async () => {
    try {
      const freshUser = await userService.getUserDetail();
      dispatch(setAuth({ user: freshUser }));
    } catch (err) {
      console.log("ERROR refreshing user", err);
    }
  }, [dispatch]);

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const results = await Promise.all(
        ALL_STATUSES.map((orderStatus) =>
          orderService.getMyOrders({ page: 1, limit: 100, orderStatus }),
        ),
      );
      setOrders(results.flat());
    } catch (err) {
      console.log("ERROR loading orders", err);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    loadOrders();
  }, [refreshUser, loadOrders]);

  const handleProfileSaved = (updated: User) => {
    dispatch(setAuth({ user: updated }));
    setEditOpen(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await userService.logout();
    } catch (err) {
      console.log("ERROR in logout", err);
    } finally {
      dispatch(clearAuth());
      navigate("/");
    }
  };

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const delivered = orders.filter(
    (order) => order.orderStatus === OrderStatus.COMPLETED,
  );
  const moneySpent = delivered.reduce(
    (sum, order) => sum + order.orderTotal,
    0,
  );

  const stats = [
    { label: "Total Orders", value: String(orders.length) },
    { label: "Delivered", value: String(delivered.length) },
    { label: "Money Spent", value: `$${moneySpent.toLocaleString()}` },
  ];

  return (
    <div className="profile-page">
      <Container maxWidth="lg">
        <ProfileHeader user={user} onEdit={() => setEditOpen(true)} />

        {ordersLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <ProfileStats stats={stats} />
        )}

        <Stack
          direction={{ xs: "column", lg: "row" }}
          className="profile-info-row"
        >
          <PersonalInfo user={user} />
          <PaymentMethods />
        </Stack>

        <Box className="profile-logout-section">
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            disabled={loggingOut}
            className="profile-logout-btn"
          >
            {loggingOut ? "Logging out..." : "Log Out"}
          </Button>
        </Box>

        <EditProfileDialog
          open={editOpen}
          user={user}
          onClose={() => setEditOpen(false)}
          onSaved={handleProfileSaved}
        />
      </Container>
    </div>
  );
}
