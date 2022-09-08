import React from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/Redux";
import { useFetchAllItemsQuery } from "../../Services/ItemService";
import { setItems } from "../../Store/Slices/ItemSlice";
import CreateItem from "./CreateItem";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";

const ItemAdminPanel: React.FC = () => {
  return (
    <div className="ml-10 min-w-full flex-column">
      <h2 className="font-bold mb-4 text-xl">Товары</h2>
      <div className="flex flex-col items-center">
        <CreateItem />
        <UpdateItem />
        <DeleteItem />
      </div>
    </div>
  );
};

export default ItemAdminPanel;
