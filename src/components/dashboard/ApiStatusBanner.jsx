import React from "react";

const ApiStatusBanner = ({ status, message }) => {
	return (
		<div
			className={`mb-6 p-3 rounded-md ${
				status === "online"
					? "bg-green-100 text-green-800"
					: status === "offline"
					? "bg-red-100 text-red-800"
					: "bg-blue-100 text-blue-800"
			}`}
		>
			<div className="flex items-center">
				<div
					className={`w-3 h-3 rounded-full mr-2 ${
						status === "online"
							? "bg-green-500"
							: status === "offline"
							? "bg-red-500"
							: "bg-blue-500 animate-pulse"
					}`}
				></div>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default ApiStatusBanner;
