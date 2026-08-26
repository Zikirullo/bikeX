import { useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

// Static for now — no backend wiring. Local state only, resets on refresh.
export default function PaymentMethods() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="payment-card">
      <Stack direction="row" className="payment-header">
        <CreditCardIcon className="payment-icon" fontSize="small" />
        <Typography className="payment-title font-display">
          Payment Method
        </Typography>
      </Stack>

      <Box className="payment-form">
        <TextField
          label="Cardholder Name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          fullWidth
          className="payment-field"
        />
        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="•••• •••• •••• ••••"
          fullWidth
          className="payment-field"
        />
        <Stack direction="row" className="payment-row">
          <TextField
            label="Expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="payment-field payment-field--half"
          />
          <TextField
            label="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="•••"
            className="payment-field payment-field--half"
          />
        </Stack>

        <Button onClick={handleSave} className="payment-save-btn">
          {saved ? "Saved ✓" : "Save Payment Method"}
        </Button>
      </Box>
    </Card>
  );
}
