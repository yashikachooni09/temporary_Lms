import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import { loadState, saveState } from '../utils/localstorage.js';

// Load cart from localStorage if available
const preloadedState = {
  cart: loadState()?.cart || {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState,
});

// Persist cart to localStorage on every state change
store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

export default store;