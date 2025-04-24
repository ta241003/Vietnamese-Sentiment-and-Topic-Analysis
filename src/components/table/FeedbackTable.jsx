import React, { useEffect, useState } from "react";
import { getRecentAnalyses } from "../../services/api";
import TablePagination from "./TablePagination";
import ExportButtons from "./ExportButtons";
import {
	formatDateTime,
	formatConfidence,
	formatModel,
} from "./utils/formatUtils";

const FeedbackTable = () => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 15;

	useEffect(() => {
		getRecentAnalyses(50).then(setData).catch(console.error);
	}, []);

	// Tính toán tổng số trang
	const totalPages = Math.ceil(data.length / rowsPerPage);

	// Lấy dữ liệu cho trang hiện tại
	const getCurrentPageData = () => {
		const startIndex = (currentPage - 1) * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;
		return data.slice(startIndex, endIndex);
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mt-6 overflow-x-auto">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold text-gray-800">
					Bảng phản hồi
				</h2>
				<ExportButtons data={data} />
			</div>

			<table className="min-w-full">
				<thead className="bg-gray-100">
					<tr>
						<th className="text-left p-2">Phản hồi</th>
						<th className="text-left p-2">Cảm xúc</th>
						<th className="text-left p-2">Chủ đề</th>
						<th className="text-left p-2">Độ tin cậy</th>
						<th className="text-left p-2">Mô hình</th>
						<th className="text-left p-2">Thời gian</th>
					</tr>
				</thead>
				<tbody>
					{getCurrentPageData().map((item, index) => (
						<tr key={index} className="border-t">
							<td className="p-2">{item.feedback}</td>
							<td className="p-2">{item.sentiment}</td>
							<td className="p-2">{item.topic}</td>
							<td className="p-2">
								{formatConfidence(item.confidence)}
							</td>
							<td className="p-2 capitalize">
								{formatModel(item.model_type)}
							</td>
							<td className="p-2">
								{formatDateTime(item.timestamp)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{data.length > rowsPerPage && (
				<TablePagination
					currentPage={currentPage}
					totalPages={totalPages}
					rowsPerPage={rowsPerPage}
					totalItems={data.length}
					onPageChange={setCurrentPage}
				/>
			)}
		</div>
	);
};

export default FeedbackTable;
