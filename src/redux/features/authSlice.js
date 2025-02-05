import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import authService from '../services/authFeature';

const initialState = {
    user: JSON.parse(localStorage.getItem('user') || null),
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    income: null,
    message: '',
};

export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.register(userData);
            localStorage.setItem('user', JSON.stringify(response));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.login(userData);

            localStorage.setItem('user', JSON.stringify(response));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await authService.logout();
        localStorage.removeItem('user');
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
export const getLogInStatus = createAsyncThunk(
    'auth/getLoggedInStatus',
    async (_, thunkAPI) => {
        try {
            return await authService.getLoggedInStatus();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getUserProfile = createAsyncThunk(
    'auth/profile',
    async (_, thunkAPI) => {
        try {
            return await authService.getUserProfile();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const loginUserAsSeller = createAsyncThunk(
    'auth/seller',
    async (userData, thunkAPI) => {
        try {
            const response = await authService.loginUserAsSeller(userData);
            localStorage.setItem('user', JSON.stringify(response));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getUserIncome = createAsyncThunk(
    'auth/get-income',
    async (_, thunkAPI) => {
        try {
            return await authService.getUserIncome();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getIncome = createAsyncThunk(
    'auth/get-income-of-admin',
    async (_, thunkAPI) => {
        try {
            return await authService.getIncome();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const getAllUsers = createAsyncThunk(
    'auth/get-all-users',
    async (_, thunkAPI) => {
        try {
            return await authService.getAllUsers();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        RESET(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
            })
            .addCase(loginUserAsSeller.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserAsSeller.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.user = action.payload;
                toast.success('You become a seller');
            })
            .addCase(loginUserAsSeller.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                toast.error(action.payload);
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false;
                state.user = null;
                toast.success('Logout successful');
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getLogInStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLogInStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload;
            })
            .addCase(getLogInStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // state.isLoggedIn = true;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                localStorage.removeItem('user');
                // state.isLoggedIn = true;
            })
            .addCase(getUserIncome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserIncome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.income = action.payload;
            })
            .addCase(getUserIncome.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(getIncome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIncome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.income = action.payload;
            })
            .addCase(getIncome.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true;
                state.users = action.payload;
                state.totalUsers = action.payload?.length;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isLoggedIn = true;
            });
    },
});

export const { RESET } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsSuccess = (state) => state.auth.isSuccess;

export default authSlice.reducer;
