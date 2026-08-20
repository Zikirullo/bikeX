import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function Sorting() {
  const [sortBy, setSortBy] = useState("featured");

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  return (
    <Select
      className={"sorting-select"}
      value={sortBy}
      onChange={handleChange}
      IconComponent={KeyboardArrowDownIcon}
      MenuProps={{
        slotProps: { paper: { className: "sorting-menu-paper" } },
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
