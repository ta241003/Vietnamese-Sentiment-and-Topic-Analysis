import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	AreaChart,
	Area,
	CartesianGrid,
} from "recharts";
import { COLORS } from "./constants";

const TimeSeriesCharts = ({ timeSeries, topicTimeSeries, stats }) => {
	return (
		<div className="grid grid-cols-1 gap-6">
			<div>
				<h3 className="mb-2 text-gray-700">
					Số lượng phản hồi cảm xúc theo thời gian
				</h3>
				<ResponsiveContainer width="100%" height={250}>
					<LineChart data={timeSeries}>
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="positive"
							stroke={COLORS.positive}
							name="Tích cực"
						/>
						<Line
							type="monotone"
							dataKey="negative"
							stroke={COLORS.negative}
							name="Tiêu cực"
						/>
						<Line
							type="monotone"
							dataKey="neutral"
							stroke={COLORS.neutral}
							name="Trung tính"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div>
				<h3 className="mb-2 text-gray-700">
					Số lượng phản hồi chủ đề theo thời gian
				</h3>
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart data={topicTimeSeries}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Legend />
						{stats.topTopics.map((topic, idx) => (
							<Area
								key={topic.name}
								type="monotone"
								dataKey={topic.name}
								stackId="1"
								stroke={`hsl(${idx * 60}, 70%, 50%)`}
								fill={`hsl(${idx * 60}, 90%, 80%)`}
								name={topic.name}
							/>
						))}
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default TimeSeriesCharts;
