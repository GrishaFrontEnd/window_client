import React from "react";
import { useFetchItemByIdQuery } from "../../Services/ItemService";
import Downloader from "../Downloader";
import ErrorPage from "../Error";

export interface IDeleteItemData {
  id: number;
}

const DeleteItemData: React.FC<IDeleteItemData> = ({ id }) => {
  const { data: item, error, isLoading } = useFetchItemByIdQuery(id);
  return (
    <div>
      {error && <ErrorPage />}
      {isLoading && <Downloader />}
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
