import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { whishListContext } from "../../Context/WishListContext/WishListContext";

export const CardItem = ({ product, color = "#c7d5f1" }) => {
  const { AddToCart } = useContext(cartContext);
  const { addToWishList, idProducts, deleteItemFromWishList } =
    useContext(whishListContext);
  const handleAddToCart = (e, id) => {
    e.preventDefault();
    AddToCart(id);
  };
  const handleAddToWishList = (e, id) => {
    e.preventDefault();
    e.target.classList.add("text-red-600");
    addToWishList(id);
  };

  const handleRemoveItemFromWishList = (e, id) => {
    e.preventDefault();
    e.target.classList.remove("text-red-600");
    e.target.classList.add("text-black");

    deleteItemFromWishList(id);
  };
  return (
    <Link
      to={`/productDetails/${product._id}/${product.category._id}`}
      className="w-full relative shadow-custom rounded-md transition-all duration-300 ease-in-out  cursor-pointer overflow-hidden hover:rotate-[3deg] hover:scale-[0.90]"
    >
      <div
        onClick={(e) => {
          if (idProducts.includes(product._id)) {
            handleRemoveItemFromWishList(e, product._id);
          } else {
            handleAddToWishList(e, product._id);
          }
        }}
        className="absolute transition  duration-200 group flex items-center justify-center top-4 right-4 w-[50px] h-[50px] bg-[#C7D5F1] rounded-full"
      >
        <i
          className={`fa-solid fa-heart ${
            idProducts.includes(product._id) && "text-red-600"
          } transition duration-300 group-hover:text-red-600 text-xl`}
        ></i>
      </div>

      <div className={`bg-[${color}] flex justify-center items-center p-3`}>
        <img src={product.imageCover} className="max-w-full" />
      </div>
      <div className="p-4 min-h-[130px]">
        <h2 className="text-lg mb-2 font-extrabold capitalize">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h2>
        <h3 className="text-lg mb-2 font-bold capitalize">
          {product.category.name}
        </h3>
        <div className="flex items-center justify-between my-2">
          <span className="text-gray-700 font-bold">${product.price}</span>
          {product.priceAfterDiscount && (
            <span className="line-through text-red-500">
              {"$" + product.priceAfterDiscount}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={(e) => {
              handleAddToCart(e, product._id);
            }}
            className="bg-main text-white py-1.5 px-4 text-sm rounded-md transition-all duration-300 font-bold border border-transparent hover:!bg-white hover:!text-black hover:!border-main"
          >
            Add to cart <i className="fa-solid fa-cart-shopping"></i>
          </button>

          <span className="text-gray-700 font-bold">
            {product.ratingsAverage}
            <i className="fa-solid fa-star text-rating"></i>
          </span>
        </div>
      </div>
    </Link>
  );
};
