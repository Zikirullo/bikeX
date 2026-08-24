import { Routes, Route } from "react-router-dom";
import AuthInit from "./app/screens/auth";
import Navbar from "./app/components/headers/navbar";
import HomePage from "./app/screens/Home";
import BikesPage from "./app/screens/Bikes";
import HelpPage from "./app/screens/Help";
import Login from "./app/screens/auth/login";
import Signup from "./app/screens/auth/Signup";
import ProtectedRoute from "./app/screens/auth/protect";
import OrdersPage from "./app/screens/Orders";
import ProfilePage from "./app/screens/Profile";
import Footer from "./app/components/headers/footer";

export default function App() {
  return (
    <>
      <AuthInit />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bikes" element={<BikesPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
