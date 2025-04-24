import React from "react";
import { getRecentAnalyses } from "../../services/api";

const RecentAnalysisTable = ({
	recentAnalyses,
	formatTimestamp,
	isLoading,
	setIsLoading,
	setRecentAnalyses,
}) => {
	const handleRefresh = async () => {
		setIsLoading(true);
		try {
			const recentData = await getRecentAnalyses();
			setRecentAnalyses(recentData);
		} catch (error) {
			console.error("Lỗi khi tải lại phân tích gần đây:", error);
		}
		setIsLoading(false);
	};

	return (
		<div className="mt-8 bg-white p-6 rounded-lg shadow-md">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold text-gray-800">
					Phân tích gần đây
				</h2>
				<button
					onClick={handleRefresh}
					className="text-blue-600 hover:text-blue-800 flex items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-1"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					Làm mới
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full">
					<thead>
						<tr className="bg-gray-100">
							<th className="py-2 px-4 text-left">Phản hồi</th>
							<th className="py-2 px-4 text-left">Cảm xúc</th>
							<th className="py-2 px-4 text-left">Chủ đề</th>
							<th className="py-2 px-4 text-left">Thời gian</th>
						</tr>
					</thead>
					<tbody>
						{recentAnalyses.length > 0 ? (
							recentAnalyses.map((analysis, index) => (
								<tr key={index} className="border-b">
									<td className="py-2 px-4">
										{analysis.feedback}
									</td>
									<td className="py-2 px-4">
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												analysis.sentiment ===
												"positive"
													? "bg-green-100 text-green-800"
													: analysis.sentiment ===
													  "negative"
													? "bg-red-100 text-red-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{analysis.sentiment === "positive"
												? "Tích cực"
												: analysis.sentiment ===
												  "negative"
												? "Tiêu cực"
												: "Trung tính"}
										</span>
									</td>
									<td className="py-2 px-4">
										{analysis.topic}
									</td>
									<td className="py-2 px-4 text-sm text-gray-600">
										{formatTimestamp(analysis.timestamp)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan="4"
									className="py-4 text-center text-gray-500"
								>
									Chưa có dữ liệu phân tích nào.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default RecentAnalysisTable;
