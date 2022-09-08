import React from "react";
import {
  useDeleteCategoryMutation,
  useFetchAllCategoriesQuery,
} from "../../Services/CategoriesApi";
import MyButton from "../../UI/MyButton";

const AdminDeleteCategory: React.FC = () => {
  const {
    data: categories,
    error,
    isLoading,
    refetch,
  } = useFetchAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [value, setValue] = React.useState<number>();
  const handleClickCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(+e.target.value);
  };
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = await deleteCategory(value).unwrap();
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
      <h1 className="font-bold mb-4 text-xl">Удаление категории</h1>
      <select
        id="услуги"
        value={value}
        onChange={handleClickCategory}
        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {categories.map((category, index) => {
          return (
            <option key={category.id} value={category.id}>
              {category.value}
            </option>
          );
        })}
      </select>
      <MyButton children="Удалить категорию" onClick={handleClick} />
    </div>
  );
};

export default AdminDeleteCategory;
