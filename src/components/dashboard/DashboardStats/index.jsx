import React from "react";
import SentimentCard from "./SentimentCard";
import TopicsCard from "./TopicsCard";
import SystemInfoCard from "./SystemInfoCard";

const DashboardStats = ({ statistics, formatNumber, formatPercent }) => {
	const calculatePercentage = (value, total) => {
		if (total === 0) return 0;
		return Math.round((value / total) * 100);
	};

	const totalSentiments =
		statistics.sentimentStats.positive +
		statistics.sentimentStats.neutral +
		statistics.sentimentStats.negative;

	const positivePercent = calculatePercentage(
		statistics.sentimentStats.positive,
		totalSentiments
	);
	const neutralPercent = calculatePercentage(
		statistics.sentimentStats.neutral,
		totalSentiments
	);
	const negativePercent = calculatePercentage(
		statistics.sentimentStats.negative,
		totalSentiments
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
			<SentimentCard
				positivePercent={positivePercent}
				neutralPercent={neutralPercent}
				negativePercent={negativePercent}
			/>
			<TopicsCard topics={statistics.topTopics} />
			<SystemInfoCard
				systemInfo={statistics.systemInfo}
				formatNumber={formatNumber}
				formatPercent={formatPercent}
			/>
		</div>
	);
};

export default DashboardStats;
