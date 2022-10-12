import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import EqualsItems from "../Components/EqualsItems";
import {
  useFetchItemByIdQuery,
  useSetItemImageMutation,
  useUpdateCountMutation,
  useUpdatePriceMutation,
} from "../Services/ItemService";
import { HiOutlinePencil } from "react-icons/hi";
import { useAppSelector } from "../Hooks/Redux";
import MyFileInput from "../UI/MyFileInput";
import MyButton from "../UI/MyButton";
import { FiPlus, FiMinus } from "react-icons/fi";
import Downloader from "../Components/Downloader";
import ErrorPage from "../Components/Error";

const ItemPage: React.FC = () => {
  let { id } = useParams();

  const { data: item, error, isLoading, refetch } = useFetchItemByIdQuery(+id);

  const { isAdmin } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.categories);

  const formData = new FormData();

  //Обновление изображения

  const [setImage] = useSetItemImageMutation();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files[0];
    formData.append("image", file);
  };
  const handleSetImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      formData.append("id", String(item.item.id));
      await setImage(formData).unwrap();
      refetch();
    } catch (err) {}
  };

  // Изменение названия

  // const [title, setTitle] = React.useState<string>("");
  // const [isVisibleTitle, setIsVisibleTitle] = React.useState<boolean>(false);
  // const handleClickTitle = (e: React.MouseEvent<HTMLDivElement>) => {};
  // const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.currentTarget.title);
  //   setIsVisibleTitle(true);
  // };
  // const handleSetTitle = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   try {
  //     formData.append("title", title);
  //   } catch (err) {}
  // };

  // Изменение цены

  // const [updatePrice] = useUpdatePriceMutation();
  // const [price, setPrice] = React.useState<string>("");
  // const [isSetPrice, setIsSetPrice] = React.useState<boolean>(true);
  // const handleClickPrice = (e: React.MouseEvent<HTMLDivElement>) => {
  //   setIsSetPrice(isSetPrice);
  // };
  // console.log(isSetPrice);
  // const handleSetPrice = React.useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setIsSetPrice(true);
  //     setPrice(e.target.value);
  //   },
  //   [price, isSetPrice]
  // );
  // const handleFocusPrice = React.useCallback(
  //   (e: React.FocusEvent<HTMLInputElement>) => {
  //     setIsSetPrice(true);
  //   },
  //   [isSetPrice]
  // );
  // const handleUpdatePrice = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   try {
  //     await updatePrice({ id: item.item.id, price: Number(price) });
  //     refetch();
  //   } catch (e) {}
  // };

  // Изменение количества

  const [updateCount] = useUpdateCountMutation();
  const handleChangeCount = async (
    e: React.MouseEvent<HTMLSpanElement>,
    num: number
  ) => {
    try {
      console.log(id, num);
      await updateCount({ id: item.item.id, count: num }).unwrap();
      refetch();
    } catch (err) {}
  };

  // Изменение категории

  // Изменение свойств

  if (isLoading) {
    return <Downloader />;
  }
  if (error) {
    return <ErrorPage />;
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
              {/* {isAdmin && (
                <div>
                  <HiOutlinePencil />
                </div>
              )} */}
            </div>
          </div>
          <div className="my-2 text-2xl font-medium text-lime-700 flex items-center">
            <div>Цена: {item.item.price} руб</div>
          </div>
          <div>
            <div className="relative pl-0 pt-0 pr-0 pb-[58%]">
              <img
                className="w-full h-full object-cover absolute top-0 left-0"
                src={process.env.REACT_APP_API + "/" + item.item.image}
                alt="Изображение товара"
              />
            </div>
            {/* <div>
              {isAdmin && (
                <div className="w-full mx-auto">
                  <MyFileInput onChange={handleFileChange} />
                </div>
              )}
              <div>
                <MyButton children="Обновить фото" onClick={handleSetImage} />
              </div>
            </div> */}
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
                      <span
                        onClick={(e) =>
                          handleChangeCount(e, item.item.count + 1)
                        }
                      >
                        <FiPlus className="inline cursor-pointer hover:text-black" />
                      </span>{" "}
                      <span
                        onClick={(e) =>
                          handleChangeCount(e, item.item.count - 1)
                        }
                      >
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
