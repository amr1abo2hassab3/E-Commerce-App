import { lazy, Suspense, useContext } from "react";
import { searchContext } from "../../../Context/useSearchContext/useSearchContext";
import { Loader } from "../../Loader/LoaderScreen";

const CardItem = lazy(() =>
  import("../../CardItem/CardItem").then((module) => ({
    default: module.CardItem,
  }))
);
const ItemSearch = lazy(() =>
  import("../../ItemSearch/ItemSearch").then((module) => ({
    default: module.ItemSearch,
  }))
);

export const ProductsPage = () => {
  const { keyWord, setKeyWord, products, isLoading } =
    useContext(searchContext);

  return (
    <div className="container mx-auto mt-12">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Suspense fallback={<Loader />}>
            <ItemSearch
              products={products}
              keyWord={keyWord}
              setKeyWord={setKeyWord}
            />
          </Suspense>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6 mt-20">
            {products?.map((product) => (
              <Suspense key={product._id} fallback={<Loader />}>
                <CardItem product={product} />
              </Suspense>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
