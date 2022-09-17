import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>404 Not Found Page</title>
        <meta name="description" content="Купить новое или бу пвх окно" />
        <meta name="keywords" content="купить окно бу новое ПВХ пвх" />{" "}
      </Helmet>
      <div className="h-full font-bold flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-5xl mb-3">404</h1>
        <h2 className="text-xl md:text-4xl mb-3">Not Found</h2>
        <h2 className="text-xl md:text-4xl">По данному адресу ничего нет</h2>
      </div>
      <div className="mt-10">
        <NavLink to="/">
          <div className="rounded-lg bg-lime-300 px-4 py-2.5 text-xl md:text-3xl font-bold hover:text-white hover:bg-lime-500">
            Перейти на главную
          </div>
        </NavLink>
      </div>
    </section>
  );
};

export default NotFoundPage;
