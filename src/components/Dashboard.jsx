import React, { useState, useEffect } from "react";
import { checkHealth, getStatistics, getRecentAnalyses } from "../services/api";
import FeedbackTable from "./table/FeedbackTable";
import VisualizationCharts from "./charts/VisualizationCharts";
import ApiStatusBanner from "./dashboard/ApiStatusBanner";
import DashboardStats from "./dashboard/DashboardStats";
import RecentAnalysisTable from "./dashboard/RecentAnalysisTable";

const Dashboard = () => {
	const [activeTab, setActiveTab] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	// State cho API status
	const [apiStatus, setApiStatus] = useState({
		status: "loading",
		message: "Đang kiểm tra kết nối...",
	});

	// State cho thống kê
	const [statistics, setStatistics] = useState({
		sentimentStats: { positive: 0, neutral: 0, negative: 0 },
		topTopics: [],
		systemInfo: {
			defaultModel: "",
			averageConfidence: 0,
			totalAnalyzed: 0,
		},
	});

	// State cho phân tích gần đây
	const [recentAnalyses, setRecentAnalyses] = useState([]);

	// Kiểm tra trạng thái API khi component mount
	useEffect(() => {
		const checkApiStatus = async () => {
			try {
				const response = await checkHealth();
				setApiStatus({
					status: "online",
					message:
						response.message ||
						"Hệ thống đang hoạt động bình thường",
				});
			} catch (error) {
				setApiStatus({
					status: "offline",
					message:
						"Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại.",
				});
			}
		};

		checkApiStatus();
	}, []);

	// Lấy dữ liệu thống kê và phân tích gần đây
	useEffect(() => {
		const fetchDashboardData = async () => {
			setIsLoading(true);

			if (apiStatus.status === "online") {
				try {
					// Lấy dữ liệu thống kê
					const statsData = await getStatistics();
					setStatistics(statsData);

					// Lấy danh sách phân tích gần đây
					const recentData = await getRecentAnalyses();
					setRecentAnalyses(recentData);
				} catch (error) {
					console.error("Lỗi khi tải dữ liệu Dashboard:", error);
				}
			}

			setIsLoading(false);
		};

		fetchDashboardData();
	}, [apiStatus.status]);

	// Format thời gian từ timestamp
	const formatTimestamp = (timestamp) => {
		const now = new Date();
		const time = new Date(timestamp);
		const diffMs = now - time;

		const diffMins = Math.round(diffMs / 60000);

		if (diffMins < 1) return "vừa xong";
		if (diffMins < 60) return `${diffMins} phút trước`;

		const diffHours = Math.floor(diffMins / 60);
		if (diffHours < 24) return `${diffHours} giờ trước`;

		const diffDays = Math.floor(diffHours / 24);
		return `${diffDays} ngày trước`;
	};

	// Format số lượng phản hồi
	const formatNumber = (num) => {
		return new Intl.NumberFormat("vi-VN").format(num);
	};

	// Format phần trăm
	const formatPercent = (num) => {
		return num.toFixed(1);
	};

	// Hiển thị indikator loading
	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-6">
				<div className="flex justify-center items-center h-64">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
						<p className="text-gray-600">Đang tải dữ liệu...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-6">
			<ApiStatusBanner
				status={apiStatus.status}
				message={apiStatus.message}
			/>

			{/* Dashboard Header */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Bảng điều khiển
				</h1>
				<div className="flex space-x-2">
					<button
						className={`px-4 py-2 rounded-md ${
							activeTab === "dataset"
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
						onClick={() => setActiveTab("dataset")}
					>
						Bảng phản hồi
					</button>
					<button
						className={`px-4 py-2 rounded-md ${
							activeTab === "visualization"
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
						onClick={() => setActiveTab("visualization")}
					>
						Biểu đồ thống kê
					</button>
				</div>
			</div>

			{activeTab === "dataset" && <FeedbackTable />}
			{activeTab === "visualization" && <VisualizationCharts />}

			<DashboardStats
				statistics={statistics}
				formatNumber={formatNumber}
				formatPercent={formatPercent}
			/>

			<RecentAnalysisTable
				recentAnalyses={recentAnalyses}
				formatTimestamp={formatTimestamp}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				setRecentAnalyses={setRecentAnalyses}
			/>
		</div>
	);
};

export default Dashboard;
