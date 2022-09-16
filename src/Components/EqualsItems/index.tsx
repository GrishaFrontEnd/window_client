import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useFetchAllItemsByCategoriesQuery } from "../../Services/ItemService";

export interface IEqualItemsProps {
  category: number;
}

const EqualsItems: React.FC<IEqualItemsProps> = ({ category }) => {
  const searchCategoryString = `?category_id=${category}&limit=6`;
  const {
    data: serverResponse,
    error,
    isLoading,
    refetch,
  } = useFetchAllItemsByCategoriesQuery(searchCategoryString);
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
              <div className="text-3xl mr-5">
                <FaLongArrowAltLeft />
              </div>
              <div className="grid grid-cols-6 gap-4">
                {serverResponse.rows.map((item, index) => (
                  <NavLink key={index} to={`/item/${item.id}`}>
                    <div
                      key={index}
                      className="border-2 p-2 hover:bg-slate-200"
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        {item.title}
                      </h3>
                      <h4 className="text-lg font-medium mb-4">
                        {item.price} руб
                      </h4>
                      <div className="overflow-hidden h-30">
                        <img
                          src={`${process.env.REACT_APP_API}/${item.image}`}
                          alt="Изображение окна"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      {item.count >= 1 ? (
                        <div>В наличии</div>
                      ) : (
                        <div>Нет в наличии</div>
                      )}
                    </div>
                  </NavLink>
                ))}
              </div>
              <div className="text-3xl ml-5">
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EqualsItems;
