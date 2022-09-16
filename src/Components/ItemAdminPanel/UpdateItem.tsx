import debounce from "lodash.debounce";
import React from "react";
import SearchItemAdmin from "./SearchItemAdmin";
import UpdateItemData from "./UpdateItemData";

const UpdateItem: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const [isFound, setIsFound] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>();
  const [searchString, setSearchString] = React.useState<string>("");
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    setIsFound(true);
    setValue("");
    setSearchString("");
    setId(id);
  };
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      setSearchString(str);
    }, 1500),
    []
  );
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
    setIsFound(false);
  };
  return (
    <section className="mt-4 min-w-full">
      <h1 className="font-bold mb-4 text-xl">Обновление товара</h1>
      <SearchItemAdmin
        onClick={handleClickItem}
        onChange={onChangeSearch}
        searchString={searchString}
        value={value}
      />
      {isFound && <UpdateItemData cat_id={12} item_id={id} />}
    </section>
  );
};

export default UpdateItem;
