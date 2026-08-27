import Header from "./header";
import PopularBikes from "./popular";
import PromoBanner from "./promotion";
import ServicesSection from "./services";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setPopularBikes } from "./slice";
import type { Bike } from "../../../lib/types/bike";
import { useEffect } from "react";
import BikesService from "../../services/Bikes.service";
import ActiveUsers from "./Active-users";
import BudgetPicks from "./BudgetPicks";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularBikes: (data: Bike[]) => dispatch(setPopularBikes(data)),
});

export default function HomePage() {
  const { setPopularBikes } = actionDispatch(useDispatch());

  useEffect(() => {
    const bike = new BikesService();

    bike
      .getBikes({
        page: 1,
        limit: 4,
        order: "bikeViews",
      })
      .then((data) => setPopularBikes(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-page">
      <Header />
      <PopularBikes />
      <BudgetPicks />
      <ActiveUsers />
      <ServicesSection />
      <PromoBanner />
    </div>
  );
}
