import React from "react";
import { useFetchAllPropertiesQuery } from "../../Services/PropertiesApi";
import Downloader from "../Downloader";
import ErrorPage from "../Error";
import CreateProperty from "./CreateProperty";
import DeleteProperty from "./DeleteProperty";
import UpdateProperty from "./UpdateProperty";

const AdminPropertiesPage: React.FC = () => {
  const { data: properties, error, isLoading } = useFetchAllPropertiesQuery();
  if (error) {
    return <ErrorPage />;
  } else if (isLoading) {
    return <Downloader />;
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
