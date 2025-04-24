import React from "react";

const SentimentCard = ({
	positivePercent,
	neutralPercent,
	negativePercent,
}) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">
				Tổng quan cảm xúc
			</h2>
			<div className="flex justify-around">
				<div className="text-center">
					<div className="text-green-500 text-3xl font-bold">
						{positivePercent}%
					</div>
					<div className="text-sm text-gray-600">Tích cực</div>
				</div>
				<div className="text-center">
					<div className="text-yellow-500 text-3xl font-bold">
						{neutralPercent}%
					</div>
					<div className="text-sm text-gray-600">Trung tính</div>
				</div>
				<div className="text-center">
					<div className="text-red-500 text-3xl font-bold">
						{negativePercent}%
					</div>
					<div className="text-sm text-gray-600">Tiêu cực</div>
				</div>
			</div>
		</div>
	);
};

export default SentimentCard;
