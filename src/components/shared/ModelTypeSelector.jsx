import React from "react";

const ModelTypeSelector = ({
	modelType,
	setModelType,
	isDisabled,
	name = "modelType",
}) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 font-medium mb-2">
				Loại mô hình
			</label>
			<div className="flex space-x-4">
				<label className="inline-flex items-center">
					<input
						type="radio"
						name={name}
						value="ml"
						checked={modelType === "ml"}
						onChange={() => setModelType("ml")}
						className="form-radio h-5 w-5 text-blue-600"
						disabled={isDisabled}
					/>
					<span className="ml-2">Machine Learning</span>
				</label>
				<label className="inline-flex items-center">
					<input
						type="radio"
						name={name}
						value="dl"
						checked={modelType === "dl"}
						onChange={() => setModelType("dl")}
						className="form-radio h-5 w-5 text-blue-600"
						disabled={isDisabled}
					/>
					<span className="ml-2">Deep Learning</span>
				</label>
			</div>
		</div>
	);
};

export default ModelTypeSelector;
