import { useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import Search from "./search";
import Sorting from "./sorting";
import Bikes from "./bikes";
import BikesBanner from "./banner";

import { setCBikes } from "./slice";

import type { Bike, BikeInQuery } from "../../../lib/types/bike";

import BikesService from "../../services/Bikes.service";
import type { BikeType } from "../../../lib/enum/bikes.enum";
import type { Dispatch } from "@reduxjs/toolkit";

const actionDispatch = (dispatch: Dispatch) => ({
  setCBikes: (data: Bike[]) => dispatch(setCBikes(data)),
});

export default function BikesList() {
  const { setCBikes } = actionDispatch(useDispatch());

  const [bikeSearch, setBikeSearch] = useState<BikeInQuery>({
    page: 1,
    order: "createdAt",
    limit: 9,
    search: "",
  });

  useEffect(() => {
    const bikesService = new BikesService();

    bikesService
      .getBikes(bikeSearch)
      .then((data) => {
        console.log("BIKES DATA:", data);
        setCBikes(data);
      })
      .catch((err) => {
        console.log("ERROR FETCHING BIKES:", err);
      });
  }, [bikeSearch]);

  const handleSearch = (value: string) => {
    setBikeSearch((prev) => ({
      ...prev,
      page: 1,
      search: value,
    }));
  };

  const handleSort = (value: string) => {
    setBikeSearch((prev) => ({
      ...prev,
      page: 1,
      order: value,
    }));
  };

  const handleTypeChange = (type: BikeType | undefined) => {
    setBikeSearch((prev) => ({
      ...prev,
      page: 1,
      bikeType: type,
    }));
  };

  return (
    <Container>
      <BikesBanner
        title="Find Your Ride"
        selectedType={bikeSearch.bikeType}
        onTypeChange={handleTypeChange}
      />

      <Stack className={"bikes-toolbar"}>
        <Search searchText={bikeSearch.search || ""} onSearch={handleSearch} />
        <Sorting sortBy={bikeSearch.order} onSort={handleSort} />
      </Stack>

      <Bikes />
    </Container>
  );
}
