
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import transactionReducer from './slices/transactionSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    transaction: transactionReducer,
  },
});
