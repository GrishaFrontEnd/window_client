import React from "react";
import {
  useFetchAllServicesQuery,
  useUpdateServiceMutation,
} from "../../Services/ServiceApi";
import MyButton from "../../UI/MyButton";
import MyFileInput from "../../UI/MyFileInput";
import MyInput from "../../UI/MyInput";
import ErrorPage from "../Error";

export interface Option {
  value: number;
  label: string;
}

const UpdateService: React.FC = () => {
  const [updateService] = useUpdateServiceMutation();
  const { data: _services, error, isLoading } = useFetchAllServicesQuery();
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const formData = new FormData();
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    formData.append("image", file);
  };
  const [value, setValue] = React.useState<number>(_services[0].id);
  const _service = _services.find((service) => service.id === value);
  React.useEffect(() => {
    setTitle(_service.title);
    setDescription(_service.description);
  }, [value]);
  const handleClickForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("id", String(_service.id));
      const payload = await updateService(formData).unwrap();
    } catch (error) {}
  };
  return (
    <section className="mt-4 min-w-full">
      {error && <ErrorPage />}
      {isLoading && <h1>Товары загружаются</h1>}
      {_services.length >= 1 && (
        <div>
          <h2 className="font-bold mb-4 text-xl">Обновление услуги</h2>
          <label
            htmlFor="Услуги"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Выберите услугу
          </label>
          <select
            id="услуги"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue(+e.target.value);
              setDescription(_service.description);
              setTitle(_service.title);
            }}
            value={value}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {_services?.map((service) => {
              return (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              );
            })}
          </select>
          <div className="mt-5">
            <MyInput
              value={title}
              onChange={handleTitleChange}
              placeholder="Введите название услуги"
            />
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Описание услуги"
            ></textarea>
            <div>
              <MyFileInput onChange={handleFileChange} />
              <MyButton children="Обновить услугу" onClick={handleClickForm} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpdateService;
