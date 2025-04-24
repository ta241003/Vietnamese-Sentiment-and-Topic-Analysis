export const COLORS = {
    positive: "#34D399",
    neutral: "#FBBF24",
    negative: "#F87171",
};

export const COLORS_ARRAY = ["#34D399", "#FBBF24", "#F87171"];

export const TABS = ["Cảm xúc", "Chủ đề", "Theo thời gian", "Độ tự tin"];
export const MODELS = ["Tất cả", "ml", "dl"];

export const processTimeSeriesData = (data) => {
    const dateMap = {};
    data.forEach((item) => {
        const date = new Date(item.timestamp).toISOString().split("T")[0];
        if (!dateMap[date]) {
            dateMap[date] = {
                date,
                total: 0,
                positive: 0,
                negative: 0,
                neutral: 0,
            };
        }
        dateMap[date].total += 1;
        dateMap[date][item.sentiment] += 1;
    });
    return Object.values(dateMap).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
};

export const processTopicTimeSeries = (data) => {
    const topicDateMap = {};
    data.forEach((item) => {
        const date = new Date(item.timestamp).toISOString().split("T")[0];
        if (!topicDateMap[date]) topicDateMap[date] = { date };
        const topic = item.topic || "Khác";
        topicDateMap[date][topic] = (topicDateMap[date][topic] || 0) + 1;
    });
    return Object.values(topicDateMap).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
};