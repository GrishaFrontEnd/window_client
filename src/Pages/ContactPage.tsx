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
  return (
    <div className="max-w-screen-xl min-w-full min-h-fit">
      <div className="flex gap-2">
        <div className="max-w-fit">
          {leftAside.map((item, index) => (
            <h2
              className="font-medium mb-2 p-2 border border-lime-500 border-t-0 border-l-0 border-r-0 text-2xl"
              key={index}
            >
              {item}:
            </h2>
          ))}
        </div>
        <div className="max-w-fit">
          {rightAside.map((item, index) => (
            <h2
              className="font-normal mb-2 p-2 text-2xl border border-lime-500 border-t-0 border-l-0 border-r-0"
              key={index}
            >
              {item}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
