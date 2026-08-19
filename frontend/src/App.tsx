import { Route, Routes } from "react-router-dom";
import Navbar from "./app/components/headers/navbar";
import HomePage from "./app/screens/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}
