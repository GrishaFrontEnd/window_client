import React from "react";
import AdminCreateCategory from "./CreateCategory";
import AdminDeleteCategory from "./DeleteCategory";
import AdminUpdateCategory from "./UpdateCategory";

const AdminCategoriesPanel: React.FC = () => {
  return (
    <div className="flex-column min-w-full">
      <h1 className="font-bold mb-4 text-xl">Категории</h1>
      <div className="flex flex-col gap-10 items-center">
        <AdminCreateCategory />
        <AdminUpdateCategory />
        <AdminDeleteCategory />
      </div>
    </div>
  );
};

export default AdminCategoriesPanel;
