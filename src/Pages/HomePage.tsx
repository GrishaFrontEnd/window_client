import React from "react";
import List from "../Components/List";
import Pagination from "../Components/Pagination";
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
  }
  return (
    <div className="flex flex-col min-w-max">
      <div className="grid grid-cols-12">
        {
          <h1 className="text-center font-medium text-3xl col-start-1 col-end-5">
            {category.value.replace(/["']/g, "")}
          </h1>
        }
        <div className="col-start-5 col-end-12">
          <SearchItem />
        </div>
      </div>
      <List />
    </div>
  );
};

export default HomePage;
