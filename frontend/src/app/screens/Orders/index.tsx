import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

import { OrderStatus } from "../../../lib/enum/order.enum";
import type { Order, OrderUpdateInput } from "../../../lib/types/order";

import OrderService from "../../services/Order.service";
import type { OrderTab } from "./OrderStatusTabs";
import OrderStatusTabs from "./OrderStatusTabs";
import OrderCard from "./OrderCard";
import "../../../css/order.css";

const orderService = new OrderService();

const ALL_STATUSES = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED,
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<OrderTab>("ALL");

  const loadOrders = useCallback(async () => {
    setLoading(true);

    try {
      const results = await Promise.all(
        ALL_STATUSES.map((orderStatus) =>
          orderService.getMyOrders({
            page: 1,
            limit: 100,
            orderStatus,
          }),
        ),
      );

      const combined = results
        .flat()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

      setOrders(combined);
    } catch (err) {
      console.log("ERROR loading orders", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const counts = useMemo(() => {
    const base: Record<OrderTab, number> = {
      ALL: orders.length,
      [OrderStatus.PENDING]: 0,
      [OrderStatus.PROCESSING]: 0,
      [OrderStatus.COMPLETED]: 0,
      [OrderStatus.CANCELLED]: 0,
    };

    orders.forEach((order) => {
      if (order.orderStatus in base) {
        base[order.orderStatus] += 1;
      }
    });

    return base;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (activeTab === "ALL") return orders;

    return orders.filter((order) => order.orderStatus === activeTab);
  }, [orders, activeTab]);

  const handleCancelOrder = async (orderId: string) => {
    try {
      const confirmation = window.confirm("Do you want to cancel this order?");

      if (!confirmation) return;

      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.CANCELLED,
      };

      await orderService.updateOrder(input);

      setActiveTab(OrderStatus.CANCELLED);

      await loadOrders();
    } catch (err) {
      console.log("ERROR cancelling order", err);
    }
  };

  const handlePayment = async (orderId: string) => {
    try {
      const confirmation = window.confirm(
        "Do you want to proceed with payment?",
      );

      if (!confirmation) return;

      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESSING,
      };

      await orderService.updateOrder(input);

      setActiveTab(OrderStatus.PROCESSING);

      await loadOrders();
    } catch (err) {
      console.log("ERROR processing order", err);
    }
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      const confirmation = window.confirm("Have you received your order?");

      if (!confirmation) return;

      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.COMPLETED,
      };

      await orderService.updateOrder(input);

      setActiveTab(OrderStatus.COMPLETED);

      await loadOrders();
    } catch (err) {
      console.log("ERROR completing order", err);
    }
  };

  return (
    <div className="orders-page">
      <Container maxWidth="md">
        <Typography variant="h3" className="orders-title">
          My Orders
        </Typography>

        <Typography className="orders-subtitle">
          Track deliveries and review your bikeX history.
        </Typography>

        <OrderStatusTabs
          active={activeTab}
          counts={counts}
          onChange={setActiveTab}
        />

        {loading ? (
          <Box className="orders-loading">
            <CircularProgress />
          </Box>
        ) : filteredOrders.length === 0 ? (
          <Box className="orders-empty">
            <Typography>No orders in this category yet.</Typography>
          </Box>
        ) : (
          <Box className="orders-list">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onCancel={handleCancelOrder}
                onPay={handlePayment}
                onComplete={handleCompleteOrder}
              />
            ))}
          </Box>
        )}
      </Container>
    </div>
  );
}
