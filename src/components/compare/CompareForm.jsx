import React, { useState } from "react";
import { analyzeFeedback } from "../../services/api";

const CompareForm = ({ onCompareComplete }) => {
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);

	const handleCompare = async (e) => {
		e.preventDefault();
		if (!text.trim()) return;

		setLoading(true);
		try {
			const ml = await analyzeFeedback(text, { model_type: "ml" });
			const dl = await analyzeFeedback(text, { model_type: "dl" });
			onCompareComplete({ ml, dl });
		} catch (error) {
			alert("Lỗi khi so sánh mô hình.");
		}
		setLoading(false);
	};

	return (
		<form onSubmit={handleCompare} className="mb-6">
			<textarea
				className="w-full border rounded p-2 mb-2"
				rows="4"
				placeholder="Nhập phản hồi..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				required
			/>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				disabled={loading}
			>
				{loading ? "Đang so sánh..." : "So sánh"}
			</button>
		</form>
	);
};

export default CompareForm;
