import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    addtostore: (state, action) => {
      state.products = [...state.products, ...action.payload];
    },
  },
});

export const { addtostore } = productSlice.actions;
export default productSlice.reducer;