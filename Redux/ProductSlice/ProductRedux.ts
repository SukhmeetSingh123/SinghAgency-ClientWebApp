
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


export type Product = {
    _id: string,
    item_Name: string,
    item_Price: number,
    item_Image: any,
    item_Description: string,
    featured_Item: boolean,
}


export type ProductType = (Product)[];

export type ProductState = {
    Product: ProductType,
    specificProduct: Product | null,
    featuredProducts:ProductType|null,
    isLoading: boolean,
    isError: boolean
}

const initialState: ProductState = {
    Product: [],
    specificProduct: null,
    featuredProducts:[],
    isLoading: false,
    isError: false
}

export const fetchProducts = createAsyncThunk<Product[]>("products/fetchAll", async () => {
    try {
        const response = await fetch('https://singhagency-backened.onrender.com/SinghAgencies/fetchAllProducts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw error.message || 'Fetching failed.';
    }
});

export const fetchSpecificProduct = createAsyncThunk<{message:string,product:Product}, string>("products/specificProduct", async (productId: string) => {
    try {
        const response = await fetch(`https://singhagency-backened.onrender.com/SinghAgencies/fetchSpecificProductData/${productId}`);
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw error.message || 'Fetching failed.';
    }
})


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const products = action.payload;
                state.Product = action.payload;
                state.featuredProducts = products.filter(product => product.featured_Item);
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(fetchSpecificProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchSpecificProduct.fulfilled, (state, action: PayloadAction<{ message: string; product: Product }>) => {
                state.specificProduct = action.payload.product;
                state.isLoading = false;
              })
            .addCase(fetchSpecificProduct.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

        }
    });
    
    export const ProductReducer = productSlice.reducer;