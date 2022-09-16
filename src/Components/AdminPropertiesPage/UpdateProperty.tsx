import React from "react";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import {
  useFetchPropertiesByCategoryQuery,
  useUpdatePropertyMutation,
} from "../../Services/PropertiesApi";
import MyButton from "../../UI/MyButton";
import MyInput from "../../UI/MyInput";
import SearchProperty from "./SearchProperty";

const UpdateProperty: React.FC = () => {
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  const [updateAttribute] = useUpdatePropertyMutation();
  const [value, setValue] = React.useState<number>(1);
  const { data: _properties } = useFetchPropertiesByCategoryQuery(value);
  const handleClickCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(+e.target.value);
  };
  const [oldAttribute, setOldAttribute] = React.useState<string>("");
  const [newAttribute, setNewAttribute] = React.useState<string>("");
  const handleChangeOldAttribute = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOldAttribute(e.target.value);
  };
  const handleChangeNewAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAttribute(e.target.value);
  };

  const handleClickUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const payload = await updateAttribute({
        id: _properties.find((property) => property.title === oldAttribute).id,
        category_id: value,
        titleProperty: newAttribute,
      }).unwrap();
    } catch (error) {}
  };
  if (error) {
    return <h1>Произошла ошибка</h1>;
  }
  if (isLoading) {
    return <h1>Идет загрузка</h1>;
  }
  return (
    <section className="mt-4 min-w-full">
      <h2 className="font-bold mb-4 text-xl">Изменение свойства</h2>
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
      <SearchProperty
        onChange={handleChangeOldAttribute}
        category_id={value}
        value={oldAttribute}
      />
      <MyInput
        placeholder="Новое название атрибута"
        value={newAttribute}
        onChange={handleChangeNewAttribute}
      />
      <MyButton children="Обновить атрибут" onClick={handleClickUpdate} />
    </section>
  );
};

export default UpdateProperty;
