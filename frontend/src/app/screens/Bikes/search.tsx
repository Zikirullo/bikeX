import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <Box className={"bikes-search"}>
      <SearchIcon className={"search-icon"} />
      <InputBase
        className={"search-input"}
        placeholder="Search by name, brand or type..."
        fullWidth
      />
    </Box>
  );
}
