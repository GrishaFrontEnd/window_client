import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/Redux";
import {
  useDeleteServiceMutation,
  useFetchAllServicesQuery,
} from "../../Services/ServiceApi";
import { removeService, setServices } from "../../Store/Slices/ServiceSlice";
import MyButton from "../../UI/MyButton";
import Downloader from "../Downloader";
import ErrorPage from "../Error";

const DeleteService: React.FC = () => {
  const navigate = useNavigate();
  const [deleteSerivce] = useDeleteServiceMutation();
  const dispatch = useAppDispatch();
  const { data: _services, error, isLoading } = useFetchAllServicesQuery();
  React.useEffect(() => {
    dispatch(setServices(_services));
  }, [_services]);
  const { services } = useAppSelector((state) => state.service);
  const firstId = services[0].id;
  const [value, setValue] = React.useState<number>(firstId);
  const _service = services.find((service) => service.id === value);
  const handleClickService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(+e.target.value);
  };
  const handleDeleteService = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await deleteSerivce(value).unwrap();
      dispatch(removeService({ id: _service.id }));
      navigate("/");
    } catch (error) {}
  };
  if (error) {
    return <ErrorPage />;
  } else if (isLoading) {
    return <Downloader />;
  }
  return (
    <section className="mt-4 min-w-full">
      <h2 className="font-bold mb-4 text-xl">Удаление услуги</h2>
      <select
        id="услуги"
        value={value}
        onChange={handleClickService}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {services.map((service) => {
          return (
            <option key={service.id} value={service.id}>
              {service.title}
            </option>
          );
        })}
      </select>
      <div className="mt-5">
        <MyButton children="Удалить услугу" onClick={handleDeleteService} />
      </div>
    </section>
  );
};

export default DeleteService;
