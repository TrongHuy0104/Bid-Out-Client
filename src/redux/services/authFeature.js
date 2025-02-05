import axios from 'axios';
import { BACKEND_URL } from '../../utils/url';

export const AUTH_URL = `${
    process.env.REACT_APP_BACKEND_URL || BACKEND_URL
}/users/`;

const register = async (userData) => {
    const response = await axios.post(AUTH_URL + 'register', userData, {
        withCredentials: true,
    });
    return response.data;
};
const login = async (userData) => {
    const response = await axios.post(AUTH_URL + 'login', userData, {
        withCredentials: true,
    });
    return response.data;
};
const logout = async () => {
    const response = await axios.get(AUTH_URL + 'logout', {
        withCredentials: true,
    });
    return response.data;
};
const getLoggedInStatus = async () => {
    const response = await axios.get(AUTH_URL + 'loggedin', {
        withCredentials: true,
    });
    return response.data;
};
const getUserProfile = async () => {
    const response = await axios.get(AUTH_URL + 'getuser', {
        withCredentials: true,
    });
    return response.data;
};
const loginUserAsSeller = async (userData) => {
    const response = await axios.post(AUTH_URL + 'seller', userData, {
        withCredentials: true,
    });
    return response.data;
};
const getUserIncome = async () => {
    const response = await axios.get(AUTH_URL + 'sell-amount', {
        withCredentials: true,
    });
    return response.data;
};
// only access for admin user
const getIncome = async () => {
    const response = await axios.get(AUTH_URL + 'estimate-income', {
        withCredentials: true,
    });
    return response.data;
};
const getAllUsers = async () => {
    const response = await axios.get(AUTH_URL + 'users', {
        withCredentials: true,
    });
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    getLoggedInStatus,
    getUserProfile,
    loginUserAsSeller,
    getUserIncome,
    getIncome,
    getAllUsers,
};

export default authService;
