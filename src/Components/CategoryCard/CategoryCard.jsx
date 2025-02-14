export const CategoryCard = ({
  name,
  image,
  AllProducts,
  border,
  handleGetSameCategory,
  id,
}) => {
  return (
    <div
      onClick={() => {
        handleGetSameCategory(id);
      }}
      className={`bg-[#FEFEFE] flex shadow-[0_0_30px_rgba(129,129,129,0.1)] rounded cursor-pointer transition-all duration-500 hover:rotate-3 hover:shadow-[0px_10px_30px_rgba(0,0,0,0.2)] ${
        border && "border-main border"
      }`}
    >
      <div className="bg-main w-[25%] h-[100px] flex justify-center items-center rounded">
        <img className="max-w-[97px] max-h-[97px] p-2" src={image} alt={name} />
      </div>
      <div className="w-[75%] ml-9 leading-[1.6] flex flex-col justify-center gap-2">
        <h4 className="text-xl capitalize font-semibold">{name}</h4>
        {AllProducts && (
          <p className="text-sm font-normal text-[#555]">
            <span className="font-semibold"> {AllProducts?.length}</span> items
          </p>
        )}
      </div>
    </div>
  );
};
