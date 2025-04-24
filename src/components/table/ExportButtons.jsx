import React from "react";
import { exportToExcel, exportToPDF } from "./utils/exportUtils";

const ExportButtons = ({ data }) => {
	return (
		<div className="space-x-2">
			<button
				onClick={() => exportToExcel(data)}
				className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
			>
				Xuất Excel
			</button>
			<button
				onClick={() => exportToPDF(data)}
				className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
			>
				Xuất PDF
			</button>
		</div>
	);
};

export default ExportButtons;
