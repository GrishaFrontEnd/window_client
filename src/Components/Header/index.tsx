import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../Hooks/Redux";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import {
  MdAccessTime,
  MdCalendarToday,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";

const Header: React.FC = () => {
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="mt-3 grid md:grid-cols-4 gap-4">
      <div>
        <NavLink
          className="block border-lime-900 border border-t-0 border-r-0 p-3 pt-0"
          to="/"
        >
          <h1 className="font-bold text-5xl">
            <span className="text-blue-700">Bu</span>
            <span className="italic">OKNA</span>
            <span className="text-blue-700">Yar</span>
          </h1>
          <div className="text-xl font-bold">
            Продажа б\у окон и дверей в Ярославле
          </div>
        </NavLink>
      </div>
      <div className="text-xl font-medium">
        <div>
          <div className="flex items-center">
            <MdCalendarToday className="mr-1" /> Без обеда и выходных
          </div>
          <div className="flex items-center">
            {" "}
            <MdAccessTime className="mr-1" />
            08:00-20:00
          </div>
        </div>
      </div>
      <div className="text-xl font-bold">
        <div>
          {" "}
          <a
            className="flex items-center"
            target="_blank"
            href="callto:+79999999999"
          >
            <FaPhone />
            <div className="ml-2">89962380144</div>
          </a>
        </div>
        <div>
          {" "}
          <a
            className="flex items-center"
            target="_blank"
            href="https://wa.me/+79962380144"
          >
            <FaWhatsapp />
            <div className="ml-2">89962380144</div>
          </a>
        </div>
      </div>
      {user && (
        <div className="font-bold self-center">
          <div>Вы залогинены как</div>
          <div> {user}</div>
          {isAdmin && (
            <NavLink
              to="/admin_panel"
              className="flex items-center p-3 hover:bg-lime-400 rounded-lg"
            >
              {" "}
              <MdOutlineAdminPanelSettings className="mr-1" /> Панель
              администратора
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
