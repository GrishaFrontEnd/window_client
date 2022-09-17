import React from "react";
import {
  MdMiscellaneousServices,
  MdOutlineDeliveryDining,
  MdOutlinePaid,
} from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/Redux";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import { useFetchAllServicesQuery } from "../../Services/ServiceApi";
import { setActiveCategories } from "../../Store/Slices/CategoriesSlice";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

const FooterCategories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  const handleClickCategories = (
    e: React.MouseEvent<HTMLDivElement>,
    num: number
  ) => {
    dispatch(setActiveCategories(num));
  };
  return (
    <div>
      {error && <h1>Произошла ошибка при загрузке данных</h1>}
      {isLoading && <h1>Идёт загрузка...</h1>}
      {categories && (
        <div>
          <h3 className="ml-4 flex items-center">
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
            </svg>{" "}
            Каталог товаров
          </h3>
          {categories.map((category, index) => (
            <div
              onClick={(e) => handleClickCategories(e, category.id)}
              className="my-2 border-b-2"
              key={index}
            >
              <NavLink
                className="hover:bg-lime-300 rounded-lg p-2 hover:text-white flex items-center"
                to="/"
              >
                <IoMdArrowDropright /> {category.value}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FooterServices: React.FC = () => {
  const { data: services, error, isLoading } = useFetchAllServicesQuery();
  return (
    <div>
      {error && <h1>Произошла ошибка при загрузке данных</h1>}
      {isLoading && <h1>Идёт загрузка...</h1>}
      {services && (
        <div>
          <h3 className="ml-4 flex items-center">
            <MdMiscellaneousServices className="mr-1" /> Услуги
          </h3>
          {services.map((service, index) => (
            <div className="my-2 border-b-2" key={index}>
              <NavLink
                className="hover:bg-lime-300 rounded-lg p-2 hover:text-white flex items-center"
                to={`/service/${service.id}`}
              >
                <IoMdArrowDropright /> {service.title}
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FooterNavbar: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            to="/contacts"
            className="flex items-center my-2 p-2 border-b-2 hover:bg-lime-300 rounded-lg hover:text-white"
          >
            <MdOutlinePaid className="mr-1" /> Контакты/опалата
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/delivery"
            className="flex items-center p-2 border-b-2 hover:bg-lime-300 rounded-lg hover:text-white"
          >
            <MdOutlineDeliveryDining className="mr-1 hover:text-white" />{" "}
            Доставка
          </NavLink>
        </li>
      </ul>
      <div>
        <a
          className="flex items-center my-2 p-2 border-b-2 hover:bg-lime-300 rounded-lg hover:text-white"
          target="_blank"
          href="https://wa.me/+79959864777"
        >
          <FaWhatsapp />
          <div className="ml-2">+79959864777</div>
        </a>
        <div className="flex items-center my-2 p-2 border-b-2 hover:bg-lime-300 rounded-lg hover:text-white">
          <FaPhone />
          <div className="ml-2">+79959864777</div>
        </div>
      </div>
    </div>
  );
};

const FooterData: React.FC = () => {
  return (
    <div className="p-2 my-2">
      <div>Адрес: </div>
      <div>г. Ярославль, ул. Гагарина, д.65</div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <section className="bg-lime-100 mt-5">
      <div className="max-w-screen-xl mx-auto py-4 grid md:grid-cols-4 gap-4 text-black font-medium text-xl">
        <FooterCategories />
        <FooterServices />
        <FooterNavbar />
        <FooterData />
      </div>
    </section>
  );
};

export default Footer;
