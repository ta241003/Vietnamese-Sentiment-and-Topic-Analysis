import React from "react";
import {
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const TopicCharts = ({ stats }) => {
	const radarData = stats.topTopics.map((topic) => ({
		topic: topic.name,
		percentage: topic.percentage,
	}));

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<h3 className="mb-2 text-gray-700">Biểu đồ radar chủ đề (%)</h3>
				<ResponsiveContainer width="100%" height={250}>
					<RadarChart outerRadius={90} data={radarData}>
						<PolarGrid />
						<PolarAngleAxis dataKey="topic" />
						<PolarRadiusAxis unit="%" />
						<Radar
							name="Phần trăm"
							dataKey="percentage"
							stroke="#8884d8"
							fill="#8884d8"
							fillOpacity={0.6}
						/>
						<Tooltip formatter={(value) => `${value}%`} />
						<Legend />
					</RadarChart>
				</ResponsiveContainer>
			</div>
			<div>
				<h3 className="mb-2 text-gray-700">
					Biểu đồ cột chủ đề (số lượng)
				</h3>
				<ResponsiveContainer width="100%" height={250}>
					<BarChart data={stats.topTopics}>
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="count" fill="#6366F1" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default TopicCharts;
