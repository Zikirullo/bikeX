import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import BikesService from "../../services/Bikes.service";
import type { Bike } from "../../../lib/types/bike";
import { api } from "../../../lib/config";
import { addItem } from "../../components/Basket/slice";

export default function ChosenBike() {
  const { bikeId } = useParams<{ bikeId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bike, setBike] = useState<Bike | null>(null);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!bikeId) return;

    const bikesService = new BikesService();
    bikesService
      .getBike(bikeId)
      .then((data) => setBike(data))
      .catch((err) => {
        console.log("ERROR fetching chosen bike", err);
        setError(true);
      });
  }, [bikeId]);

  if (error) {
    return (
      <Container sx={{ pt: 12, pb: 6, textAlign: "center" }}>
        <Typography sx={{ color: "#888" }}>Couldn't find that bike.</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/bikes")}
          sx={{ mt: 2, color: "#f97316" }}
        >
          Back to Bikes
        </Button>
      </Container>
    );
  }

  if (!bike) {
    return (
      <Container sx={{ pt: 12, pb: 6, textAlign: "center" }}>
        <Typography sx={{ color: "#888" }}>Loading...</Typography>
      </Container>
    );
  }

  const imagePath = bike.bikeImages
    ? `${api}/${bike.bikeImages}`
    : "/img/bike-placeholder.png";

  const outOfStock = bike.bikeLeftCount <= 0;
  const maxQty = Math.min(3, bike.bikeLeftCount);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        bikeId: bike._id,
        bikeName: bike.bikeName,
        bikeImages: bike.bikeImages,
        bikePrice: bike.bikePrice,
        bikeLeftCount: bike.bikeLeftCount,
        quantity,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Container sx={{ pt: 12, pb: 6 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/bikes")}
        sx={{ color: "#888", mb: 3, textTransform: "none" }}
      >
        Back to Bikes
      </Button>

      <Stack direction={{ xs: "column", md: "row" }} sx={{ gap: 4 }}>
        <Box
          component="img"
          src={imagePath}
          alt={bike.bikeName}
          sx={{
            width: { xs: "100%", md: 480 },
            height: 360,
            objectFit: "cover",
            borderRadius: 3,
          }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "#f97316",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.5,
              mb: 1,
            }}
          >
            {bike.bikeType}
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: "#fff", fontWeight: 800, mb: 1 }}
          >
            {bike.bikeName}
          </Typography>
          <Typography sx={{ color: "#888", mb: 3 }}>
            {bike.bikeBrandName}
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#fff", fontWeight: 700, mb: 3 }}
          >
            ${bike.bikePrice}
          </Typography>
          <Typography sx={{ color: "#888", mb: 3 }}>
            {outOfStock
              ? "Out of stock"
              : `${bike.bikeLeftCount} left in stock`}
          </Typography>

          {!outOfStock && (
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1.5,
                mb: 3,
                border: "1px solid #2a2b30",
                borderRadius: 5,
                width: "fit-content",
                px: 1,
              }}
            >
              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography
                sx={{ color: "#fff", minWidth: 20, textAlign: "center" }}
              >
                {quantity}
              </Typography>

              <IconButton
                size="small"
                sx={{ color: "#fff" }}
                disabled={quantity >= maxQty}
                onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}

          <Button
            variant="contained"
            disabled={outOfStock}
            onClick={handleAddToCart}
            sx={{
              bgcolor: "#f97316",
              color: "#000",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 5,
              px: 4,
              "&:hover": { bgcolor: "#ea6c0f" },
            }}
          >
            {outOfStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
