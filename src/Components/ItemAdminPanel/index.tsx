import React from "react";
import { useFetchAllItemsQuery } from "../../Services/ItemService";
import CreateItem from "./CreateItem";
import DeleteItem from "./DeleteItem";

const ItemAdminPanel: React.FC = () => {
  const { data: serverResponse, error, isLoading } = useFetchAllItemsQuery("");
  if (error) {
    return <h1>Произошла ошибка при загрузке товара</h1>;
  } else if (isLoading) {
    return <h1>Идёт загрузка товаров</h1>;
  }
  return (
    <div className="ml-10 min-w-full flex-column">
      <h2 className="font-bold mb-4 text-xl">Товары</h2>
      <div className="flex flex-col items-center">
        <CreateItem />
        {serverResponse.rows.length >= 1 && <DeleteItem />}
      </div>
    </div>
  );
};

export default ItemAdminPanel;
