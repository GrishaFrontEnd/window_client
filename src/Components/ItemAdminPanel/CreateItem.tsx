import { useAppDispatch } from "../../Hooks/Redux";
import { useCreateItemMutation } from "../../Services/ItemService";
import React from "react";
import randomNumber from "../../Utils/randomNumber";
import { IItemProperties, IProperties } from "../../Models/IItem";
import { addItem } from "../../Store/Slices/ItemSlice";
import MyInput from "../../UI/MyInput";
import MyButton from "../../UI/MyButton";
import MyFileInput from "../../UI/MyFileInput";
import DropdownCategory from "./DropdownCategory";
import DropdownProperties from "./DropdownProperties";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import { useFetchPropertiesByCategoryQuery } from "../../Services/PropertiesApi";

const CreateItem: React.FC = () => {
  const { data: categories } = useFetchAllCategoriesQuery();
  const dispatch = useAppDispatch();
  const formData = new FormData();
  const [createItem] = useCreateItemMutation();
  const [categoryNum, setCategoryNum] = React.useState<number>(1);
  const [properties, setProperties] = React.useState<IProperties[]>([
    { id: randomNumber(), property: "", value: "" },
  ]);
  const {
    data: categoryProperties,
    error,
    isLoading,
    refetch,
  } = useFetchPropertiesByCategoryQuery(categoryNum);
  React.useEffect(() => {
    refetch();
    if (categoryNum !== 1) {
      let arr: IProperties[] = [];
      categoryProperties.map((property) =>
        arr.push({ property: property.title, value: "", id: randomNumber() })
      );
      setProperties(arr);
    }
  }, [categoryNum]);
  React.useLayoutEffect(() => {
    refetch();
    if (categoryNum !== 1) {
      let arr: IProperties[] = [];
      categoryProperties.map((property) =>
        arr.push({ property: property.title, value: "", id: randomNumber() })
      );
      setProperties(arr);
    }
  }, [categoryNum]);
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryNum(+e.target.value);
    refetch();
    console.log(categoryNum, +e.target.value, categoryProperties);
    if (+e.target.value !== 1) {
      let arr: IProperties[] = [];
      categoryProperties.map((property) =>
        arr.push({ property: property.title, value: "", id: randomNumber() })
      );
      setProperties(arr);
    }
    console.log(categoryNum, +e.target.value, categoryProperties);
  };
  const [title, setTitle] = React.useState<string>("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const [price, setPrice] = React.useState<number>();
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const [count, setCount] = React.useState<number>();
  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    formData.append("image", file);
  };
  const handleAddAttribute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let _properties = [...properties];
    _properties.push({
      id: randomNumber(),
      property: "",
      value: "",
    });
    setProperties(_properties);
  };
  const handleValueChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = properties.findIndex((property) => property.id === id);
    let _properties = [...properties] as IProperties[];
    _properties[index].value = e.target.value;
    setProperties(_properties);
  };

  const create_Properties = (properties: IProperties[]): IItemProperties[] => {
    let customProperty: IItemProperties[] = [];
    for (let i = 0; i < properties.length; i++) {
      customProperty.push({
        property: properties[i].property,
        value: properties[i].value,
      });
    }
    return customProperty;
  };

  const handleCreateItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      formData.append("category_id", String(categoryNum));
      formData.append("title", title);
      formData.append("price", String(price));
      formData.append("count", String(count));
      let customProperties = create_Properties(properties);
      for (let i = 0; i < customProperties.length; i++) {
        Object.keys(customProperties[i]).forEach((key) =>
          formData.append(key, customProperties[i][key])
        );
      }
      const payload = await createItem(formData).unwrap();
      dispatch(addItem(payload));
    } catch (error) {}
  };
  const handlePropertySelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const index = properties.findIndex((property) => property.id === id);
    let _properties = [...properties] as IProperties[];
    _properties[index].property = e.target.value;
    setProperties(_properties);
  };
  const handleRemoveProperty = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    let _properties = [...properties];
    _properties = _properties.filter((property) => property.id !== id);
    setProperties(_properties);
  };
  if (error) {
    <h1>Произошла ошибка</h1>;
  } else if (isLoading) {
    return <h1>Идет загрузка</h1>;
  }
  return (
    <div className="mt-4 min-w-full">
      <h2 className="font-bold mb-4 text-xl">Создание товара</h2>
      <MyInput
        value={title}
        onChange={handleChangeTitle}
        placeholder="Введите название товара"
      />
      <MyInput
        value={price}
        onChange={handleChangePrice}
        placeholder="Введите цену товара"
      />
      <MyInput
        value={count}
        onChange={handleChangeCount}
        placeholder="Введите количество товара"
      />
      <DropdownCategory onChange={handleChangeCategory} value={categoryNum} />
      {properties.map((property, index) => (
        <div className="flex gap-5 mt-5" key={index}>
          <DropdownProperties
            value={property.property}
            category_id={
              categories.find((category) => category.id == categoryNum).id
            }
            onChange={(e) => handlePropertySelect(e, property.id)}
          />
          <MyInput
            name="value"
            onChange={(e) => handleValueChange(property.id, e)}
            value={property.value}
            placeholder="Значение свойства"
          />
          <MyButton
            onClick={(e) => handleRemoveProperty(e, property.id)}
            children="убрать свойство"
          />
        </div>
      ))}
      <MyButton children="Добавить свойство" onClick={handleAddAttribute} />
      <div className="mt-5">
        <MyFileInput onChange={handleChangeFile} />
      </div>
      <MyButton onClick={handleCreateItem} children="Создать предмет" />
    </div>
  );
};

export default CreateItem;
