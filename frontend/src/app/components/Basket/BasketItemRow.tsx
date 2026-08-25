import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import type { BasketItem } from "../../../lib/types/basket";
import { removeItem, updateQuantity } from "./slice";
import { getImagePath } from "../../../lib/config";
import DeleteOutlineIcon from "@mui/icons-material/Delete";

interface BasketItemRowProps {
  item: BasketItem;
}

export default function BasketItemRow({ item }: BasketItemRowProps) {
  const dispatch = useDispatch();
  const maxAllowed = Math.min(3, item.bikeLeftCount);

  return (
    <Stack direction="row" className="basket-row">
      <Box
        component="img"
        src={getImagePath(item.bikeImages, "/img/bike-placeholder.png")}
        alt={item.bikeName}
        className="basket-row-image"
      />

      <Box className="basket-row-info">
        <Typography className="basket-row-name">{item.bikeName}</Typography>
        <Typography className="basket-row-price">
          ${item.bikePrice.toLocaleString()}
        </Typography>

        <Stack direction="row" className="basket-row-qty">
          <IconButton
            size="small"
            className="basket-qty-btn"
            disabled={item.quantity <= 1}
            onClick={() =>
              dispatch(
                updateQuantity({
                  bikeId: item.bikeId,
                  quantity: item.quantity - 1,
                }),
              )
            }
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <Typography className="basket-qty-value">{item.quantity}</Typography>
          <IconButton
            size="small"
            className="basket-qty-btn"
            disabled={item.quantity >= maxAllowed}
            onClick={() =>
              dispatch(
                updateQuantity({
                  bikeId: item.bikeId,
                  quantity: item.quantity + 1,
                }),
              )
            }
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Box>

      <IconButton
        size="small"
        className="basket-remove-btn"
        onClick={() => dispatch(removeItem({ bikeId: item.bikeId }))}
        aria-label="Remove"
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
