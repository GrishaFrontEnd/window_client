import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFetchAllItemsQuery } from "../../Services/ItemService";

export interface IEqualItemsProps {
  category: number;
}

const EqualsItems: React.FC<IEqualItemsProps> = ({ category }) => {
  const [page, setPage] = React.useState<number>(1);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const handleSetPage = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
    setPage(num);
  };
  const searchCategoryString = `?category_id=${category}&limit=6&page=${page}`;
  const {
    data: serverResponse,
    error,
    isLoading,
    refetch,
  } = useFetchAllItemsQuery(searchCategoryString);
  React.useEffect(() => {
    refetch();
  }, [category]);
  return (
    <div>
      {error && <h1>Произошла ошибка при загрузке файлов</h1>}
      {isLoading && <h1>Идет загрузка товаров</h1>}
      {serverResponse?.rows?.length && (
        <section className="min-w-full my-10">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl mb-8   font-bold">
              Другие товары из данной категории
            </h2>
            <div className="flex items-center">
              <div
                className="text-3xl mr-5 cursor-pointer"
                onClick={(e) => handleSetPage(e, page === 1 ? 1 : page - 1)}
              >
                <FaLongArrowAltLeft />
              </div>
              <div className="grid sm:grid-cols-3 xl:grid-cols-6 gap-2">
                {serverResponse.rows.map((item, index) => (
                  <NavLink key={index} to={`/item/${item.id}`}>
                    <div
                      key={index}
                      className="border-2 p-2 hover:bg-slate-200 min-h-full"
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        {item.title}
                      </h3>
                      <h4 className="text-lg font-medium mb-4">
                        {item.price} руб
                      </h4>
                      <div className="overflow-hidden h-40">
                        <img
                          src={`${process.env.REACT_APP_API}/${item.image}`}
                          alt="Изображение окна"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="mt-3 inline-block">
                        {item.count >= 1 ? (
                          <div className="bg-lime-300 rounded-lg py-2.5 px-4 font-semibold text-black hover:bg-lime-500 hover:text-white">
                            В наличии
                          </div>
                        ) : (
                          <div>Нет в наличии</div>
                        )}
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
              {serverResponse.rows.length === 6 && (
                <div
                  className="text-3xl ml-5 cursor-pointer"
                  onClick={(e) => handleSetPage(e, page + 1)}
                >
                  <FaLongArrowAltRight />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EqualsItems;
