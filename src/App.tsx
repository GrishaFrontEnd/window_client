import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminCategoriesPanel from "./Components/AdminCategoriesPanel";
import AdminPropertiesPage from "./Components/AdminPropertiesPage";
import AdminServicePanel from "./Components/AdminServicePanel";
import ItemAdminPanel from "./Components/ItemAdminPanel";
import AdminPage from "./Pages/AdminPage";
import BasketPage from "./Pages/BasketPage";
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
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="basket" element={<BasketPage />} />
          <Route path="item/:id" element={<ItemPage />} />
          <Route path="service/:id" element={<ServicePage />} />
          <Route path="contacts" element={<ContactPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="/admin_panel" element={<PrivateOutlet />}>
            <Route path="/admin_panel" element={<AdminPage />}>
              <Route
                path="/admin_panel/categories"
                element={<AdminCategoriesPanel />}
              />
              <Route path="/admin_panel/items" element={<ItemAdminPanel />} />
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
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
