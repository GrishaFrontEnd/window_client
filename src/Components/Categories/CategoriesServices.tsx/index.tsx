import React from "react";
import { MdMiscellaneousServices } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Redux";
import { useFetchAllServicesQuery } from "../../../Services/ServiceApi";
import { setActiveService } from "../../../Store/Slices/ItemSlice";

export interface ICategoriesServices {
  dropdownServices: boolean;
}

const CategoriesServices: React.FC<ICategoriesServices> = ({
  dropdownServices,
}) => {
  const dispatch = useAppDispatch();
  const { data: services, error, isLoading } = useFetchAllServicesQuery();
  const onClickService = (e: React.MouseEvent<HTMLLIElement>, num: number) => {
    dispatch(setActiveService(num));
  };
  return (
    <div>
      <h2
        className={
          "flex items-center cursor-pointer font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3"
        }
      >
        <MdMiscellaneousServices className="mr-1" /> Возможные услуги
      </h2>
      <ul
        className={
          dropdownServices
            ? "block absolute z-50 w-min-auto bg-white rounded shadow dark:bg-gray-700"
            : "hidden"
        }
      >
        {services?.map((item, index) => (
          <li
            onClick={(e) => onClickService(e, index)}
            className="rounded-lg cursor-pointer text-xl min-w-auto my-3 font-normal hover:text-white hover:bg-lime-400 p-3"
            key={index}
          >
            <NavLink to={`service/${item.id}`}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesServices;
