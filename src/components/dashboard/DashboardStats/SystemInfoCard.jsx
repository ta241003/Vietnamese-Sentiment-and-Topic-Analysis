import React from "react";

const SystemInfoCard = ({ systemInfo, formatPercent, formatNumber }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">
				Thông tin hệ thống
			</h2>
			<div className="space-y-3">
				<div>
					<p className="text-sm text-gray-600">Các loại model</p>
					<p className="font-medium">
						{"Machine Learning (ML), Deep Learning (DL)"}
					</p>
				</div>
				<div>
					<p className="text-sm text-gray-600">
						Độ tin cậy trung bình
					</p>
					<p className="font-medium">
						{formatPercent(systemInfo.averageConfidence)}%
					</p>
				</div>
				<div>
					<p className="text-sm text-gray-600">
						Phản hồi đã phân tích
					</p>
					<p className="font-medium">
						{formatNumber(systemInfo.totalAnalyzed)} phản hồi
					</p>
				</div>
			</div>
		</div>
	);
};

export default SystemInfoCard;
