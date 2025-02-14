import { CardWish } from "../../CardWish/CardWish";
import { whishListContext } from "../../../Context/WishListContext/WishListContext";
import { useContext } from "react";
import { Loader } from "../../Loader/LoaderScreen";

export const WishList = () => {
  const { dataOfproducts, isLoading } = useContext(whishListContext);

  return (
    <div className="container mx-auto my-16 ">
      {isLoading && <Loader />}
      <h2 className="capitalize text-center my-10 font-extrabold text-[40px]">
        my wish list <i className="fa-solid fa-heart pl-2 text-red-600 "></i>{" "}
      </h2>
      {dataOfproducts.length == 0 && (
        <h3 className="font-semibold text-2xl text-red-600 capitalize mt-12 text-center">
          your wish list is empety 🙄
        </h3>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6">
        {dataOfproducts.map((product) => (
          <CardWish key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
