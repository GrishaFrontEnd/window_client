import React from "react";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import Downloader from "../Downloader";
import ErrorPage from "../Error";
import AdminCreateCategory from "./CreateCategory";
import AdminDeleteCategory from "./DeleteCategory";
import AdminUpdateCategory from "./UpdateCategory";

const AdminCategoriesPanel: React.FC = () => {
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  if (error) {
    return <ErrorPage />;
  } else if (isLoading) {
    return <Downloader />;
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
