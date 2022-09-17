import React from "react";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import AdminCreateCategory from "./CreateCategory";
import AdminDeleteCategory from "./DeleteCategory";
import AdminUpdateCategory from "./UpdateCategory";

const AdminCategoriesPanel: React.FC = () => {
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  if (error) {
    return <h1>Произошла ошибка при загрузке данных</h1>;
  } else if (isLoading) {
    return <h1>Идёт загрузка данных</h1>;
  }
  return (
    <div className="flex-column min-w-full">
      <h1 className="font-bold mb-4 text-xl">Категории</h1>
      <div className="flex flex-col gap-10 items-center">
        <AdminCreateCategory />
        {categories.length >= 1 && (
          <div className="w-full">
            <AdminUpdateCategory />
            <AdminDeleteCategory />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoriesPanel;
