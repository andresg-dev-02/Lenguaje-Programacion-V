import api from '../api/axiosInstance';

export const finalizeOrder = async (orderDto) => {
    try {
        const response = await api.post('Product/ProcessSale', orderDto, { useAuth: false });
        return response.data;
    } catch (error) {
        console.error("Error finalizing order:", error);
        throw error;
    }
};

export const getPurchaseHistory = async (userId) => {
    try {
        const response = await api.get(`Product/GetHistorySale/${userId}`, { useAuth: false });
        return response.data;
    } catch (error) {
        console.error("Error fetching purchase history:", error);
        throw error;
    }
};
