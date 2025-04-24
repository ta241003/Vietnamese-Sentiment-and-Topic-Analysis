import React, { useState } from "react";
import CompareForm from "./CompareForm";

const CompareModels = () => {
	const [results, setResults] = useState(null);

	const renderResult = (label, data) => (
		<div className="p-4 border rounded-lg bg-gray-50">
			<h3 className="text-lg font-semibold mb-2">{label}</h3>
			<p className="mb-2">
				<strong>Cảm xúc:</strong> {data.result.sentiment}
			</p>
			<p className="mb-2">
				<strong>Chủ đề:</strong> {data.result.topic}
			</p>
			<p>
				<strong>Độ tin cậy:</strong>{" "}
				{(
					((data.result.sentiment_confidence +
						data.result.topic_confidence) /
						2) *
					100
				).toFixed(1)}
				%
			</p>
		</div>
	);

	return (
		<div className="container bg-white p-6 rounded-lg shadow-md mt-6 mx-auto px-4 py-6">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">
				So sánh mô hình ML và DL
			</h2>

			<CompareForm onCompareComplete={setResults} />

			{results && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{renderResult("Machine Learning (ML)", results.ml)}
					{renderResult("Deep Learning (DL)", results.dl)}
				</div>
			)}
		</div>
	);
};

export default CompareModels;
