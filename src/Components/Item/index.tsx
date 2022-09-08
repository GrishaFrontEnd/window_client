import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { ServerItem } from "../../Models/IItem";

const Item: React.FC<ServerItem> = ({ title, price, image, count, id }) => {
  return (
    <div className="grid mr-5 bg-lime-100 border min-h-full border-lime-500 hover:bg-lime-200 rounded-lg p-2">
      <div className="flex font-semibold text-lg flex-col">
        <h1 className="mb-2">{title}</h1>
      </div>
      <div className="overflow-hidden h-44">
        <img
          className="w-full h-full object-cover object-center"
          src={process.env.REACT_APP_API + "/" + image}
          alt=""
        />
      </div>
      <h2 className="my-2 text-lg font-medium">Цена: {price} руб</h2>
      <h2 className="mb-2 text-lg font-medium">Артикул: {id}</h2>
      <div className="my-2 text-lg font-semibold">
        {count > 0 ? (
          <span className="rounded-lg border p-1 bg-lime-400 text-white">
            В наличии
          </span>
        ) : (
          <span>Товар отсутствует</span>
        )}
      </div>
      <div className="flex items-center font-medium">
        Побробнее <FaArrowRight className="ml-2" />
      </div>
    </div>
  );
};

export default Item;
