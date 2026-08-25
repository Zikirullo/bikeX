import { Box, Stack, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { OrderStatus } from "../../../lib/enum/order.enum";

interface OrderTrackerProps {
  status: OrderStatus;
}

const STEPS = ["Ordered", "Processing", "Delivered"];

function getActiveStep(status: OrderStatus): number {
  switch (status) {
    case OrderStatus.PENDING:
      return 1;
    case OrderStatus.PROCESSING:
      return 2;
    case OrderStatus.COMPLETED:
      return 3;
    default:
      return 0;
  }
}

export default function OrderTracker({ status }: OrderTrackerProps) {
  if (status === OrderStatus.CANCELLED) {
    return (
      <Box className="order-tracker-cancelled">
        <Typography className="order-tracker-cancelled-text">
          This order was cancelled.
        </Typography>
      </Box>
    );
  }

  const activeStep = getActiveStep(status);

  return (
    <Box className="order-tracker">
      <Box className="order-tracker-track" />
      <Box
        className="order-tracker-track order-tracker-track--fill"
        sx={{ width: `${(activeStep - 1) * (100 / (STEPS.length - 1))}%` }}
      />
      <Stack direction="row" className="order-tracker-steps">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const done = stepNumber <= activeStep;
          return (
            <Box key={label} className="order-tracker-step">
              <Box
                className={`order-tracker-dot${
                  done ? " order-tracker-dot--done" : ""
                }`}
              >
                {done ? (
                  <CheckIcon fontSize="inherit" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </Box>
              <Typography className="order-tracker-label">{label}</Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
