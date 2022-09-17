import React from "react";
import { useFetchAllPropertiesQuery } from "../../Services/PropertiesApi";
import CreateProperty from "./CreateProperty";
import DeleteProperty from "./DeleteProperty";
import UpdateProperty from "./UpdateProperty";

const AdminPropertiesPage: React.FC = () => {
  const { data: properties, error, isLoading } = useFetchAllPropertiesQuery();
  if (error) {
    return <h1>Произошла ошибка при загрузке свойств</h1>;
  } else if (isLoading) {
    return <h1>Идёт загрузка свойств</h1>;
  }
  return (
    <div>
      <CreateProperty />
      {properties.length >= 1 && (
        <div>
          <UpdateProperty />
          <DeleteProperty />
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesPage;
