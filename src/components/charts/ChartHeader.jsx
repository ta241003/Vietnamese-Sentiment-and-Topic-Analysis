import React from "react";
import { TABS, MODELS } from "./constants";

const ChartHeader = ({
	activeTab,
	setActiveTab,
	selectedModel,
	setSelectedModel,
}) => {
	return (
		<div className="flex flex-wrap justify-between items-center mb-4">
			<div className="flex space-x-4 mb-2">
				{TABS.map((tab) => (
					<button
						key={tab}
						className={`px-4 py-2 rounded-md font-medium ${
							activeTab === tab
								? "bg-blue-500 text-white"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>
			<div className="flex items-center space-x-4 mb-2">
				<select
					className="border border-gray-300 rounded px-3 py-1"
					value={selectedModel}
					onChange={(e) => setSelectedModel(e.target.value)}
				>
					{MODELS.map((m) => (
						<option key={m} value={m}>
							Mô hình: {m}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default ChartHeader;
