import React from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/Redux";
import { useFetchAllServicesQuery } from "../../Services/ServiceApi";
import { setServices } from "../../Store/Slices/ServiceSlice";
import CreateService from "./CreateService";
import DeleteService from "./DeleteService";
import UpdateService from "./UpdateService";

const AdminServicePanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: _services, error, isLoading } = useFetchAllServicesQuery();
  React.useEffect(() => {
    dispatch(setServices(_services));
  }, [_services]);
  const { services } = useAppSelector((state) => state.service);
  return (
    <div className="flex-column min-w-full">
      <h1 className="font-bold mb-4 text-xl">Оказываемые услги</h1>
      <CreateService />
      {isLoading && <h1>Идет загурзка</h1>}
      {error && <h1>Ошибка</h1>}
      {services?.length >= 1 ? (
        <div>
          <UpdateService />
          <DeleteService />
        </div>
      ) : (
        <h2 className="mt-7 font-bold mb-4 text-xl">
          Услуги в данный момент не добавлены
        </h2>
      )}
    </div>
  );
};

export default AdminServicePanel;
