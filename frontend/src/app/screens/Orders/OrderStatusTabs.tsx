import { Box, Button, Stack } from "@mui/material";
import { OrderStatus } from "../../../lib/enum/order.enum";

export type OrderTab = "ALL" | OrderStatus;

interface OrderStatusTabsProps {
  active: OrderTab;
  counts: Record<OrderTab, number>;
  onChange: (tab: OrderTab) => void;
}

const TABS: { key: OrderTab; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: OrderStatus.PENDING, label: "Pending" },
  { key: OrderStatus.PROCESSING, label: "Processing" },
  { key: OrderStatus.COMPLETED, label: "Delivered" },
  { key: OrderStatus.CANCELLED, label: "Cancelled" },
];

export default function OrderStatusTabs({
  active,
  counts,
  onChange,
}: OrderStatusTabsProps) {
  return (
    <Stack direction="row" spacing={1} className="order-tabs">
      {TABS.map((tab) => (
        <Button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          disableRipple
          className={`order-tab-btn ${
            active === tab.key ? "order-tab-btn--active" : ""
          }`}
        >
          {tab.label}

          <Box component="span" className="order-tab-count">
            {counts[tab.key] ?? 0}
          </Box>
        </Button>
      ))}
    </Stack>
  );
}
