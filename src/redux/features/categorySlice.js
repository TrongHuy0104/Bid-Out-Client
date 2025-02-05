import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryService from '../services/categoryFeature';
import toast from 'react-hot-toast';

const initialState = {
    category: null,
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createCategory = createAsyncThunk(
    'category/create',
    async (formData, thunkAPI) => {
        try {
            return await categoryService.createCategory(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getAllCategories = createAsyncThunk(
    'category/get-all',
    async (_, thunkAPI) => {
        try {
            return await categoryService.getAllCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (id, thunkAPI) => {
        try {
            return await categoryService.deleteCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const updateCategory = createAsyncThunk(
    'category/update',
    async ({ id, formData }, thunkAPI) => {
        try {
            return await categoryService.updateCategory(id, formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('Category has been created');
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('Category has been deleted successfully');
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success('Category has been updated successfully');
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    },
});

export default categorySlice.reducer;
