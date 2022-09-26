import React from "react";
import { NavLink } from "react-router-dom";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdAccessTime, MdCalendarToday } from "react-icons/md";

const Header: React.FC = () => {
  return (
    <div className="pt-3 flex flex-col items-start sm:justify-center md:flex md:flex-row md:justify-between md:items-center min-w-full">
      <div className="my-3 md:my-0">
        <NavLink className="block" to="/">
          <h1 className="font-bold xl:text-3xl md:text-xl lg:text-2xl sm:text-lg">
            <span className="text-blue-700">Bu</span>
            <span className="italic">OKNA</span>
            <span className="text-blue-700">Yar</span>
          </h1>
        </NavLink>
      </div>
      <div className="my-3 md:my-0">
        <div className="sm:text-sm lg:text-sm md:text-lg xl:text-xl font-bold">
          <div>Продажа б\у окон и</div>
          <div> дверей в Ярославле</div>
        </div>
      </div>
      <div className="sm:text-sm lg:text-sm md:text-lg xl:text-xl font-medium my-3 md:my-0">
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
      <div className="sm:text-sm lg:text-sm md:text-lg xl:text-xl font-bold my-3 md:my-0">
        <div>
          {" "}
          <div className="flex items-center">
            <FaPhone />
            <div className="ml-2">+79959864777</div>
          </div>
        </div>
        <div className="sm:text-sm lg:text-sm md:text-lg xl:text-xl">
          {" "}
          <a
            className="flex items-center"
            target="_blank"
            href="https://wa.me/+79959864777"
          >
            <FaWhatsapp />
            <div className="ml-2">+79959864777</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
