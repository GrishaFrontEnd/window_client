import React from "react";
import { useFetchPropertiesByCategoryQuery } from "../../Services/PropertiesApi";
import ErrorPage from "../Error";

export interface ISearchProperty {
  category_id: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const SearchProperty: React.FC<ISearchProperty> = ({
  category_id,
  onChange,
  value,
}) => {
  const {
    data: properties,
    error,
    isLoading,
  } = useFetchPropertiesByCategoryQuery(category_id);
  React.useEffect(() => {}, [category_id]);
  return (
    <div className="">
      {error && <ErrorPage />}
      {isLoading && <h1>Загрузка</h1>}
      <div>
        <select
          id="услуги"
          value={value}
          onChange={onChange}
          className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {properties?.map((property, index) => {
            return (
              <option key={index} value={property.id}>
                {property.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SearchProperty;
