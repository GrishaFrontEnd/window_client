import React from "react";
import { useFetchItemByIdQuery } from "../../Services/ItemService";
import MyButton from "../../UI/MyButton";
import MyInput from "../../UI/MyInput";
import Downloader from "../Downloader";
import ErrorPage from "../Error";
import DropdownProperties from "./DropdownProperties";

interface IUpdateProperties {
  id: number;
  category_id: number;
  handlePropertySelect: (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => void;
  handleValueChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleRemoveProperty: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;
}

const UpdateProperties: React.FC<IUpdateProperties> = ({
  id,
  category_id,
  handlePropertySelect,
  handleValueChange,
  handleRemoveProperty,
}) => {
  const { data: item, error, isLoading } = useFetchItemByIdQuery(id);
  return (
    <div>
      {error && <ErrorPage />}
      {isLoading && <Downloader />}
      {item && (
        <div>
          {item._properties.map((item, index) => (
            <div key={index}>
              <DropdownProperties
                value={item.property}
                category_id={category_id}
                onChange={(e) => handlePropertySelect(e, item.id)}
              />
              <MyInput
                name="value"
                onChange={(e) => handleValueChange(e, item.id)}
                value={item.value}
                placeholder="Значение свойства"
              />
              <MyButton
                onClick={(e) => handleRemoveProperty(e, item.id)}
                children="убрать свойство"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateProperties;
