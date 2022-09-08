import React from "react";
import { useAppDispatch } from "../../Hooks/Redux";
import {
  useFetchAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../Services/CategoriesApi";
import MyButton from "../../UI/MyButton";
import MyInput from "../../UI/MyInput";

const AdminUpdateCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: categories,
    error,
    isLoading,
    refetch,
  } = useFetchAllCategoriesQuery();
  const [updateCategory] = useUpdateCategoryMutation();
  const [value, setValue] = React.useState<string>("");
  const [newName, setNewName] = React.useState<string>("");
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };
  const handleClickCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      console.log(value, newName);
      const payload = await updateCategory({
        oldValue: value,
        newValue: newName,
      }).unwrap();
      refetch();
    } catch (error) {
      console.log("rejected => ", error);
    }
  };
  if (error) {
    return <h1>Ошибка</h1>;
  } else if (isLoading) {
    return <h1>Идет загрузка</h1>;
  }
  return (
    <div className="mt-4 min-w-full">
      <h1 className="font-bold mb-4 text-xl">Обновление категории</h1>
      <select
        id="услуги"
        value={value}
        onChange={handleClickCategory}
        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {categories.map((category, index) => {
          return (
            <option key={category.id} value={category.value}>
              {category.value}
            </option>
          );
        })}
      </select>
      <MyInput
        onChange={handleChangeName}
        value={newName}
        placeholder="Введите новое название категории"
      />
      <MyButton children="Обновить" onClick={handleClick} />
    </div>
  );
};

export default AdminUpdateCategory;
