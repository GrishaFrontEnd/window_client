import React from "react";
import { useFetchAllItemsQuery } from "../../Services/ItemService";
import MyInput from "../../UI/MyInput";
import Downloader from "../Downloader";
import ErrorPage from "../Error";

interface ISearchItemAdmin {
  searchString: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchItemAdmin: React.FC<ISearchItemAdmin> = ({
  searchString,
  onClick,
  onChange,
  value,
}) => {
  const {
    data: items,
    error,
    isLoading,
  } = useFetchAllItemsQuery(`?title=${searchString}&limit=10&page=1`);
  return (
    <div>
      {error && <ErrorPage />}
      {isLoading && <Downloader />}
      {items && (
        <section className="relative w-full">
          <MyInput
            value={value}
            placeholder="Введите название товара"
            onChange={onChange}
          />
          <div className="absolute bg-lime-100 z-10 border rounded-lg w-full text-2xl font-bold">
            {searchString &&
              items?.rows?.map((item, index) => (
                <div
                  onClick={(e) => onClick(e, item.id)}
                  className="my-3 cursor-pointer"
                  key={index}
                >
                  {item.title}
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchItemAdmin;
