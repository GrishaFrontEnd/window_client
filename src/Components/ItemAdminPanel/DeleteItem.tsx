import debounce from "lodash.debounce";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/Redux";
import { useDeleteItemMutation } from "../../Services/ItemService";
import { removeItem } from "../../Store/Slices/ItemSlice";
import MyButton from "../../UI/MyButton";
import MyInput from "../../UI/MyInput";
import DeleteItemData from "./DeleteItemData";
import SearchItemAdmin from "./SearchItemAdmin";

const DeleteItem: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteItem] = useDeleteItemMutation();
  const [title, setTitle] = React.useState<string>("");
  const [value, setValue] = React.useState<string>("");
  const [isFound, setIsFound] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>();
  const [searchString, setSearchString] = React.useState<string>("");
  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    setIsFound(true);
    setValue("");
    setSearchString("");
    setId(id);
    console.log(id, "event");
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
  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = await deleteItem(id).unwrap();
      dispatch(removeItem(id));
      navigate("/admin_panel");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="mt-4 min-w-full">
      <h1 className="font-bold mb-4 text-xl">Удаление товара</h1>
      <SearchItemAdmin
        onClick={handleClickItem}
        onChange={onChangeSearch}
        searchString={searchString}
        value={value}
      />
      {isFound && <DeleteItemData id={id} />}
      <MyButton children="Удаление товара" onClick={handleClickDelete} />
    </section>
  );
};

export default DeleteItem;
