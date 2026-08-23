import {
  Box,
  Stack,
  Card,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

export interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
}

interface WishlistProps {
  items: WishlistItem[];
  onAddToCart?: (id: string) => void;
  onRemove?: (id: string) => void;
  onBrowseMore?: () => void;
}

export default function Wishlist({
  items,
  onAddToCart,
  onRemove,
  onBrowseMore,
}: WishlistProps) {
  return (
    <Box className="wishlist-section">
      <Stack direction="row" className="wishlist-header">
        <Typography variant="h5" className="wishlist-title">
          My Wishlist
        </Typography>
        <Button onClick={onBrowseMore} className="wishlist-browse-btn">
          Browse more →
        </Button>
      </Stack>

      {items.length === 0 ? (
        <Box className="wishlist-empty">Your wishlist is empty.</Box>
      ) : (
        <Stack direction="row" className="wishlist-grid">
          {items.map((item) => (
            <Card key={item.id} className="wishlist-card">
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                className="wishlist-card-image"
              />
              <Box className="wishlist-card-body">
                <Typography className="wishlist-card-name">
                  {item.name}
                </Typography>
                <Typography className="wishlist-card-brand">
                  {item.brand}
                </Typography>
                <Stack direction="row" className="wishlist-card-footer">
                  <Typography className="wishlist-card-price">
                    ${item.price}
                  </Typography>
                  <Stack direction="row" className="wishlist-card-actions">
                    <IconButton
                      size="small"
                      onClick={() => onAddToCart?.(item.id)}
                      className="wishlist-action-btn"
                    >
                      <ShoppingCartIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onRemove?.(item.id)}
                      className="wishlist-action-btn wishlist-action-btn--danger"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
