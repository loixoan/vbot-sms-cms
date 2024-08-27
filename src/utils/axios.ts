// src/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8888/", // URL gốc cho các yêu cầu API
    timeout: 10000, // thời gian chờ yêu cầu
    headers: {
        'Content-Type': 'application/json'
        // thêm các header khác nếu cần
    }
});

// Cấu hình interceptor nếu cần
axiosInstance.interceptors.request.use(
    config => {
        // Làm gì đó trước khi gửi yêu cầu (vd: thêm token)
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // Xử lý lỗi phản hồi (vd: hiển thị thông báo lỗi)
        return Promise.reject(error);
    }
);

export default axiosInstance;
