import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Footer } from "./../Footer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex justify-between flex-col">
      <Navbar />
      <div className="container mx-auto py-20 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
