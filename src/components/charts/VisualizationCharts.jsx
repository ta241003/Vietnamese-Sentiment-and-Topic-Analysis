import React, { useEffect, useState } from "react";
import { getRecentAnalyses } from "../../services/api";
import ChartHeader from "./ChartHeader";
import SentimentCharts from "./SentimentCharts";
import TopicCharts from "./TopicCharts";
import TimeSeriesCharts from "./TimeSeriesCharts";
import ConfidenceChart from "./ConfidenceChart";
import { processTimeSeriesData, processTopicTimeSeries } from "./constants";

function VisualizationCharts() {
	const [recentData, setRecentData] = useState([]);
	// eslint-disable-next-line
	const [filteredData, setFilteredData] = useState([]);
	const [timeSeries, setTimeSeries] = useState([]);
	const [topicTimeSeries, setTopicTimeSeries] = useState([]);
	const [stats, setStats] = useState(null);
	const [activeTab, setActiveTab] = useState("Cảm xúc");
	const [selectedModel, setSelectedModel] = useState("Tất cả");

	useEffect(() => {
		getRecentAnalyses(200)
			.then((data) => setRecentData(data))
			.catch(console.error);
	}, []);

	useEffect(() => {
		if (!recentData.length) return;

		const data =
			selectedModel === "Tất cả"
				? recentData
				: recentData.filter(
						(item) => item.model_type === selectedModel
				  );

		setFilteredData(data);
		setTimeSeries(processTimeSeriesData(data));
		setTopicTimeSeries(processTopicTimeSeries(data));

		const sentimentCounts = { positive: 0, neutral: 0, negative: 0 };
		const topicCounts = {};

		data.forEach((item) => {
			sentimentCounts[item.sentiment] += 1;
			topicCounts[item.topic] = (topicCounts[item.topic] || 0) + 1;
		});

		const topTopics = Object.entries(topicCounts)
			.map(([name, count]) => ({
				name,
				count,
				percentage: Math.round((count / data.length) * 100),
			}))
			.sort((a, b) => b.count - a.count)
			.slice(0, 4);

		const avgConfidence =
			data.reduce((sum, d) => sum + d.confidence, 0) / data.length || 0;

		setStats({
			sentimentStats: sentimentCounts,
			topTopics,
			systemInfo: {
				averageConfidence: avgConfidence * 100,
				totalAnalyzed: data.length,
			},
		});
	}, [selectedModel, recentData]);

	const renderTabContent = () => {
		if (!stats) return null;

		switch (activeTab) {
			case "Cảm xúc":
				return <SentimentCharts stats={stats} />;
			case "Chủ đề":
				return <TopicCharts stats={stats} />;
			case "Theo thời gian":
				return (
					<TimeSeriesCharts
						timeSeries={timeSeries}
						topicTimeSeries={topicTimeSeries}
						stats={stats}
					/>
				);
			case "Độ tự tin":
				return <ConfidenceChart stats={stats} />;
			default:
				return null;
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mt-6">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Biểu đồ thống kê
			</h2>
			<ChartHeader
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				selectedModel={selectedModel}
				setSelectedModel={setSelectedModel}
			/>
			{renderTabContent()}
		</div>
	);
}

export default VisualizationCharts;
