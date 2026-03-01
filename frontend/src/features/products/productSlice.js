// import {creatSlice}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const link = "/api/v1/products";
      const { data } = await axios.get(link);
      console.log("Response", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message?.data || "Something went wrong");
    }
  },
);

// product details
export const getProductDetails = createAsyncThunk(
  "product/details",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // get products lifecycle
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log(" FULFILLED action payload", action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // product details lifecycle
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log(" prodect details", action.payload);
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { removeError } = productSlice.actions;
export default productSlice.reducer;
