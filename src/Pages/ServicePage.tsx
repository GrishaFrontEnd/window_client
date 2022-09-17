import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useFetchOneServiceByIdQuery } from "../Services/ServiceApi";

const ServicePage: React.FC = () => {
  const { id } = useParams();
  const { data: service, error, isLoading } = useFetchOneServiceByIdQuery(+id);
  if (isLoading) {
    return <h1>Идет загрузка</h1>;
  } else if (error) {
    alert(error);
    <h1>Ошибка....</h1>;
  }
  return (
    <section className="max-w-screen-xl min-w-full min-h-fit">
      <Helmet>
        <title>{service.title}</title>
        <meta name="description" content="Купить новые и бу ПВХ окна/двери" />
        <meta
          name="keywords"
          content="купить окно, купить дверь, купить пвх окно, купить металлическую дверь, buoknoyar, бу окно, новое окно пвх, "
        />
      </Helmet>
      <div className="grid grid-cols-2">
        <div className="">
          <h1 className="font-bold text-4xl text-center mb-4">
            {service.title}
          </h1>
          <div className="overflow-hidden h-96">
            <img
              className="w-full h-full object-contain object-center"
              src={process.env.REACT_APP_API + "/" + service.image}
              alt="Изображение услуги"
            />
          </div>
        </div>
        <div>
          <p className="text-2xl">{service.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
