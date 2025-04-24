// Đường dẫn API mặc định - cần thay đổi nếu cần
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Kiểm tra trạng thái kết nối API
export const checkHealth = async () => {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
        throw new Error('API health check failed');
    }
    return response.json();
};

// Lấy thống kê tổng quan cho Dashboard
export const getStatistics = async () => {
    const response = await fetch(`${API_URL}/statistics`);
    if (!response.ok) {
        throw new Error('Failed to fetch statistics');
    }
    return response.json();
};

// Lấy danh sách các phân tích gần đây
export const getRecentAnalyses = async (limit = 10) => {
    const response = await fetch(`${API_URL}/analyses/recent?limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch recent analyses');
    }
    return response.json();
};

// Phân tích một phản hồi đơn lẻ
export const analyzeFeedback = async (feedback, options = {}) => {
    const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            feedback,
            ...options
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to analyze feedback');
    }

    return response.json();
};

// Phân tích hàng loạt phản hồi
export const analyzeBatchFeedback = async (feedbacks, options = {}) => {
    const response = await fetch(`${API_URL}/analyze/batch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            feedbacks,
            ...options
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to analyze batch feedback');
    }

    return response.json();
};

// Tương thích với API cũ (để không làm hỏng các component hiện có)
export const analyzeBatch = async (texts, options = {}) => {
    const response = await fetch(`${API_URL}/analyze-batch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            texts,
            ...options
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to analyze texts');
    }

    return response.json();
};

// Tải lên file CSV để phân tích hàng loạt
export const uploadCSVForAnalysis = async (file, options = {}) => {
    const formData = new FormData();
    formData.append('file', file);

    // Thêm các tùy chọn vào formData nếu cần
    Object.keys(options).forEach(key => {
        formData.append(key, options[key]);
    });

    const response = await fetch(`${API_URL}/analyze/csv`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload and analyze CSV');
    }

    return response.json();
};

// Lấy danh sách các mô hình có sẵn
export const getAvailableModels = async () => {
    const response = await fetch(`${API_URL}/models`);
    if (!response.ok) {
        throw new Error('Failed to fetch available models');
    }
    return response.json();
};