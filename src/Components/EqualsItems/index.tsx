import React from "react";
import { useFetchAllItemsByCategoriesQuery } from "../../Services/ItemService";

export interface IEqualItemsProps {
  category: number;
}

const EqualsItems: React.FC<IEqualItemsProps> = ({ category }) => {
  console.log(category);
  const searchCategoryString = `?category_id=${category}`;
  const {
    data: serverResponse,
    error,
    isLoading,
    refetch,
  } = useFetchAllItemsByCategoriesQuery(searchCategoryString);
  React.useEffect(() => {
    refetch();
    console.log(serverResponse);
  }, [category]);
  return (
    <div>
      {error && <h1>Произошла ошибка при загрузке файлов</h1>}
      {isLoading && <h1>Идет загрузка товаров</h1>}
      {serverResponse?.rows?.length && (
        <section className="min-w-full">
          <div className="flex flex-col items-center">
            <h2>Другие товары из данной категории</h2>
            <div className="flex items-center">
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
          </div>
        </section>
      )}
    </div>
  );
};

export default EqualsItems;
