import React from "react";
import { useAppDispatch } from "../../Hooks/Redux";
import { useCreateCategoryMutation } from "../../Services/CategoriesApi";
import { addCategory } from "../../Store/Slices/CategoriesSlice";
import MyButton from "../../UI/MyButton";
import MyInput from "../../UI/MyInput";

const AdminCreateCategory: React.FC = () => {
  const [createCategory] = useCreateCategoryMutation();
  const dispatch = useAppDispatch();
  const [descriptionCategory, setDescriptionCategory] =
    React.useState<string>("");
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionCategory(e.target.value);
  };
  const onClickButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = await createCategory({
        value: descriptionCategory,
      }).unwrap();
      dispatch(addCategory(payload));
    } catch (error) {}
  };
  return (
    <div className="mt-4 min-w-full">
      <div className="font-bold mb-4 text-xl">Создание категории</div>
      <MyInput placeholder="название категории" onChange={onChangeInput} />
      <MyButton children="Создать категорию" onClick={onClickButton} />
    </div>
  );
};

export default AdminCreateCategory;
