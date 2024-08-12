import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../ProductSlice/ProductRedux";

interface OrderItem {
  _id: string;
  filteredResponse:[ {
    productDetail: Product;
    Quantity: number;
  }]
}

interface OrderResponse {
  success: boolean;
  msg: string;
  error?: string;
}

// export type OrderType = OrderItem[];

export type OrderState = {
  Orders: OrderItem|null,
  isLoading: boolean,
  isError: boolean
}



const initialState: OrderState = {
  Orders: null,
  isLoading: false,
  isError: false
}

export const fetchOrders = createAsyncThunk<OrderItem>("Orders/fetchOrders", async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_HEADER}/SinghAgencies/fetchOrders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken') || '',
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error.message || 'Fetching failed.';
  }
});

export const addOrder = createAsyncThunk<OrderResponse, { ProductId: string, Quantity: number }>("orders/addOrder", async ({ ProductId, Quantity }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_HEADER}/SinghAgencies/newOrders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken') || '',
      },
      body: JSON.stringify({ ProductId, Quantity }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error.message || 'Adding order failed.';
  }
}
);

export const deleteOrder = createAsyncThunk<OrderResponse, { orderId: string, productId: string }>("orders/deleteOrder", async ({ orderId, productId }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_HEADER}/SinghAgencies/deleteOrders`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken') || '',
      },
      body: JSON.stringify({ orderId, productId }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error.message || 'Deleting order failed.';
  }
}
);


const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderItem>) => {
        state.Orders = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })


      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
        //   state.Orders.push(action.payload);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
        //   state.Orders = state.Orders.filter(
        //     (order) => order.productDetail._id !== action.payload.
        //   );
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const OrderReducer = ordersSlice.reducer;




