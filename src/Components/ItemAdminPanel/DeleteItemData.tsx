import React from "react";
import { useFetchItemByIdQuery } from "../../Services/ItemService";

export interface IDeleteItemData {
  id: number;
}

const DeleteItemData: React.FC<IDeleteItemData> = ({ id }) => {
  const { data: item, error, isLoading } = useFetchItemByIdQuery(id);
  return (
    <div>
      {error && <h1>Произошла ошибка</h1>}
      {isLoading && <h1>Идёт загрузка...</h1>}
      {item && (
        <section>
          <div>
            <h3>{item.item.title}</h3>
          </div>
        </section>
      )}
    </div>
  );
};

export default DeleteItemData;
