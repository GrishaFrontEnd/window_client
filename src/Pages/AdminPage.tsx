import React from "react";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import AdminCategories from "../Components/AdminCategories";
import { FaArrowLeft } from "react-icons/fa";

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-screen">
      <header className="flex justify-between p-3">
        <NavLink
          className="flex items-center text-xl font-semibold hover:rounded-lg hover:text-white hover:bg-lime-400 p-3"
          to="/"
        >
          <FaArrowLeft className="mr-1" /> На главную
        </NavLink>
        <h1 className="text-4xl self-center font-bold">
          Панель администратора
        </h1>
        <div></div>
      </header>
      <div className="mt-6 max-w-6xl mx-auto flex">
        <AdminCategories />
        <div className="ml-7 min-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
