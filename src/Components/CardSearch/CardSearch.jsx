import { Link } from "react-router-dom";

export const CardSearch = ({ products, keyWord }) => {
  return (
    <div
      className={`flex flex-col items-center transition-opacity duration-200 ${
        keyWord.trim() !== "" ? "opacity-100" : "opacity-0 "
      }`}
    >
      <div className="absolute custom-scrollbar max-h-[500px] overflow-auto shadow bg-white top-100 z-40 w-full left-0 rounded max-h-select overflow-y-auto">
        <div className="flex flex-col w-full">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
              >
                <Link
                  to={`/productDetails/${product._id}/${product.category._id}`}
                  className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100"
                >
                  <div className="w-6 flex flex-col items-center">
                    <div className="relative w-5 h-5 bg-orange-500 flex justify-center items-center m-1 mr-2 mt-1 rounded-full">
                      <img
                        className="rounded-full w-full h-full object-cover"
                        alt={product.title}
                        src={product.imageCover}
                      />
                    </div>
                  </div>
                  <div className="w-full items-center flex">
                    <div className="mx-2 -mt-1 font-medium">
                      {product.title}
                      <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
                        {product.category.name}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex flex-col w-full p-4 font-semibold text-center text-red-600">
              There are no products of The same name
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
