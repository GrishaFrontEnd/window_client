import React from "react";
import { useParams } from "react-router-dom";
import { JsxElement } from "typescript";
import EqualsItems from "../Components/EqualsItems";
import { useFetchItemByIdQuery } from "../Services/ItemService";

const ItemPage: React.FC = () => {
  let { id } = useParams();
  const { data: item, error, isLoading } = useFetchItemByIdQuery(+id);
  if (isLoading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>Ошибка....</h1>;
  }
  return (
    <section className="mx-auto max-h-fit max-w-6xl">
      <div className="lg:grid max-h-fit lg:grid-cols-2 lg:gap-0 sm:grid-cols-1 sm:grid">
        <div className="mr-10 max-h-fit grid grid-rows-[1fr_1fr_10fr]">
          <h1 className="font-semibold sm:text-center text-4xl">
            {item.title}
          </h1>
          <h2 className="my-4 text-2xl font-medium text-lime-700">
            Цена: {item.price} руб
          </h2>
          <div className="overflow-hidden h-96">
            <img
              className="w-full h-full object-contain object-center"
              src={process.env.REACT_APP_API + "/" + item.image}
              alt="item picture"
            />
          </div>
        </div>
        <div className="max-h-fit">
          <h2 className="p-2 font-bold text-3xl mb-3">Свойства</h2>
          <table className="table-auto w-full text-xl text-left text-gray-500">
            <thead className="text-2xl text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Атрибут</th>
                <th className="py-3 px-6">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  Количество
                </th>
                <td className="py-4 px-6">{item.count} шт</td>
              </tr>
              <tr className="bg-white border-b">
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  Артикул
                </th>
                <td className="py-4 px-6">{item.id}</td>
              </tr>
              {item.properties.map((property, index) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                      {property.property}
                    </th>
                    <td className="py-4 px-6">{property.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <EqualsItems category={item.category_id} />
      </div>
    </section>
  );
};

export default ItemPage;
