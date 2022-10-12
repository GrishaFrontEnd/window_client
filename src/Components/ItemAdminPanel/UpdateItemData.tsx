import React from "react";
import { IItemProperties, IProperties } from "../../Models/IItem";
import { useFetchItemByIdQuery } from "../../Services/ItemService";
import { useFetchPropertiesByCategoryQuery } from "../../Services/PropertiesApi";
import MyButton from "../../UI/MyButton";
import MyFileInput from "../../UI/MyFileInput";
import MyInput from "../../UI/MyInput";
import randomNumber from "../../Utils/randomNumber";
import Downloader from "../Downloader";
import ErrorPage from "../Error";
import DropdownCategory from "./DropdownCategory";
import UpdateProperties from "./UpdateProperties";

interface IUpdateItemData {
  item_id: number;
  cat_id: number;
}

const UpdateItemData: React.FC<IUpdateItemData> = ({ item_id, cat_id }) => {
  const formData = new FormData();
  const { data: item, error, isLoading } = useFetchItemByIdQuery(item_id);
  const [title, setTitle] = React.useState<string>("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const [price, setPrice] = React.useState<number>();
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+e.target.value);
  };
  const [count, setCount] = React.useState<number>();
  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(+e.target.value);
  };
  const [isOpenPopup, setIsOpenPopup] = React.useState<boolean>(false);
  const handleChangePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenPopup(!isOpenPopup);
  };
  const [category_id, setCategory_id] = React.useState<number>(cat_id);
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    formData.append("image", file);
  };
  const [properties, setProperties] = React.useState<IProperties[]>([
    { id: randomNumber(), property: "", value: "" },
  ]);
  const { data: categoryProperties } =
    useFetchPropertiesByCategoryQuery(category_id);
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory_id(+e.target.value);
    if (+e.target.value !== 1) {
      let arr: IProperties[] = [];
      categoryProperties.map((property) =>
        arr.push({ property: property.title, value: "", id: randomNumber() })
      );
      setProperties(arr);
    }
  };
  React.useEffect(() => {
    setCategory_id(category_id);
    if (category_id !== 1) {
      let arr: IProperties[] = [];
      categoryProperties.map((property) =>
        arr.push({ property: property.title, value: "", id: randomNumber() })
      );
      setProperties(arr);
    }
  }, [category_id]);
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
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
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
    return <ErrorPage />;
  } else if (isLoading) {
    return <Downloader />;
  }
  return (
    <>
      {error && <ErrorPage />}
      {isLoading && <Downloader />}
      {item && (
        <section>
          <div>
            <h2>{item.item.id}</h2>
            <div>
              <div className="overflow-hidden h-44">
                <img
                  className="w-full h-full object-cover object-center"
                  src={process.env.REACT_APP_API + "/" + item.item.image}
                  alt=""
                />
              </div>
              <MyButton
                onClick={handleChangePopup}
                children={isOpenPopup ? "Отмена" : "Изменить фото"}
              />
              {isOpenPopup && <MyFileInput onChange={handleChangeFile} />}
            </div>
            <div>
              <MyInput
                placeholder={item.item.title}
                value={title}
                onChange={handleChangeTitle}
              />
              <MyInput
                onChange={handleChangePrice}
                placeholder={String(item.item.price)}
                value={price}
              />
              <MyInput
                placeholder={String(item.item.count)}
                onChange={handleChangeCount}
                value={count}
              />
              <DropdownCategory
                onChange={handleChangeCategory}
                value={item.item.category_id}
              />
              <UpdateProperties
                id={item_id}
                category_id={item.item.category_id}
                handlePropertySelect={handlePropertySelect}
                handleValueChange={handleValueChange}
                handleRemoveProperty={handleRemoveProperty}
              />
              <MyButton
                children="Добавить свойство"
                onClick={handleAddAttribute}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateItemData;
