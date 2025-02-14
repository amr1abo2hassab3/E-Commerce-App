import React from "react";
import { Link } from "react-router-dom";

export const BtnShop = ({ to, name }) => {
  return (
    <Link
      className="bg-main hover:text-black hover:!border-main border-[1px] hover:!bg-white py-[14px] px-10 rounded text-white font-bold transition-all duration-300 border-transparent mt-4 inline-block"
      to={`${to}`}
    >
      {name}
    </Link>
  );
};
