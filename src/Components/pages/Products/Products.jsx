import { Loader } from "../../Loader/LoaderScreen";
import { CardItem } from "../../CardItem/CardItem";
import { ItemSearch } from "../../ItemSearch/ItemSearch";
import { useContext } from "react";
import { searchContext } from "../../../Context/useSearchContext/useSearchContext";

export const ProductsPage = () => {
  const { keyWord, setKeyWord, products, isLoading } =
    useContext(searchContext);
  return (
    <div className="container mx-auto mt-12">
      {isLoading && <Loader />}
      <ItemSearch
        products={products}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6 mt-20">
        {products?.length > 0 &&
          products?.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
