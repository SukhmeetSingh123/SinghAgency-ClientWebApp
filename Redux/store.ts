"use client";
import { configureStore } from '@reduxjs/toolkit';
import { ProductReducer } from './ProductSlice/ProductRedux';
import { authReducer } from './AuthSlice/AuthRedux';
import { OrderReducer } from './OrderSlice/OrderRedux';
const store = configureStore({
    reducer: {
        products: ProductReducer,
        auth: authReducer,
        orders:OrderReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
