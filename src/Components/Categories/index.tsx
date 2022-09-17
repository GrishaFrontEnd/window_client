import React from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/Redux";
import { NavLink } from "react-router-dom";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import {
  setActiveCategories,
  setCategories,
} from "../../Store/Slices/CategoriesSlice";
import { MdOutlineAdminPanelSettings, MdOutlineMenuOpen } from "react-icons/md";
import CategoriesServices from "./CategoriesServices.tsx";
import {
  MdOutlineImportContacts,
  MdOutlineDeliveryDining,
  MdOutlinePaid,
} from "react-icons/md";

const Categories: React.FC = () => {
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  React.useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);
  const dispatch = useAppDispatch();
  const onClickCategory = (e: React.MouseEvent<HTMLLIElement>, num: number) => {
    dispatch(setActiveCategories(num));
    setIsOpenBurger(false);
  };
  const [dropdownCategory, setDropdownCategory] =
    React.useState<boolean>(false);
  const handleMouseOverCategory = (e: React.MouseEvent<HTMLLIElement>) => {
    setDropdownCategory(true);
  };
  const handleMouseOutCategory = (e: React.MouseEvent<HTMLLIElement>) => {
    setDropdownCategory(false);
  };
  const [dropdownServices, setDropdownServices] =
    React.useState<boolean>(false);
  const handleMouseOverServices = (e: React.MouseEvent<HTMLLIElement>) => {
    setDropdownServices(true);
  };
  const handleMouseOutServices = (e: React.MouseEvent<HTMLLIElement>) => {
    setDropdownServices(false);
  };
  const [isOpenBurger, setIsOpenBurger] = React.useState<boolean>(false);
  const handleClickBurger = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsOpenBurger(!isOpenBurger);
  };
  if (error) {
    return <h1>Произошла ошибка при загрузке данных</h1>;
  } else if (isLoading) {
    return <h1>Идет загрузка данных</h1>;
  }
  return (
    <div className="min-w-full mx-auto text-xl p-1">
      <span
        onClick={handleClickBurger}
        className="text-3xl cursor-pointer mx-2 md:hidden block"
      >
        <MdOutlineMenuOpen />
      </span>
      <ul
        className={
          isOpenBurger
            ? "md:flex z-[10] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 max-w-7xl md:mx-auto md:text-2xl md:justify-between md:items-baseline px-4 top-[80px] opacity-100"
            : "md:flex z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px]  transition-all ease-in duration-500 max-w-7xl md:mx-auto md:text-2xl md:justify-between md:items-baseline px-4"
        }
      >
        <li
          onMouseOut={handleMouseOutCategory}
          onMouseOver={handleMouseOverCategory}
          className="relative"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(false)
          }
        >
          <h2 className="cursor-pointer font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3">
            <NavLink to="/" className="flex items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Каталог товаров
            </NavLink>
          </h2>
          <ul
            className={
              dropdownCategory
                ? "block absolute z-50 w-min-auto bg-white rounded shadow dark:bg-gray-700"
                : "hidden"
            }
          >
            {categories?.map((item, index) => (
              <li
                onClick={(e) => onClickCategory(e, item.id)}
                className="rounded-lg cursor-pointer text-xl min-w-auto my-3 font-normal hover:text-white hover:bg-lime-400 p-3"
                key={index}
              >
                <NavLink to="/">{item.value.replace(/["']/g, "")}</NavLink>
              </li>
            ))}
          </ul>
        </li>
        <li
          onMouseOut={handleMouseOutServices}
          onMouseOver={handleMouseOverServices}
          className="relative"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(false)
          }
        >
          <CategoriesServices dropdownServices={dropdownServices} />
        </li>
        <li
          className="my-2 font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(false)
          }
        >
          <NavLink to="/contacts" className="flex items-center">
            <MdOutlinePaid className="mr-1" /> Контакты/Оплата
          </NavLink>
        </li>
        <li
          className="my-2 font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(false)
          }
        >
          <NavLink to="/delivery" className="flex items-center">
            <MdOutlineDeliveryDining className="mr-1 hover:text-white" />{" "}
            Доставка
          </NavLink>
        </li>
        <li
          className="font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(false)
          }
        >
          {isAdmin ? (
            <NavLink
              to="/admin_panel"
              className="flex items-center p-3 hover:bg-lime-400 rounded-lg"
            >
              {" "}
              <MdOutlineAdminPanelSettings className="mr-1" /> Панель
              администратора
            </NavLink>
          ) : (
            <NavLink to="/login" className="flex items-center">
              <MdOutlineImportContacts className="mr-1" /> Личный кабинет
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Categories;
