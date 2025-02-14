export const CardOrder = ({ prodcut, index }) => {
  return (
    <div className="mt-4 font-bold md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
      <div className="pb-4 md:pb-8 w-full md:w-40">
        <img
          className="w-full hidden md:block"
          src={prodcut?.product?.imageCover}
          alt="dress"
        />
        <img
          className="w-full md:hidden"
          src={prodcut?.product?.imageCover}
          alt="dress"
        />
      </div>
      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
        <div className="w-full flex flex-col justify-start items-start space-y-8">
          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
            {prodcut?.product?.title}
          </h3>
        </div>
        <div className="flex justify-between space-x-8 items-start w-full">
          <p className="text-base dark:text-white xl:text-lg leading-6">
            ${prodcut.price * prodcut.count}
          </p>
          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
            quantity <span className="text-red-500"> {prodcut.count}</span>
          </p>
          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
            {index < 9 && index >= 0 ? `0${index + 1}` : index + 1}
          </p>
        </div>
      </div>
    </div>
  );
};
