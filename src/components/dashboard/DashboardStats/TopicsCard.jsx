import React from "react";

const TopicsCard = ({ topics = [] }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4 text-gray-800">
				Chủ đề phổ biến
			</h2>
			<ol className="space-y-2">
				{topics.map((topic, index) => (
					<li
						key={index}
						className="flex justify-between items-center"
					>
						<span className="font-medium">{topic.name}</span>
						<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
							{topic.percentage}%
						</span>
					</li>
				))}
				{topics.length === 0 && (
					<li className="text-gray-500 text-center py-2">
						Chưa có dữ liệu chủ đề
					</li>
				)}
			</ol>
		</div>
	);
};

export default TopicsCard;
