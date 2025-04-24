import React, { useState } from "react";
import { analyzeFeedback } from "../../services/api";
import ModelTypeSelector from "../shared/ModelTypeSelector";
import LoadingButton from "../shared/LoadingButton";
import ErrorMessage from "../shared/ErrorMessage";

const SingleAnalysis = () => {
	const [text, setText] = useState("");
	const [modelType, setModelType] = useState("ml");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!text.trim()) {
			setError("Vui lòng nhập nội dung phản hồi");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const response = await analyzeFeedback(text, {
				model_type: modelType,
			});

			if (response.success) {
				setResult(response);
				// Cuộn xuống kết quả
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: "smooth",
				});
			} else {
				setError(response.error || "Có lỗi xảy ra khi phân tích");
			}
		} catch (err) {
			setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
		} finally {
			setIsLoading(false);
		}
	};

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
		<div className="container mx-auto px-4 py-6">
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">
					Phân tích phản hồi
				</h2>

				<ErrorMessage message={error} />

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="feedback"
							className="block text-gray-700 font-medium mb-2"
						>
							Nội dung phản hồi
						</label>
						<textarea
							id="feedback"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							rows="5"
							placeholder="Nhập nội dung phản hồi của sinh viên tại đây..."
							value={text}
							onChange={(e) => setText(e.target.value)}
							disabled={isLoading}
						></textarea>
					</div>

					<ModelTypeSelector
						modelType={modelType}
						setModelType={setModelType}
						isDisabled={isLoading}
						name="singleModelType"
					/>

					<LoadingButton
						type="submit"
						isLoading={isLoading}
						loadingText="Đang phân tích..."
						defaultText="Phân tích"
					/>
				</form>
			</div>

			{result && (
				<div className="bg-white p-6 rounded-lg shadow-md mt-6">
					<h2 className="text-xl font-semibold mb-4">
						Kết quả phân tích
					</h2>

					<div className="mb-4">
						<h3 className="font-medium text-gray-700">Phản hồi:</h3>
						<p className="mt-1 p-3 bg-gray-50 rounded border border-gray-200">
							{result.text}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
							<h3 className="font-medium mb-2">Cảm xúc:</h3>
							<div className="flex items-center">
								<span
									className={`text-xl font-bold ${getSentimentClass(
										result.result.sentiment
									)}`}
								>
									{result.result.sentiment}
								</span>
								{result.result.sentiment_confidence && (
									<span className="ml-2 text-sm bg-white px-2 py-1 rounded-full border">
										Độ tin cậy:{" "}
										{formatConfidence(
											result.result.sentiment_confidence
										)}
									</span>
								)}
							</div>
						</div>

						<div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
							<h3 className="font-medium mb-2">Chủ đề:</h3>
							<div className="flex items-center">
								<span className="text-xl font-bold text-purple-600">
									{result.result.topic}
								</span>
								{result.result.topic_confidence && (
									<span className="ml-2 text-sm bg-white px-2 py-1 rounded-full border">
										Độ tin cậy:{" "}
										{formatConfidence(
											result.result.topic_confidence
										)}
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleAnalysis;
