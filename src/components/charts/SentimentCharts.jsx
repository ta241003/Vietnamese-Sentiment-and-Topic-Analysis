import React from "react";
import {
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { COLORS_ARRAY } from "./constants";

const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	outerRadius,
	percent,
	index,
	data,
}) => {
	const RADIAN = Math.PI / 180;
	const radius = outerRadius * 1.1;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill={data[index].color}
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${data[index].name}: ${(percent * 100).toFixed(2)}%`}
		</text>
	);
};

const SentimentCharts = ({ stats }) => {
	const sentimentData = Object.entries(stats.sentimentStats).map(
		([key, value]) => ({
			name:
				key === "positive"
					? "Tích cực"
					: key === "neutral"
					? "Trung tính"
					: "Tiêu cực",
			value,
			color: COLORS_ARRAY[
				key === "positive" ? 0 : key === "neutral" ? 1 : 2
			],
		})
	);

	const total = sentimentData.reduce((sum, d) => sum + d.value, 0);
	const sentimentPercentageData = sentimentData.map((item) => ({
		...item,
		value: parseFloat(((item.value / total) * 100).toFixed(2)),
	}));

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<h3 className="mb-2 text-gray-700">
					Biểu đồ hình tròn cảm xúc (%)
				</h3>
				<ResponsiveContainer width="100%" height={250}>
					<PieChart>
						<Pie
							data={sentimentPercentageData}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={80}
							fill="#8884d8"
							labelLine
							label={(props) =>
								renderCustomizedLabel({
									...props,
									data: sentimentPercentageData,
								})
							}
						>
							{sentimentPercentageData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={
										COLORS_ARRAY[
											index % COLORS_ARRAY.length
										]
									}
								/>
							))}
						</Pie>
						<Tooltip formatter={(value) => `${value}%`} />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div>
				<h3 className="mb-2 text-gray-700">
					Biểu đồ cột cảm xúc (số lượng)
				</h3>
				<ResponsiveContainer width="100%" height={250}>
					<BarChart data={sentimentData}>
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill="#60A5FA" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default SentimentCharts;
