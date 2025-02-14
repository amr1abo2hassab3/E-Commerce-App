import axios from "axios";
import { CardItem } from "../CardItem/CardItem";
import { Loader } from "../Loader/LoaderScreen";
import { useQuery } from "@tanstack/react-query";
import { useGetAllProducts } from "../../customHooks/useGetAllProducts";

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
            <CardItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
