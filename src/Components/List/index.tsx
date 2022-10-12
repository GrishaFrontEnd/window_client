import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/Redux";
import { useFetchAllItemsQuery } from "../../Services/ItemService";
import { setItems, setPageCount } from "../../Store/Slices/ItemSlice";
import Downloader from "../Downloader";
import ErrorPage from "../Error";
import Item from "../Item";
import Pagination from "../Pagination";

const List: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchString, currentPage, pageCount } = useAppSelector(
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

  React.useEffect(() => {
    dispatch(setItems(response?.rows));
    dispatch(setPageCount(Math.ceil(response?.count / 20)));
  }, [response?.rows]);
  if (error) {
    return <ErrorPage />;
  } else if (isLoading) {
    return <Downloader />;
  }
  return (
    <div className="mt-10 min-w-full ">
      {error && <ErrorPage />}
      {isLoading && <Downloader />}
      <div className="mx-auto">
        {response && (
          <div className="mx-auto ml-4 grid-cols-2 md:grid-cols-3 grid lg:grid-cols-4 xl:grid-cols-4 lg:gap-4 sm:grid-gap-2 2xl:grid-cols-5 grid-rows-10 max-w-fit">
            {response?.count
              ? response?.rows.map((item, index) => {
                  return (
                    <NavLink
                      className="mb-4 block"
                      key={index}
                      to={`/item/${item.id}`}
                    >
                      <Item {...item} />
                    </NavLink>
                  );
                })
              : undefined}
          </div>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default List;
