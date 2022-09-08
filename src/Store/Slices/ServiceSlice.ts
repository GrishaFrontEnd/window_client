import { createSlice } from "@reduxjs/toolkit";
import { ServiceState } from "../../Models/IService";

const initialState: ServiceState = {
  error: "",
  isLoading: false,
  services: [],
  serviceSearch: "",
};

const ServiceSlice = createSlice({
  name: "ServiceSlice",
  initialState,
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
    },
    addService(state, action) {
      state.services.push(action.payload);
    },
    removeService(state, action) {
      state.services.filter((service) => service.id !== action.payload.id);
    },
    setOneServiceById(state, action) {
      state.services[action.payload.id].title = action.payload.title;
      state.services[action.payload.id].description =
        action.payload.description;
      state.services[action.payload.id].image = action.payload.image;
    },
    setSearchServiceString(state, action) {
      state.serviceSearch = action.payload;
    },
  },
});

export default ServiceSlice.reducer;
export const {
  setOneServiceById,
  setServices,
  addService,
  removeService,
  setSearchServiceString,
} = ServiceSlice.actions;
