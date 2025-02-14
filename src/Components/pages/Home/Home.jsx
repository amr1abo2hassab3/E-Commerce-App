import { Prouducts } from "../../Products/Prouducts";
import { HomeSlider } from "../../HomeSlider/HomeSlider";
import { CategoriesSlider } from "../../CategoriesSlider/CategoriesSlider";
import { HeaderWorled } from "../../HeaderWorled/HeaderWorled";
import { NewCollection } from "../../NewCollection/NewCollection";
import { ItemSearch } from "../../ItemSearch/ItemSearch";
import { searchContext } from "../../../Context/useSearchContext/useSearchContext";
import { useContext } from "react";

export const Home = () => {
  const { products, keyWord, setKeyWord } = useContext(searchContext);

  return (
    <div className="mt-10">
      <ItemSearch
        products={products}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
      />
      <HomeSlider />
      <CategoriesSlider />
      <Prouducts />
      <HeaderWorled />
      <NewCollection
        id={"6439d5b90049ad0b52b90048"}
        category={"Men's Fashion"}
        queryKey="getMenFashion"
      />
      <NewCollection
        id={"6439d58a0049ad0b52b9003f"}
        category={"Women's Fashion"}
        queryKey="getWomenFashion"
      />
      <NewCollection
        id={"6439d2d167d9aa4ca970649f"}
        category={"Electronics"}
        queryKey="getElectronics"
      />
    </div>
  );
};
