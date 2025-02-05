import axios from 'axios';
import { BACKEND_URL } from '../../utils/url';

export const PRODUCT_URL = `${
    process.env.REACT_APP_BACKEND_URL || BACKEND_URL
}/product`;

const createProduct = async (formData) => {
    const response = await axios.post(PRODUCT_URL, formData, {
        withCredentials: true,
    });
    return response.data;
};
const getAllProductsOfUser = async () => {
    const response = await axios.get(`${PRODUCT_URL}/user`, {
        withCredentials: true,
    });
    return response.data;
};
const getAllProducts = async () => {
    const response = await axios.get(`${PRODUCT_URL}`, {
        withCredentials: true,
    });
    return response.data;
};
const getAllWinedProductsOfUser = async () => {
    const response = await axios.get(`${PRODUCT_URL}/won-products`, {
        withCredentials: true,
    });
    return response.data;
};
const deleteProduct = async (id) => {
    const response = await axios.delete(`${PRODUCT_URL}/${id}`, {
        withCredentials: true,
    });
    return response.data;
};
const getProduct = async (id) => {
    const response = await axios.get(`${PRODUCT_URL}/${id}`, {
        withCredentials: true,
    });
    return response.data;
};
const updateProduct = async (id, formData) => {
    const response = await axios.put(`${PRODUCT_URL}/${id}`, formData, {
        withCredentials: true,
    });
    return response.data;
};
const updateProductByAdmin = async (id, formData) => {
    const response = await axios.patch(
        `${PRODUCT_URL}/admin/product-verified/${id}`,
        formData,
        {
            withCredentials: true,
        }
    );
    return response.data;
};

const productService = {
    createProduct,
    getAllProducts,
    getAllProductsOfUser,
    getAllWinedProductsOfUser,
    deleteProduct,
    getProduct,
    updateProduct,
    updateProductByAdmin,
};

export default productService;
