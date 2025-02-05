import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../services/productFeature';
import toast from 'react-hot-toast';

const initialState = {
    product: null,
    products: [],
    winedProducts: [],
    userProducts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createProduct = createAsyncThunk(
    'product/create',
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getAllProducts = createAsyncThunk(
    'product/public/get-products',
    async (_, thunkAPI) => {
        try {
            return await productService.getAllProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getProduct = createAsyncThunk(
    'product/public/get-product',
    async (id, thunkAPI) => {
        try {
            return await productService.getProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getAllProductsOfUser = createAsyncThunk(
    'product/get-user-products',
    async (_, thunkAPI) => {
        try {
            return await productService.getAllProductsOfUser();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getAllWinedProductsOfUser = createAsyncThunk(
    'product/get-wined-products',
    async (_, thunkAPI) => {
        try {
            return await productService.getAllWinedProductsOfUser();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const updateProduct = createAsyncThunk(
    'product/user/update',
    async ({ id, formData }, thunkAPI) => {
        try {
            return await productService.updateProduct(id, formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const updateProductByAdmin = createAsyncThunk(
    'product/admin/update',
    async ({ id, formData }, thunkAPI) => {
        try {
            return await productService.updateProductByAdmin(id, formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products.push(action.payload);
                toast.success('Category has been created');
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllProductsOfUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProductsOfUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.userProducts = action.payload;
            })
            .addCase(getAllProductsOfUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getAllWinedProductsOfUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllWinedProductsOfUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.winedProducts = action.payload;
            })
            .addCase(getAllWinedProductsOfUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('Product deleted successfully');
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('Product updated successfully');
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateProductByAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProductByAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
                toast.success('Product updated successfully');
            })
            .addCase(updateProductByAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    },
});

export const selectProduct = (state) => state.product.product;

export default productSlice.reducer;
