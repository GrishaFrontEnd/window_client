import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminCategoriesPanel from "./Components/AdminCategoriesPanel";
import AdminPropertiesPage from "./Components/AdminPropertiesPage";
import AdminServicePanel from "./Components/AdminServicePanel";
import ItemAdminPanel from "./Components/ItemAdminPanel";
import AdminPage from "./Pages/AdminPage";
import ContactPage from "./Pages/ContactPage";
import DeliveryPage from "./Pages/DeliveryPage";
import HomePage from "./Pages/HomePage";
import ItemPage from "./Pages/ItemPage";
import LoginPage from "./Pages/LoginPage";
import NotFoundPage from "./Pages/NotFound";
import ServicePage from "./Pages/ServicePage";
import MainLayout from "./Utils/MainLayout";
import PrivateOutlet from "./Utils/PrivateOutlet";

const App: React.FC = () => {
  return (
    <div className="max-w-full p-2">
      <div>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="item/:id" element={<ItemPage />} />
            <Route path="service/:id" element={<ServicePage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
          </Route>
          <Route path="/admin_panel" element={<PrivateOutlet />}>
            <Route path="/admin_panel" element={<AdminPage />}>
              <Route
                path="/admin_panel/categories"
                element={<AdminCategoriesPanel />}
              />
              <Route index element={<ItemAdminPanel />} />
              <Route
                path="/admin_panel/services"
                element={<AdminServicePanel />}
              />
              <Route
                path="/admin_panel/properties"
                element={<AdminPropertiesPage />}
              ></Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
