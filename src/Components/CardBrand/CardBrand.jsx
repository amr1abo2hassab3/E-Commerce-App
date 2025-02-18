import { Link } from "react-router-dom";

export const CardBrand = ({ brand }) => {
  return (
    <Link to={`/brandDetails/${brand._id}`}>
      <div
        className={`bg-[#FEFEFE] flex rounded cursor-pointer transition-all duration-500 hover:rotate-3 hover:scale-90  
    shadow-[0px_10px_30px_rgba(0,0,0,0.2)] border-main border
    dark:bg-gray-800 dark:shadow-[0px_10px_30px_rgba(255,255,255,0.1)] dark:border-gray-500`}
      >
        <div className="bg-main w-[25%] h-[100px] flex justify-center items-center rounded">
          <img
            className="max-w-[97px] max-h-[97px] p-2"
            loading="lazy"
            src={brand.image}
            alt={brand.name}
          />
        </div>
        <div className="w-[75%] ml-9 leading-[1.6] flex flex-col justify-center gap-2">
          <h4 className="text-xl capitalize font-semibold dark:text-white">
            {brand.name}
          </h4>
        </div>
      </div>
    </Link>
  );
};
