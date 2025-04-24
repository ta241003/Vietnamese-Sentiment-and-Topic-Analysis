import React, { useRef } from "react";
import { readTextFile, extractTextFromPDF } from "./utils/fileUtils";

const FileImport = ({
	onTextLoaded,
	isLoading,
	fileImportLoading,
	setFileImportLoading,
	setError,
}) => {
	const fileInputRef = useRef(null);
	const pdfInputRef = useRef(null);

	const handleTxtFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setFileImportLoading(true);
		setError("");

		try {
			const text = await readTextFile(file);
			onTextLoaded(text);
		} catch (err) {
			setError(`Không thể đọc file: ${err.message}`);
		} finally {
			setFileImportLoading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		}
	};

	const handlePdfFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setFileImportLoading(true);
		setError("");

		try {
			const text = await extractTextFromPDF(file);
			onTextLoaded(text);
		} catch (err) {
			setError(`Không thể đọc file PDF: ${err.message}`);
		} finally {
			setFileImportLoading(false);
			if (pdfInputRef.current) {
				pdfInputRef.current.value = "";
			}
		}
	};

	const triggerFileInput = (inputRef) => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<div className="flex space-x-2">
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleTxtFileUpload}
				accept=".txt"
				className="hidden"
			/>
			<input
				type="file"
				ref={pdfInputRef}
				onChange={handlePdfFileUpload}
				accept=".pdf"
				className="hidden"
			/>
			<button
				type="button"
				onClick={() => triggerFileInput(fileInputRef)}
				className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm"
				disabled={isLoading || fileImportLoading}
			>
				Import TXT
			</button>
			<button
				type="button"
				onClick={() => triggerFileInput(pdfInputRef)}
				className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm"
				disabled={isLoading || fileImportLoading}
			>
				Import PDF
			</button>
		</div>
	);
};

export default FileImport;
