import { Routes, Route } from "react-router-dom";
import "../../../css/bikes.css";

import ChosenBike from "./chosenBike";
import BikesList from "./bikeList";

export default function BikesPage() {
  return (
    <div className="bikes-page">
      <Routes>
        <Route path=":bikeId" element={<ChosenBike />} />
        <Route path="" element={<BikesList />} />
      </Routes>
    </div>
  );
}
