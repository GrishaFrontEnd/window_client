import React from "react";
import CreateProperty from "./CreateProperty";
import DeleteProperty from "./DeleteProperty";
import UpdateProperty from "./UpdateProperty";

const AdminPropertiesPage: React.FC = () => {
  return (
    <div>
      <CreateProperty />
      <UpdateProperty />
      <DeleteProperty />
    </div>
  );
};

export default AdminPropertiesPage;
