import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import categoryReducer from './features/categorySlice';
import productReducer from './features/productSlice';
import biddingReducer from './features/biddingSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        bidding: biddingReducer,
    },
});
