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
  return (
    <div className="max-w-screen-xl flex items-center flex-col min-h-full mx-auto my-0">
      <div className="flex items-center flex-col mt-5 pb-25">
        <Header />
        <div className="">
          <div>
            <Categories />
            <div className="mt-5 min-w-full mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[-25] h-25">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
