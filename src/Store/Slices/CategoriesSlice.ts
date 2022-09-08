import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../Models/ICategory";

export interface ICategoryState {
  error: string;
  isLoading: boolean;
  categories: ICategory[];
  activeCategory: number;
}

const initialState: ICategoryState = {
  categories: [],
  error: "",
  isLoading: false,
  activeCategory: 1,
};

const CategoriesSlice = createSlice({
  name: "CategoriesSlice",
  initialState,
  reducers: {
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    removeCategory(state, action) {
      state.categories.filter((category) => category.id != action.payload.id);
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    updateCategories(state, action) {
      state.categories[action.payload.id].value = action.payload.value;
    },
    setActiveCategories(state, action) {
      state.activeCategory = action.payload;
    },
  },
});

export const {
  addCategory,
  removeCategory,
  setCategories,
  updateCategories,
  setActiveCategories,
} = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
