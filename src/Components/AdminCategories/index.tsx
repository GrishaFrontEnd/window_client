import React from "react";
import {
  MdCategory,
  MdEditAttributes,
  MdOutlineHomeRepairService,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminCategories: React.FC = () => {
  return (
    <div className="mb-3">
      <ul className="border border-lime-900 rounded-lg p-3 text-xl">
        <li className="my-2 font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3">
          <NavLink to="/admin_panel" className="flex items-center">
            <MdProductionQuantityLimits className="mr-1" /> Товары
          </NavLink>
        </li>
        <li className="my-2 font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3">
          <NavLink to="/admin_panel/categories" className="flex items-center">
            <MdCategory className="mr-1" /> Категории
          </NavLink>
        </li>
        <li className="my-2 font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3">
          <NavLink to="/admin_panel/properties" className="flex items-center">
            <MdEditAttributes className="mr-1" /> Атрибуты товаров
          </NavLink>
        </li>
        <li className="my-2 font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3">
          <NavLink to="/admin_panel/services" className="flex items-center">
            <MdOutlineHomeRepairService className="mr-1" /> Услуги
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminCategories;
