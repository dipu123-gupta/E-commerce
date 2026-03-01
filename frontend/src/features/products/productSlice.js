// import {creatSlice}
import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const { removeError } = productSlice.actions;
export default productSlice.reducer;
