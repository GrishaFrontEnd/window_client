import React from "react";
import { Helmet } from "react-helmet-async";
import List from "../Components/List";
import SearchItem from "../Components/SearchItem";
import { useAppDispatch, useAppSelector } from "../Hooks/Redux";
import {
  useFetchAllCategoriesQuery,
  useFetchCategoryByIdQuery,
} from "../Services/CategoriesApi";
import { setCategories } from "../Store/Slices/CategoriesSlice";

const HomePage: React.FC = () => {
  const { data: categories } = useFetchAllCategoriesQuery();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);
  const { activeCategory } = useAppSelector((state) => state.categories);
  const {
    data: category,
    error,
    isLoading,
  } = useFetchCategoryByIdQuery(activeCategory);
  if (isLoading) {
    return <h1>...Идет загрузка</h1>;
  } else if (error) {
    return <h1>Произошла ошибка при загрузке данных</h1>;
  }
  return (
    <div className="flex flex-col min-w-max sm:w-full">
      <Helmet>
        <title>booknoyar</title>
        <meta name="description" content="Купить новые и бу ПВХ окна/двери" />
        <meta
          name="keywords"
          content="купить окно, купить дверь, купить пвх окно, купить металлическую дверь, buoknoyar, бу окно, новое окно пвх, "
        />
      </Helmet>
      <div className="flex flex-col">
        <div className="col-start-5 col-end-12">
          <SearchItem />
        </div>
        {
          <h3 className="text-center max-w-full font-medium text-3xl mt-5">
            {category.value.replace(/["']/g, "") === "Все товары"
              ? "Все товары"
              : `Все товары в категории  ${category.value.replace(
                  /["']/g,
                  ""
                )}`}
          </h3>
        }
      </div>
      <List />
    </div>
  );
};

export default HomePage;
