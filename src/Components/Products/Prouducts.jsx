import { Loader } from "../Loader/LoaderScreen";
import { useGetAllProducts } from "../../customHooks/useGetAllProducts";
import { lazy, Suspense } from "react";
const CardItem = lazy(() =>
  import("../CardItem/CardItem").then((module) => ({
    default: module.CardItem,
  }))
);

export const Prouducts = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const handleGetAllProdcuts = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/products`
  //     );
  //     setProducts(data.data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   handleGetAllProdcuts();
  // }, []);
  const { data, isLoading } = useGetAllProducts();
  const products = data?.data?.data;

  return (
    <div className="container mx-auto">
      {isLoading && <Loader />}
      {products?.length === 0 && (
        <h1 className="text-center font-bold text-2xl capitalize">
          There are no products to display
        </h1>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 gap-6">
        {products?.length > 0 &&
          products?.map((product) => (
            <Suspense key={product._id} fallback={<Loader />}>
              <CardItem product={product} />
            </Suspense>
          ))}
      </div>
    </div>
  );
};
