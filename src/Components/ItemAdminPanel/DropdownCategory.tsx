import React from "react";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import Downloader from "../Downloader";
import ErrorPage from "../Error";

export interface IDropdown {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownCategory: React.FC<IDropdown> = ({ value, onChange }) => {
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Downloader />;
  }
  return (
    <div>
      <select
        id="услуги"
        value={value}
        onChange={onChange}
        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {categories.map((category, index) => {
          return (
            <option key={index} value={category.id}>
              {category.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownCategory;
