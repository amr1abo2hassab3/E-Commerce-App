import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Footer } from "./../Footer/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex justify-between flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <Navbar />
      <div className="container  mx-auto py-20 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
