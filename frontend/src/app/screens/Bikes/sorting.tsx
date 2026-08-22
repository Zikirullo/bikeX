import { MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface SortingProps {
  sortBy: string;
  onSort: (value: string) => void;
}

const sortOptions = [
  {
    value: "createdAt",
    label: "Newest",
  },
  {
    value: "bikePriceAsc",
    label: "Price: Low to High",
  },
  {
    value: "bikePriceDesc",
    label: "Price: High to Low",
  },
  {
    value: "bikeViews",
    label: "Most Viewed",
  },
];

export default function Sorting({ sortBy, onSort }: SortingProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onSort(event.target.value);
  };

  return (
    <Select
      className={"sorting-select"}
      value={sortBy}
      onChange={handleChange}
      IconComponent={KeyboardArrowDownIcon}
      MenuProps={{
        slotProps: {
          paper: {
            className: "sorting-menu-paper",
          },
        },
      }}
    >
      {sortOptions.map((option) => (
        <MenuItem
          className={"sorting-menu-item"}
          value={option.value}
          key={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
