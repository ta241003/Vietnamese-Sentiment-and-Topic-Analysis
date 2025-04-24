import React from "react";

const ResultsTable = ({ results }) => {
	const getSentimentClass = (sentiment) => {
		if (sentiment === "positive") return "bg-green-50";
		if (sentiment === "negative") return "bg-red-50";
		return "bg-yellow-50";
	};

	if (!results || !results.results) return null;

	const downloadCsv = () => {
		let csv = "Phản hồi,Cảm xúc,Chủ đề,Độ tin cậy\n";

		results.results.forEach((item) => {
			const sentiment = item.sentiment || "";
			const topic = item.topic || "";
			const confidence = item.confidence
				? (item.confidence * 100).toFixed(2) + "%"
				: "N/A";

			const escapedText = `"${item.feedback.replace(/"/g, '""')}"`;

			csv += `${escapedText},${sentiment},${topic},${confidence}\n`;
		});

		const BOM = "\uFEFF";
		const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });

		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.setAttribute("href", url);
		link.setAttribute("download", "phan-tich-phan-hoi.csv");
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="mt-8">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-medium">
					Kết quả phân tích ({results.count} phản hồi)
				</h3>
				<button
					onClick={downloadCsv}
					className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
				>
					Tải xuống CSV
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr className="bg-gray-100">
							<th className="py-2 px-4 border">STT</th>
							<th className="py-2 px-4 border">Phản hồi</th>
							<th className="py-2 px-4 border">Cảm xúc</th>
							<th className="py-2 px-4 border">Chủ đề</th>
							<th className="py-2 px-4 border">Độ tin cậy</th>
						</tr>
					</thead>
					<tbody>
						{results.results.map((item, index) => (
							<tr
								key={index}
								className={`${getSentimentClass(
									item.sentiment
								)} hover:bg-gray-50`}
							>
								<td className="py-2 px-4 border text-center">
									{index + 1}
								</td>
								<td className="py-2 px-4 border">
									{item.feedback}
								</td>
								<td className="py-2 px-4 border font-medium">
									{item.sentiment}
								</td>
								<td className="py-2 px-4 border font-medium">
									{item.topic}
								</td>
								<td className="py-2 px-4 border text-center">
									{item.confidence
										? `${(item.confidence * 100).toFixed(
												2
										  )}%`
										: "N/A"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ResultsTable;
