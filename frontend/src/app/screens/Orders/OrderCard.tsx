import { useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderStatus } from "../../../lib/enum/order.enum";
import type { Order } from "../../../lib/types/order";

import OrderTracker from "./OrderTracker";
import { getImagePath } from "../../../lib/config";

interface OrderCardProps {
  order: Order;
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.PROCESSING]: "Processing",
  [OrderStatus.COMPLETED]: "Delivered",
  [OrderStatus.CANCELLED]: "Cancelled",
};

const STATUS_CLASS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "order-status--pending",
  [OrderStatus.PROCESSING]: "order-status--processing",
  [OrderStatus.COMPLETED]: "order-status--delivered",
  [OrderStatus.CANCELLED]: "order-status--cancelled",
};

export default function OrderCard({ order }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Bike field names confirmed from bikes.tsx/chosenBike.tsx.
  const primaryBike = order.bikeData?.[0] as
    | { bikeName?: string; bikeBrandName?: string; bikeImages?: string }
    | undefined;

  const itemCount = order.orderItems?.reduce(
    (sum, item) => sum + item.itemQuantity,
    0,
  );

  const imagePath = getImagePath(
    primaryBike?.bikeImages,
    "/img/bike-placeholder.png",
  );

  return (
    <Box className="order-card">
      <Button
        onClick={() => setExpanded((prev) => !prev)}
        disableRipple
        className="order-card-summary"
      >
        <Box
          component="img"
          src={imagePath}
          alt={primaryBike?.bikeName ?? "Bike"}
          className="order-card-image"
        />
        <Box className="order-card-main">
          <Stack direction="row" spacing={1} className="order-card-meta">
            <Typography className="order-card-id">
              {order._id.slice(-8).toUpperCase()}
            </Typography>
            <Chip
              label={STATUS_LABEL[order.orderStatus]}
              size="small"
              className={`order-status-chip ${STATUS_CLASS[order.orderStatus]}`}
            />
          </Stack>
          <Typography className="order-card-name">
            {primaryBike?.bikeName ?? "Bike order"}
          </Typography>
          <Typography className="order-card-date">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>
        <Box className="order-card-price-col">
          <Typography className="order-card-price">
            ${order.orderTotal.toLocaleString()}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            className="order-card-details-toggle"
          >
            <span>Details</span>
            <ExpandMoreIcon
              fontSize="small"
              className={`order-card-chevron${
                expanded ? " order-card-chevron--open" : ""
              }`}
            />
          </Stack>
        </Box>
      </Button>

      {expanded && (
        <Box className="order-card-expanded">
          <Stack
            direction="row"
            sx={{ flexWrap: "wrap" }}
            className="order-detail-grid"
          >
            <Box className="order-detail-item">
              <Typography className="order-detail-label">Order Date</Typography>
              <Typography className="order-detail-value">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Box>
            <Box className="order-detail-item">
              <Typography className="order-detail-label">Brand</Typography>
              <Typography className="order-detail-value">
                {primaryBike?.bikeBrandName ?? "—"}
              </Typography>
            </Box>
            <Box className="order-detail-item">
              <Typography className="order-detail-label">Items</Typography>
              <Typography className="order-detail-value">
                {itemCount ?? order.orderItems?.length ?? 0}
              </Typography>
            </Box>
            <Box className="order-detail-item">
              <Typography className="order-detail-label">Total</Typography>
              <Typography className="order-detail-value">
                ${order.orderTotal.toLocaleString()}
              </Typography>
            </Box>
          </Stack>

          <OrderTracker status={order.orderStatus} />

          <Stack direction="row" className="order-card-actions">
            <Button className="order-help-btn">Need Help?</Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
