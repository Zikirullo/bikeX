import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { OrderItemInput } from "../../../lib/types/order";
import { selectBasketItems, selectBasketTotal } from "./selector";
import { clearBasket } from "./slice";
import BasketItemRow from "./BasketItemRow";
import OrderService from "../../services/Order.service";
import "../../../css/basket.css";

const orderService = new OrderService();

interface BasketProps {
  open: boolean;
  onClose: () => void;
}

export default function Basket({ open, onClose }: BasketProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);

  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShopBikes = () => {
    onClose();
    navigate("/bikes");
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    setError(null);
    try {
      const orderItems: OrderItemInput[] = items.map((item) => ({
        itemPrice: item.bikePrice,
        itemQuantity: item.quantity,
        bikeId: item.bikeId,
      }));
      await orderService.createOrder(orderItems);
      dispatch(clearBasket());
      onClose();
      navigate("/orders");
    } catch (err) {
      console.log("ERROR checking out", err);
      setError("Couldn't place your order. Please try again.");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { className: "basket-paper" } }}
    >
      <Box className="basket-panel">
        <Stack direction="row" className="basket-header">
          <Typography className="basket-title font-display">
            Your Cart
          </Typography>
          <IconButton onClick={onClose} className="basket-close-btn">
            <CloseIcon />
          </IconButton>
        </Stack>

        {items.length === 0 ? (
          <Box className="basket-empty">
            <Box className="basket-empty-icon">
              <ShoppingCartOutlinedIcon fontSize="large" />
            </Box>
            <Typography className="basket-empty-text">
              Your cart is empty.
            </Typography>
            <Button className="basket-shop-btn" onClick={handleShopBikes}>
              Shop Bikes
            </Button>
          </Box>
        ) : (
          <>
            <Box className="basket-list">
              {items.map((item) => (
                <BasketItemRow key={item.bikeId} item={item} />
              ))}
            </Box>

            <Box className="basket-footer">
              {error && (
                <Typography className="basket-error">{error}</Typography>
              )}
              <Stack direction="row" className="basket-total-row">
                <Typography className="basket-total-label">Total</Typography>
                <Typography className="basket-total-value font-display">
                  ${total.toLocaleString()}
                </Typography>
              </Stack>
              <Button
                className="basket-checkout-btn"
                disabled={checkingOut}
                onClick={handleCheckout}
                fullWidth
              >
                {checkingOut ? "Placing order..." : "Checkout"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
