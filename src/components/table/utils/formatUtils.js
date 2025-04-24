export const formatDateTime = (timestamp) => {
    if (!timestamp) return "N/A";

    try {
        const date = new Date(timestamp);
        return date.toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch (error) {
        console.error("Lỗi định dạng thời gian:", error);
        return "N/A";
    }
};

export const formatConfidence = (confidence) => {
    return `${(confidence * 100).toFixed(1)}%`;
};

export const formatModel = (modelType) => {
    return modelType || "ml";
};