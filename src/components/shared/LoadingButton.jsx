import React from "react";

const LoadingButton = ({
	isLoading,
	loadingText = "Đang xử lý...",
	defaultText = "Xử lý",
	className = "",
	...props
}) => {
	return (
		<button
			{...props}
			className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
				isLoading ? "opacity-70 cursor-not-allowed" : ""
			} ${className}`}
			disabled={isLoading}
		>
			{isLoading ? loadingText : defaultText}
		</button>
	);
};

export default LoadingButton;
