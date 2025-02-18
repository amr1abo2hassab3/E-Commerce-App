import { useState } from "react";

export const ProductDetailsContent = ({ product, handleAddToCart }) => {
  const [indexImage, setIndexImage] = useState(0);

  return (
    <div className="container mx-auto">
      <div
        className="grid md:max-h-[500px] custom-scrollbar md:overflow-auto w-auto xl:w-[70%] border-main border mx-auto mt-8 md:grid-cols-2 grid-cols-1 shadow-[0_0_10px_#00000042] 
    justify-evenly items-center bg-[#00ffff00] rounded-md dark:bg-gray-800 dark:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
      >
        {/* قسم الصورة */}
        <div className="flex h-full flex-col justify-center items-center bg-[#f6f6f6] dark:bg-gray-700">
          <div className="w-full border-main border">
            <img
              className="object-cover w-full h-auto max-h-[400px] rounded-md"
              src={product?.images?.[indexImage] || "/placeholder.jpg"}
              alt={product?.title || "Product Image"}
              loading="lazy"
            />
          </div>
          <div className="w-full flex-wrap flex gap-3 p-4">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                onClick={() => setIndexImage(index)}
                className={`flex-1 cursor-pointer min-w-[calc(25%-16px)] border-4 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                  index === indexImage
                    ? "border-main shadow-md"
                    : "border-gray-300 dark:border-gray-600"
                } p-2`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt={product?.title}
                />
              </div>
            ))}
          </div>
        </div>

        {/* قسم التفاصيل */}
        <div className="p-4 text-center h-full flex flex-col justify-between">
          <h1 className="lg:text-3xl font-semibold mb-4 capitalize dark:text-white">
            {product?.title}
          </h1>
          <p className="capitalize lg:text-xl font-medium text-1xl text-[#555] dark:text-gray-300 my-4">
            {product?.description}
          </p>
          <h5 className="capitalize font-semibold lg:text-2xl dark:text-gray-200">
            {product?.category?.name}
          </h5>

          <div className="flex items-center justify-between my-5">
            <span className="font-semibold lg:text-2xl text-black dark:text-white">
              ${product?.price}
            </span>
            {product?.priceAfterDiscount && (
              <span className="text-red-600 font-semibold lg:text-2xl line-through">
                ${product?.priceAfterDiscount}
              </span>
            )}
            <span className="text-gray-700 font-bold lg:text-2xl dark:text-gray-300">
              {product?.ratingsAverage}{" "}
              <i className="fa-solid fa-star text-rating"></i>
            </span>
          </div>

          <button
            onClick={() => handleAddToCart(product._id)}
            className="bg-main w-full text-white lg:py-3 py-1.5 px-4 text-1xl rounded-md transition-all duration-300 font-bold border border-transparent 
          hover:!bg-white hover:!text-black hover:!border-main dark:hover:!bg-gray-700 dark:hover:!text-white dark:hover:!border-white"
          >
            Add to cart <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
