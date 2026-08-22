import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  searchText: string;
  onSearch: (value: string) => void;
}

export default function Search({ searchText, onSearch }: SearchProps) {
  return (
    <Box className={"bikes-search"}>
      <SearchIcon className={"search-icon"} />

      <InputBase
        className={"search-input"}
        placeholder="Search by name, brand or type..."
        fullWidth
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
}
