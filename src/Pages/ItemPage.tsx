import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import EqualsItems from "../Components/EqualsItems";
import {
  useFetchItemByIdQuery,
  useSetItemImageMutation,
  useUpdateDataItemMutation,
} from "../Services/ItemService";
import { HiOutlinePencil } from "react-icons/hi";
import { useAppSelector } from "../Hooks/Redux";
import MyFileInput from "../UI/MyFileInput";
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";
import { FiPlus, FiMinus } from "react-icons/fi";

const ItemPage: React.FC = () => {
  let { id } = useParams();

  const { data: item, error, isLoading, refetch } = useFetchItemByIdQuery(+id);

  const { isAdmin } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.categories);

  let formData = new FormData();

  const [updateData] = useUpdateDataItemMutation();
  const [setImage] = useSetItemImageMutation();

  //Обновление изображения

  const [isVisibleImageBtn, setIsVisibleImageBtn] =
    React.useState<boolean>(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files[0];
    formData.append("image", file);
    setIsVisibleImageBtn(true);
  };
  const handleSetImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      formData.append("id", id);
      await setImage(formData).unwrap();
      setIsVisibleImageBtn(false);
      refetch();
      formData.delete("image");
    } catch (err) {}
  };

  // Изменение названия

  const [title, setTitle] = React.useState<string>("");
  const [isVisibleTitle, setIsVisibleTitle] = React.useState<boolean>(false);
  const handleClickTitle = (e: React.MouseEvent<HTMLDivElement>) => {};
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.title);
    setIsVisibleTitle(true);
  };
  const handleSetTitle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      formData.append("title", title);
    } catch (err) {}
  };

  // Изменение цены

  const [price, setPrice] = React.useState<string>("");
  const [isSetPrice, setIsSetPrice] = React.useState<boolean>(false);
  const handleClickPrice = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSetPrice(!isSetPrice);
  };
  const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleUpdatePrice = async (e: React.MouseEvent<HTMLButtonElement>) => {
    formData.append("title", item.item.title);
    formData.append("count", String(item.item.count));
    formData.append("price", `${price} руб.`);
    formData.append("category_id", String(item.item.category_id));
    // formData.append("properties", item._properties);
    try {
      await updateData(formData).unwrap();
      refetch();
    } catch (e) {}
  };

  // Изменение количества

  const [count, setCount] = React.useState<number>(0);
  const handleChangeCount = async (
    e: React.MouseEvent<HTMLSpanElement>,
    num: number
  ) => {};

  // Изменение категории

  // Изменение свойств

  if (isLoading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>Ошибка....</h1>;
  }
  return (
    <section className="mx-auto max-h-fit max-w-screen-xl">
      <Helmet>
        <title>{item.item.title}</title>
        <meta name="description" content="Купить новые и бу ПВХ окна/двери" />
        <meta
          name="keywords"
          content="купить окно, купить дверь, купить пвх окно, купить металлическую дверь, buoknoyar, бу окно, новое окно пвх, "
        />
      </Helmet>
      <div className="lg:grid max-h-fit lg:grid-cols-2 lg:gap-0 sm:grid-cols-1 sm:grid">
        <div className="mr-10 max-h-fit grid grid-rows-[1fr_1fr_6fr]">
          <div className="flex items-center">
            <h1 className="mr-4 font-semibold text-start text-4xl">
              {item.item.title}
            </h1>
            <div className="text-3xl cursor-pointer">
              {isAdmin && (
                <div>
                  <HiOutlinePencil />
                </div>
              )}
            </div>
          </div>
          <div
            className="my-2 text-2xl font-medium text-lime-700 flex items-center"
            onClick={handleClickPrice}
          >
            {isSetPrice ? (
              <MyInput
                placeholder={String(item.item.price)}
                onChange={handleSetPrice}
              />
            ) : (
              <div>Цена: {item.item.price} руб</div>
            )}
            <div className="text-3xl cursor-pointer">
              {isAdmin && (
                <div>
                  <HiOutlinePencil />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="overflow-hidden h-96">
              <img
                className="w-full h-full object-contain object-center"
                src={process.env.REACT_APP_API + "/" + item.item.image}
                alt="Изображение товара"
              />
            </div>
            <div>
              {isAdmin && (
                <div className="w-full mx-auto">
                  <MyFileInput onChange={handleFileChange} />
                </div>
              )}
              {isVisibleImageBtn && (
                <div>
                  <MyButton children="Обновить фото" onClick={handleSetImage} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="max-h-fit">
          <h2 className="p-2 font-bold text-3xl mb-3">Свойства</h2>
          <table className="table-auto w-full text-xl text-left text-gray-500">
            <thead className="text-2xl text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-3 px-6">Атрибут</th>
                <th className="py-3 px-6">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  Количество
                </th>
                <td className="py-4 px-6">
                  {item.item.count} шт{" "}
                  {isAdmin && (
                    <span className="inline">
                      <span onClick={}>
                        <FiPlus className="inline cursor-pointer hover:text-black" />
                      </span>{" "}
                      <span onClick={}>
                        <FiMinus className="inline cursor-pointer hover:text-black" />
                      </span>
                    </span>
                  )}
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  Артикул
                </th>
                <td className="py-4 px-6">{item.item.id}</td>
              </tr>
              <tr className="bg-white border-b">
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  Категория
                </th>
                <td className="py-4 px-6">
                  {
                    categories.find(
                      (category) => category.id === item.item.category_id
                    ).value
                  }
                </td>
              </tr>
              {item._properties.map((property, index) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                      {property.property}
                    </th>
                    <td className="py-4 px-6">{property.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <EqualsItems category={item.item.category_id} />
      </div>
    </section>
  );
};

export default ItemPage;
