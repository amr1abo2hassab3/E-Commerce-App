import Slider from "react-slick";

import { Loader } from "../Loader/LoaderScreen";
import { useGetAllCategories } from "../../customHooks/useGetAllCategories";

export const CategoriesSlider = () => {
  // const [categories, setCategories] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  // const handleGetAllCategories = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/categories`
  //     );
  //     setCategories(data.data);
  //     setErrorMessage("");
  //   } catch (err) {
  //     setErrorMessage(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   handleGetAllCategories();
  // }, []);

  const { data, isError, isLoading, error } = useGetAllCategories();

  const categories = data?.data.data;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-16">
      <h2 className="capitalize text-2xl font-bold mb-3">
        shoup popular categories
      </h2>
      {isLoading && <Loader />}
      {isError && (
        <p className="text-center text-xl font-bold">{error.message} ❌😫</p>
      )}
      <Slider {...settings}>
        {categories?.map((cat) => (
          <div key={cat._id} className="w-full">
            <img className="w-full h-60" src={cat.image} alt={cat.name} />
            <h3 className="text-center">{cat.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};
