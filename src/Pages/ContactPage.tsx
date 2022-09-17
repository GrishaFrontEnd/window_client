import React from "react";
import { Helmet } from "react-helmet-async";

const ContactPage: React.FC = () => {
  const leftAside: string[] = [
    "Наш адрес",
    "Номер телефона",
    "Время работы",
    "Дни работы",
    "Мы в whatsapp",
    "Оплата",
  ];
  const rightAside: string[] = [
    "Россия, Ярославль, Гагарина, 65",
    "+79959864777",
    "08:00-20:00",
    "Без обеда и выходных",
    "+79959864777",
    "Оплата производится на наличному расчёту на территории склада, либо переводом на карту банка Tinkoff",
  ];
  let tableContactItems = [];
  for (let i = 0; i < rightAside.length; i++) {
    tableContactItems.push(
      <tr key={i} className="bg-white border-b">
        <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
          {leftAside[i]}
        </th>
        <td className="py-4 px-6">{rightAside[i]}</td>
      </tr>
    );
  }
  return (
    <div className="max-w-screen-xl min-w-full min-h-fit">
      <Helmet>
        <title>Котакты/Оплата</title>
        <meta name="description" content="Купить новое или бу пвх окно" />
        <meta name="keywords" content="купить окно бу новое ПВХ пвх" />
      </Helmet>
      <h1 className="text-4xl text-start font-bold mb-9">Контакты/Оплата</h1>
      <div className="flex gap-2">
        <table className="table-auto w-full text-2xl text-left">
          <tbody>{tableContactItems}</tbody>
        </table>
      </div>
      <div className="mt-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2139.2741166744554!2d39.82244241600211!3d57.57580168107998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9cd7b092b9ff02fe!2zNTfCsDM0JzMyLjkiTiAzOcKwNDknMjguNyJF!5e0!3m2!1sru!2sru!4v1663342049657!5m2!1sru!2sru"
          width="600"
          height="450"
          loading="lazy"
          className="w-full"
          title="Склад на карте"
        />
      </div>
    </div>
  );
};

export default ContactPage;
