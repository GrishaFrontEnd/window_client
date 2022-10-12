import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import AdminCategories from "../Components/AdminCategories";
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto w-screen p-2">
      <Helmet>
        <title>Админка</title>
        <meta name="description" content="Купить новые и бу ПВХ окна/двери" />
        <meta
          name="keywords"
          content="купить окно, купить дверь, купить пвх окно, купить металлическую дверь, buoknoyar, бу окно, новое окно пвх, "
        />
      </Helmet>
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
      <div className="mt-6 max-w-6xl mx-auto flex flex-col md:flex-col lg:flex">
        <AdminCategories />
        <div className="ml-7 min-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
