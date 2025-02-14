import img from "../../assets/images/all.png";
import { BtnShop } from "../BtnShop/BtnShop";
import { HeaderTitle } from "../HeaderTitle/HeaderTitle";

export const HeaderWorled = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 items-center shadow-[0px_10px_30px_rgba(0,0,0,0.2)] rounded-md overflow-hidden">
          <div className="w-full h-full bg- p-[113px] flex items-center justify-center bg-[#c7d5f1]">
            <img src={img} alt="image header" />
          </div>
          <div className="w-full p-16 ">
            <HeaderTitle name={"New Collection"} />
            <h3 className="my-5 font-extrabold text-3xl leading-[1.2]">
              Explore The World of Advanced
            </h3>
            <BtnShop name={"shop now"} to={"/category"} />
          </div>
        </div>
      </div>
    </div>
  );
};
