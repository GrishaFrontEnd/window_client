import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/Redux";
import { useFetchAllItemsQuery } from "../../Services/ItemService";
import { setItems, setPageCount } from "../../Store/Slices/ItemSlice";
import Item from "../Item";
import Pagination from "../Pagination";

const List: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchString, currentPage } = useAppSelector(
    (state) => state.itemReducer
  );
  const { activeCategory } = useAppSelector((state) => state.categories);
  let resultSearchString = `?category_id=${activeCategory}${
    searchString ? "&title=" + searchString : ""
  }&page=${currentPage}&limit=20`;
  const {
    data: response,
    error,
    isLoading,
  } = useFetchAllItemsQuery(resultSearchString);

  const itemsMap = response?.rows
    ? response.rows.map((item, index) => {
        return (
          <NavLink className="mb-4" key={index} to={`/item/${item.id}`}>
            <Item {...item} />
          </NavLink>
        );
      })
    : undefined;
  React.useEffect(() => {
    dispatch(setItems(response?.rows));
    dispatch(setPageCount(Math.ceil(response?.rows.length / 20)));
  }, [response?.rows]);
  if (error) {
    return <h1>Ошибка</h1>;
  } else if (isLoading) {
    return <h1>Загрузка</h1>;
  }
  return (
    <div className="mt-10 min-w-full ">
      {error && <h1>Ошибка...</h1>}
      {isLoading && <h1>Идет загрузка</h1>}
      <div className="mx-auto">
        {
          <div className="mx-auto ml-4 sm:grid-cols-2 md:grid-cols-3 grid lg:grid-cols-4 xl:grid-cols-4 lg:gap-4 sm:grid-gap-2 2xl:grid-cols-5 grid-rows-10 max-w-fit">
            {itemsMap}
          </div>
        }
      </div>
      <Pagination />
    </div>
  );
};

export default List;
