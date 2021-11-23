import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQ: 0 },
  reducers: {
    replaceCart(state, action) {
      state.totalQ = action.payload.totalQ;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existItem = state.items.find((item) => item.id === newItem.id);
      state.totalQ++;
      if (!existItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existItem.quantity = existItem.quantity + 1;
        existItem.totalPrice = existItem.price + existItem.totalPrice;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existItem = state.items.find((item) => item.id === id);
      state.totalQ--;
      if (existItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existItem.quantity--;
        existItem.totalPrice -= existItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
