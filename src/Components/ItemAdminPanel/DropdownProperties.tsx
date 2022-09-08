import React from "react";
import { useFetchPropertiesByCategoryQuery } from "../../Services/PropertiesApi";

export interface IDropdownProperties {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  category_id: number;
}

const DropdownProperties: React.FC<IDropdownProperties> = ({
  value,
  onChange,
  category_id,
}) => {
  const {
    data: _properties,
    error,
    isLoading,
  } = useFetchPropertiesByCategoryQuery(category_id);

  if (error) {
    return <h1>Произошла ошибка</h1>;
  }

  if (isLoading) {
    return <h1>Идет загрузка</h1>;
  }

  return (
    <div>
      <select
        id="атрибуты товара"
        value={value}
        onChange={onChange}
        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {_properties?.rows?.map((property, index) => {
          return (
            <option key={index} value={property.title}>
              {property.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownProperties;
