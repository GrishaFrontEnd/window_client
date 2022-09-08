import { createSlice } from "@reduxjs/toolkit";
import { IItem } from "../../Models/IItem";

interface ItemState {
  items: IItem[];
  isLoading: boolean;
  error: string;
  activeCategory: number;
  activeService: number;
  searchString: string;
  currentPage: number;
  pageCount: number;
  activeSearchCategory: number;
}

const initialState: ItemState = {
  items: [],
  isLoading: false,
  error: "",
  activeCategory: 0,
  activeService: 0,
  searchString: "",
  currentPage: 1,
  pageCount: 1,
  activeSearchCategory: 1,
};

const ItemSlice = createSlice({
  name: "ItemSlice",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setActiveService(state, action) {
      state.activeService = action.payload;
    },
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items.filter((item) => item.id != action.payload);
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      if (state.currentPage <= 0) {
        state.currentPage = 1;
      }
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
  },
});

export default ItemSlice.reducer;
export const {
  setItems,
  setActiveService,
  setSearchString,
  addItem,
  removeItem,
  setCurrentPage,
  setPageCount,
} = ItemSlice.actions;
