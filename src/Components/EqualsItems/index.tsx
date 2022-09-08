import React from "react";
import { useFetchAllItemsByCategoriesQuery } from "../../Services/ItemService";

export interface IEqualItemsProps {
  category: number;
}

const EqualsItems: React.FC<IEqualItemsProps> = ({ category }) => {
  const searchCategoryString = `?category_id=${category};`;
  const {
    data: serverResponse,
    error,
    isLoading,
    refetch,
  } = useFetchAllItemsByCategoriesQuery(searchCategoryString);
  return (
    <div>
      {error && <h1>Произошла ошибка при загрузке файлов</h1>}
      {isLoading && <h1>Идет загрузка товаров</h1>}
      {serverResponse?.rows?.length >= 1 ? (
        <section className="">
          <h2>Другие товары из данной категории</h2>
          <div className="grid grid-cols-8">
            <div>Лево</div>
            {serverResponse.rows.map((item, index) => (
              <div key={index}>
                <h3>{item.title}</h3>
                <h4>{item.price}</h4>
                <div>
                  <img
                    src={`${process.env.REACT_APP_API}/${item.image}`}
                    alt="Изображение окна"
                  />
                </div>
              </div>
            ))}
            <div>Право</div>
          </div>
        </section>
      ) : (
        <h1>Товаров в данной категории не найдено</h1>
      )}
    </div>
  );
};

export default EqualsItems;
