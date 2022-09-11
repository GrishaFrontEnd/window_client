import React from "react";

const ContactPage: React.FC = () => {
  const leftAside: string[] = [
    "Наш адрес",
    "Комментарий",
    "Номер телефона",
    "Время работы",
    "Дни работы",
    "Примечание",
    "Мы в whatsapp",
    "Оплата",
  ];
  const rightAside: string[] = [
    "Россия, Ярославль, Гагарина, 65",
    "При въезде поверните направо",
    "8-999-999-99-99",
    "08:00-20:00",
    "Без обеда и выходных",
    "По договоренности можем открыться раньше либо позже",
    "89962380144",
    "Оплата производится на наличному расчёту на территории склада, либо переводом на карту",
  ];
  let tableContactItems = [];
  for (let i = 0; i < rightAside.length; i++) {
    tableContactItems.push(
      <tr className="bg-white border-b">
        <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
          {leftAside[i]}
        </th>
        <td className="py-4 px-6">{rightAside[i]}</td>
      </tr>
    );
  }
  return (
    <div className="max-w-screen-xl min-w-full min-h-fit">
      <div className="flex gap-2">
        <table className="table-auto w-full text-xl text-left text-gray-500">
          <tbody>{tableContactItems}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactPage;
