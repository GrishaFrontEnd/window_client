import React from "react";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import { useCreatePropertyMutation } from "../../Services/PropertiesApi";
import MyButton from "../../UI/MyButton";
import MyInput from "../../UI/MyInput";
import Downloader from "../Downloader";
import ErrorPage from "../Error";

const CreateProperty: React.FC = () => {
  const [property, setProperty] = React.useState<string>("");
  const [value, setValue] = React.useState<number>(1);
  const [createProperty] = useCreatePropertyMutation();
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  const handleChangeProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProperty(e.target.value);
  };
  const handleClickCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(+e.target.value);
  };
  const handleClickProperty = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await createProperty({
        title: property,
        category_id: value,
      }).unwrap();
    } catch (err) {}
  };
  if (isLoading) {
    return <Downloader />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <section className="mt-4 min-w-full">
      <h2 className="font-bold mb-4 text-xl">
        Добавление свойства к категории
      </h2>
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
      <MyInput
        placeholder="Название атрибута"
        value={property}
        onChange={handleChangeProperty}
      />
      <MyButton children="Добавить свойство" onClick={handleClickProperty} />
    </section>
  );
};

export default CreateProperty;
