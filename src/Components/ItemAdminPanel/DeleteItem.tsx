import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/Redux";
import { useDeleteItemMutation } from "../../Services/ItemService";
import { removeItem } from "../../Store/Slices/ItemSlice";
import MyButton from "../../UI/MyButton";
import MyInput from "../../UI/MyInput";

const DeleteItem: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteItem] = useDeleteItemMutation();
  const [title, setTitle] = React.useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = await deleteItem(5).unwrap();
      dispatch(removeItem(5));
      navigate("/admin_panel");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="mt-4 min-w-full">
      <h1 className="font-bold mb-4 text-xl">Удаление товара</h1>
      <MyInput
        onChange={handleTitleChange}
        placeholder="Название товара"
        value={title}
      />
      <MyButton children="Удаление товара" onClick={handleClickDelete} />
    </section>
  );
};

export default DeleteItem;
