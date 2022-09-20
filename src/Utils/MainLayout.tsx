import React from "react";
import { Outlet } from "react-router-dom";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useAppDispatch } from "../Hooks/Redux";
import { useMeQuery } from "../Services/LoginService";
import { setCredentials } from "../Store/Slices/AuthSlice";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: response, error, isLoading } = useMeQuery("");
  React.useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(
        setCredentials({
          token: response?.token,
          email: response?.email,
          isAdmin: response?.isAdmin,
        })
      );
    }
  });
  if (error) {
    return <h1>Произошла ошибка при загрузке сайта</h1>;
  } else if (isLoading) {
    return <h1>Идёт загрузка данных</h1>;
  }
  return (
    <div className="max-w-screen-xl flex items-center flex-col min-h-screen mx-auto">
      <div className="flex w-full items-center flex-col flex-[1_0_auto]">
        <div className="min-w-full">
          <Header />
        </div>
        <div className="w-full">
          <div className="max-w-full">
            <Categories />
            <div className="mt-5 min-w-full mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0_0_auto] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
