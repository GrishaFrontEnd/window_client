import React from "react";
import SearchItemAdmin from "./SearchItemAdmin";

const UpdateItem: React.FC = () => {
  const [isFound, setIsFound] = React.useState<boolean>(false);
  const [searchString, setSearchString] = React.useState<string>("");
  const handleChangeSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };
  const items: number[] = [1, 2, 3, 4, 5];
  return (
    <section className="mt-4 min-w-full">
      <h1 className="font-bold mb-4 text-xl">Обновление товара</h1>
      <SearchItemAdmin />
      <div>
        {searchString &&
          items.map((item, index) => <div key={index}>{index}</div>)}
      </div>
      {isFound && <div></div>}
    </section>
  );
};

export default UpdateItem;
