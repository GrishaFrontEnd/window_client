import React from "react";
import { useCreateServiceMutation } from "../../Services/ServiceApi";
import MyButton from "../../UI/MyButton";
import MyFileInput from "../../UI/MyFileInput";
import MyInput from "../../UI/MyInput";

const CreateService: React.FC = () => {
  const [createService] = useCreateServiceMutation();
  const formData = new FormData();
  const [title, setTitle] = React.useState<string>("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const [description, setDescription] = React.useState<string>("");
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    formData.append("image", file);
  };
  const handleClickForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      formData.append("title", title);
      formData.append("description", description);
      const payload = await createService(formData).unwrap();
    } catch (error) {}
  };
  return (
    <section className="mt-4 min-w-full">
      <h2 className="font-bold mb-4 text-xl">Создание услуги</h2>
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
        <MyButton children="Создать услугу" onClick={handleClickForm} />
      </div>
    </section>
  );
};

export default CreateService;
