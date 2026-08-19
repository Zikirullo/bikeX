import { Route, Routes } from "react-router-dom";
import Navbar from "./app/components/headers/navbar";
import HomePage from "./app/screens/Home";
import BikesPage from "./app/screens/Bikes";
import OrdersPage from "./app/screens/Orders";
import HelpPage from "./app/screens/Help";
import ProfilePage from "./app/screens/Profile";
import Footer from "./app/components/headers/footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bikes" element={<BikesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}
