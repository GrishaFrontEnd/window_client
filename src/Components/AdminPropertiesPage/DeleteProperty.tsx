import React from "react";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import {
  useDeletePropertyMutation,
  useFetchPropertiesByCategoryQuery,
} from "../../Services/PropertiesApi";
import MyButton from "../../UI/MyButton";
import Downloader from "../Downloader";
import ErrorPage from "../Error";
import SearchProperty from "./SearchProperty";

const DeleteProperty: React.FC = () => {
  const [propertyName, setPropertyName] = React.useState<string>("");
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  const [deleteProperty] = useDeletePropertyMutation();
  const [value, setValue] = React.useState<number>(1);
  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyName(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(+e.target.value);
  };
  const { data: properties } = useFetchPropertiesByCategoryQuery(value);
  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let id = properties.find(
        (property) => property.title === propertyName
      ).id;
      await deleteProperty(id).unwrap();
    } catch (error) {}
  };
  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Downloader />;
  }
  return (
    <section className="mt-4 min-w-full">
      <h2 className="font-bold mb-4 text-xl">Удаление свойства</h2>
      <select
        id="услуги"
        value={value}
        onChange={handleCategoryChange}
        className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {categories.map((category, index) => {
          return (
            <option key={category.id} value={category.id}>
              {category.value.replace(/["']/g, "")}
            </option>
          );
        })}
      </select>
      <SearchProperty
        category_id={value}
        onChange={handlePropertyChange}
        value={propertyName}
      />
      <MyButton children="Удаление свойства" onClick={handleClickDelete} />
    </section>
  );
};

export default DeleteProperty;
