import React from "react";
import { useFetchAllServicesQuery } from "../../Services/ServiceApi";
import Select from "react-select";

export interface IDropdownServices {
  options: {
    value: number;
    label: string;
  }[];
  onChange?: any;
}

const DropdownServices: React.FC<IDropdownServices> = ({
  onChange,
  options,
}) => {
  return (
    <div>
      <Select onChange={onChange} options={options} />
    </div>
  );
};

export default DropdownServices;
