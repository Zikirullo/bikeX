import { useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { OrderStatus } from "../../../lib/enum/order.enum";
import type { Order } from "../../../lib/types/order";
import OrderTracker from "./OrderTracker";
import { api } from "../../../lib/config";

interface OrderCardProps {
  order: Order;
  onCancel: (orderId: string) => Promise<void>;
  onPay: (orderId: string) => Promise<void>;
  onComplete: (orderId: string) => Promise<void>;
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

export default function OrderCard({
  order,
  onCancel,
  onPay,
  onComplete,
}: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  console.log("FULL ORDER =>", order);
  console.log("ORDER ITEMS =>", order.orderItems);
  console.log("BIKE DATA =>", order.bikeData);

  const primaryItem = order.orderItems?.[0];

  const primaryBike = order.bikeData?.find(
    (bike) => bike._id === primaryItem?.bikeId,
  );

  console.log("PRIMARY ITEM =>", primaryItem);
  console.log("PRIMARY BIKE =>", primaryBike);

  const itemCount =
    order.orderItems?.reduce((sum, item) => sum + item.itemQuantity, 0) ?? 0;

  const bikeImages = primaryBike?.bikeImages?.[0];

  const imagePath = bikeImages
    ? `${api}/${bikeImages}`
    : "/img/bike-placeholder.png";

  return (
    <Box className="order-card">
      {/* ORDER SUMMARY */}
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
          onError={(e) => {
            e.currentTarget.src = "/img/bike-placeholder.png";
          }}
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
          <Box className="order-box-scroll">
            {order.orderItems?.map((item) => {
              const bike = order.bikeData?.find(
                (bike) => bike._id === item.bikeId,
              );

              const itemImage = bike?.bikeImages?.[0];

              const itemImagePath = itemImage
                ? `${api}/${bike.bikeImages}`
                : "/img/bike-placeholder.png";

              return (
                <Box key={item._id} className="orders-name-price">
                  <img
                    src={itemImagePath}
                    alt={bike?.bikeName ?? "Bike"}
                    className="order-dish-img"
                    onError={(e) => {
                      e.currentTarget.src = "/img/bike-placeholder.png";
                    }}
                  />

                  <p className="title-dish">{bike?.bikeName ?? "Bike"}</p>

                  <Box className="price-box">
                    <p>${item.itemPrice}</p>

                    <span>×</span>

                    <p>{item.itemQuantity}</p>

                    <span>=</span>

                    <p style={{ marginLeft: "15px" }}>
                      ${item.itemQuantity * item.itemPrice}
                    </p>
                  </Box>
                </Box>
              );
            })}
          </Box>

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
                {itemCount}
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

          <Stack direction="row" spacing={1} className="order-card-actions">
            {order.orderStatus === OrderStatus.PENDING && (
              <>
                <Button
                  className="order-action-btn order-action-btn--cancel"
                  onClick={() => onCancel(order._id)}
                >
                  Cancel Order
                </Button>

                <Button
                  className="order-action-btn order-action-btn--primary"
                  onClick={() => onPay(order._id)}
                >
                  Proceed to Payment
                </Button>
              </>
            )}

            {order.orderStatus === OrderStatus.PROCESSING && (
              <Button
                className="order-action-btn order-action-btn--primary"
                onClick={() => onComplete(order._id)}
              >
                Verify to Fulfil
              </Button>
            )}

            {order.orderStatus === OrderStatus.COMPLETED && (
              <Typography className="order-completed-message">
                Your order has been delivered successfully.
              </Typography>
            )}

            {order.orderStatus === OrderStatus.CANCELLED && (
              <Typography className="order-cancelled-message">
                This order has been cancelled.
              </Typography>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
