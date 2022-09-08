import React from "react";
import { NavLink } from "react-router-dom";
import { useFetchAllCategoriesQuery } from "../../Services/CategoriesApi";
import { useFetchAllServicesQuery } from "../../Services/ServiceApi";

const FooterCategories: React.FC = () => {
  const { data: categories, error, isLoading } = useFetchAllCategoriesQuery();
  return (
    <div>
      {error && <h1>Произошла ошибка при загрузке данных</h1>}
      {isLoading && <h1>Идёт загрузка...</h1>}
      {categories && (
        <div>
          <h3>Каталог товаров</h3>
          {categories.map((category, index) => (
            <div key={index}>
              <NavLink to={`/${category.value}`}>{category.value}</NavLink>
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
          {services.map((service, index) => (
            <div key={index}>
              <NavLink to={`/service/${service.id}`}>{service.title}</NavLink>
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
          <NavLink to="/contacts">Контакты/опалата</NavLink>
        </li>
        <li>
          <NavLink to="/delivery">Доставка</NavLink>
        </li>
      </ul>
      <div>
        <div>whatsapp 89999999999</div>
        <div>phone number 89999999999</div>
      </div>
    </div>
  );
};

const FooterData: React.FC = () => {
  return (
    <div>
      <div>адресс</div>
      <div>телефон</div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <section className="grid md:grid-cols-4 bg-lime-900 font-white">
      <FooterCategories />
      <FooterServices />
      <FooterNavbar />
      <FooterData />
    </section>
  );
};

export default Footer;
