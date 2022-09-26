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
import { AiFillShopping } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

type PopupClick = MouseEvent & {
  path: Node[];
};

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
  const burgerRef = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (burgerRef.current && !_event.path.includes(burgerRef.current)) {
        setIsOpenBurger(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);
  if (error) {
    return <h1>Произошла ошибка при загрузке данных</h1>;
  } else if (isLoading) {
    return <h1>Идет загрузка данных</h1>;
  }
  return (
    <div className="w-full min-w-min mx-auto sm:text-xs md:text-base lg:text-lg xl:text-xl p-1">
      <span
        ref={burgerRef}
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
            setIsOpenBurger(!isOpenBurger)
          }
        >
          <div className="cursor-pointer font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3">
            <div className="flex items-center sm:text-xs lg:text-lg xl:text-xl">
              {" "}
              <AiFillShopping />
              <h3 className="sm:text-xs lg:text-lg xl:text-xl">
                Каталог товаров
              </h3>
              <div>
                <IoIosArrowDown />
              </div>
            </div>
          </div>
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
                className="rounded-lg cursor-pointer text-xl min-w-auto my-3 font-normal hover:text-white hover:bg-lime-400 p-1 lg:p-3"
                key={index}
              >
                <NavLink to="/" className="sm:text-xs lg:text-lg xl:text-xl">
                  {item.value.replace(/["']/g, "")}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
        <li
          onMouseOut={handleMouseOutServices}
          onMouseOver={handleMouseOverServices}
          className="relative sm:text-xs lg:text-lg xl:text-xl"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(!isOpenBurger)
          }
        >
          <CategoriesServices dropdownServices={dropdownServices} />
        </li>
        <li
          className="my-2 sm:text-xs lg:text-lg xl:text-xl font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(false)
          }
        >
          <NavLink to="/contacts" className="flex items-center">
            <MdOutlinePaid className="mr-1" /> Контакты/Оплата
          </NavLink>
        </li>
        <li
          className="my-2 sm:text-xs lg:text-lg xl:text-xl font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3"
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            setIsOpenBurger(false)
          }
        >
          <NavLink to="/delivery" className="flex items-center">
            <MdOutlineDeliveryDining className="mr-1 hover:text-white sm:text-xs lg:text-lg xl:text-xl" />{" "}
            Доставка
          </NavLink>
        </li>
        <li
          className="font-semibold hover:rounded-lg sm:text-xs lg:text-lg xl:text-xl hover:text-white hover:bg-lime-400 p-3"
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
              <MdOutlineAdminPanelSettings className="mr-1 sm:text-xs lg:text-lg xl:text-xl" />{" "}
              Панель администратора
            </NavLink>
          ) : (
            <NavLink to="/login" className="flex items-center">
              <MdOutlineImportContacts className="mr-1 sm:text-xs lg:text-lg xl:text-xl" />{" "}
              Личный кабинет
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Categories;
