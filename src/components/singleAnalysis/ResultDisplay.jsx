import React from "react";

const ResultDisplay = ({ result }) => {
	if (!result) return null;

	const { text, result: analysisResult } = result;

	// Format confidence value as percentage
	const formatConfidence = (value) => {
		if (value === undefined || value === null) return "N/A";
		return `${(value * 100).toFixed(2)}%`;
	};

	// Determine sentiment class for styling
	const getSentimentClass = (sentiment) => {
		if (sentiment.toLowerCase().includes("tích cực"))
			return "text-green-600";
		if (sentiment.toLowerCase().includes("tiêu cực")) return "text-red-600";
		return "text-yellow-600"; // Neutral
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mt-6">
			<h2 className="text-xl font-semibold mb-4">Kết quả phân tích</h2>

			<div className="mb-4">
				<h3 className="font-medium text-gray-700">Phản hồi:</h3>
				<p className="mt-1 p-3 bg-gray-50 rounded border border-gray-200">
					{text}
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
					<h3 className="font-medium mb-2">Cảm xúc:</h3>
					<div className="flex items-center">
						<span
							className={`text-xl font-bold ${getSentimentClass(
								analysisResult.sentiment
							)}`}
						>
							{analysisResult.sentiment}
						</span>
						{analysisResult.sentiment_confidence && (
							<span className="ml-2 text-sm bg-white px-2 py-1 rounded-full border">
								Độ tin cậy:{" "}
								{formatConfidence(
									analysisResult.sentiment_confidence
								)}
							</span>
						)}
					</div>
				</div>

				<div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
					<h3 className="font-medium mb-2">Chủ đề:</h3>
					<div className="flex items-center">
						<span className="text-xl font-bold text-purple-600">
							{analysisResult.topic}
						</span>
						{analysisResult.topic_confidence && (
							<span className="ml-2 text-sm bg-white px-2 py-1 rounded-full border">
								Độ tin cậy:{" "}
								{formatConfidence(
									analysisResult.topic_confidence
								)}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultDisplay;
