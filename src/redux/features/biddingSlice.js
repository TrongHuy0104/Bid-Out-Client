import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import biddingService from '../services/biddingFeature';
import toast from 'react-hot-toast';

const initialState = {
    history: [],
    bidding: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const placeBid = createAsyncThunk(
    'bidding/place-bid',
    async ({ price, productId }, thunkAPI) => {
        try {
            return await biddingService.placeBid({ price, productId });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const fetchBiddingHistory = createAsyncThunk(
    'bidding/get',
    async (productId, thunkAPI) => {
        try {
            return await biddingService.fetchBiddingHistory(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const sellProductByUser = createAsyncThunk(
    'bidding/sell',
    async (productId, thunkAPI) => {
        try {
            return await biddingService.sellProductByUser(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const confirmProductByUser = createAsyncThunk(
    'bidding/confirm',
    async (productId, thunkAPI) => {
        try {
            return await biddingService.confirmProductByUser(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const biddingSlice = createSlice({
    name: 'bidding',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(placeBid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(placeBid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
                toast.success('Apply success');
            })
            .addCase(placeBid.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(confirmProductByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(confirmProductByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(confirmProductByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(fetchBiddingHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBiddingHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.history = action.payload;
            })
            .addCase(fetchBiddingHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    },
});

export default biddingSlice.reducer;
