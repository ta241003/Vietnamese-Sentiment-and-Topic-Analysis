import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const ConfidenceChart = ({ stats }) => {
	const confidenceData = [
		{
			name: "Độ tin cậy trung bình",
			value: stats.systemInfo.averageConfidence,
		},
	];

	return (
		<div>
			<h3 className="mb-2 text-gray-700">Độ tin cậy trung bình (%)</h3>
			<ResponsiveContainer width="100%" height={250}>
				<BarChart data={confidenceData}>
					<XAxis dataKey="name" />
					<YAxis domain={[0, 100]} />
					<Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
					<Legend />
					<Bar
						dataKey="value"
						fill="#60A5FA"
						name="Phần trăm"
						label={{
							position: "top",
							formatter: (value) => `${value.toFixed(1)}%`,
						}}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ConfidenceChart;
