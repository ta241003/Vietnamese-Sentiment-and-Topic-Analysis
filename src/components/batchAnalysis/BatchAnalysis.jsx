import React, { useState } from "react";
import { analyzeBatch } from "../../services/api";
import FileImport from "./FileImport";
import ModelTypeSelector from "../shared/ModelTypeSelector";
import LoadingButton from "../shared/LoadingButton";
import ErrorMessage from "../shared/ErrorMessage";
import ResultsTable from "./ResultsTable";

const BatchAnalysis = () => {
	const [texts, setTexts] = useState("");
	const [modelType, setModelType] = useState("ml");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [results, setResults] = useState(null);
	const [fileImportLoading, setFileImportLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const textArray = texts
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0);

		if (textArray.length === 0) {
			setError("Vui lòng nhập ít nhất một phản hồi");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const response = await analyzeBatch(textArray, {
				model_type: modelType,
			});

			if (response.success) {
				setResults(response);
			} else {
				setError(response.error || "Có lỗi xảy ra khi phân tích");
			}
		} catch (err) {
			setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container bg-white p-6 rounded-lg shadow-md mx-auto px-4 py-6 mt-5">
			<h2 className="text-xl font-semibold mb-4">Phân tích hàng loạt</h2>

			<ErrorMessage message={error} />

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<div className="flex justify-between items-center mb-2">
						<label
							htmlFor="batch-feedback"
							className="block text-gray-700 font-medium"
						>
							Danh sách phản hồi (mỗi dòng một phản hồi)
						</label>
						<FileImport
							onTextLoaded={setTexts}
							isLoading={isLoading}
							fileImportLoading={fileImportLoading}
							setFileImportLoading={setFileImportLoading}
							setError={setError}
						/>
					</div>

					{fileImportLoading && (
						<div className="text-blue-600 text-sm mb-2">
							Đang đọc file, vui lòng đợi...
						</div>
					)}

					<textarea
						id="batch-feedback"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows="8"
						placeholder="Nhập danh sách phản hồi, mỗi dòng một phản hồi..."
						value={texts}
						onChange={(e) => setTexts(e.target.value)}
						disabled={isLoading || fileImportLoading}
					></textarea>
				</div>

				<ModelTypeSelector
					modelType={modelType}
					setModelType={setModelType}
					isDisabled={isLoading}
				/>

				<LoadingButton
					type="submit"
					isLoading={isLoading}
					loadingText="Đang phân tích..."
					defaultText="Phân tích hàng loạt"
				/>
			</form>

			<ResultsTable results={results} />
		</div>
	);
};

export default BatchAnalysis;
