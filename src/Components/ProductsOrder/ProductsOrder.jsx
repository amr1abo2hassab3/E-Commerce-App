import { CardOrder } from "../CardOrder/CardOrder";

export const ProductsOrder = ({ isOpen, products }) => {
  return (
    <div
      className={`flex overflow-hidden ${
        !isOpen && "h-0 !p-0 !m-0"
      } flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full`}
    >
      <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
        Customer’s Cart
      </p>
      {products.map((prodcut, index) => (
        <CardOrder key={prodcut._id} prodcut={prodcut} index={index} />
      ))}
    </div>
  );
};
