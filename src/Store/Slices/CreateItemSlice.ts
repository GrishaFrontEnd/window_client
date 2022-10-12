import { createSlice } from "@reduxjs/toolkit";
import { IProperties } from "../../Models/IItem";
import randomNumber from "../../Utils/randomNumber";

interface ICreateItem {
  categoryNum: number;
  properties: IProperties[];
}

const initialState: ICreateItem = {
  categoryNum: 1,
  properties: [{ id: randomNumber(), property: "", value: "" }],
};

const CreateItemSlice = createSlice({
  name: "CreateItem",
  initialState,
  reducers: {
    setCategoryNum(state, action) {
      state.categoryNum = action.payload;
    },
    setProperties(state, action) {
      state.properties = action.payload;
    },
  },
});

export const { setCategoryNum, setProperties } = CreateItemSlice.actions;
export default CreateItemSlice.reducer;
