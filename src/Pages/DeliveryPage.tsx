import React from "react";
import { Helmet } from "react-helmet-async";

const DeliveryPage: React.FC = () => {
  return (
    <div className="max-w-screen-xl min-w-full min-h-fit">
      <Helmet>
        <title>Доставка</title>
        <meta name="description" content="Купить новые и бу ПВХ окна/двери" />
        <meta
          name="keywords"
          content="купить окно, купить дверь, купить пвх окно, купить металлическую дверь, buoknoyar, бу окно, новое окно пвх, "
        />
      </Helmet>
      <div>
        <h1 className="text-4xl text-start font-bold mb-9">Доставка</h1>
        <p className="text-start text-2xl">
          Доставка товаров осуществляется в пределах области. Межгород по
          договоренности.
        </p>
      </div>
    </div>
  );
};

export default DeliveryPage;
