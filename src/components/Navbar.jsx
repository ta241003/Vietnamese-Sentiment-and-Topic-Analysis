import React from "react";

const Navbar = ({ onNavChange, activeTab }) => {
	return (
		<nav className="bg-blue-600 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">
					Phân tích Phản hồi của Sinh viên Việt Nam
				</h1>
				<div className="flex space-x-4">
					<button
						onClick={() => onNavChange("dashboard")}
						className={`hover:text-blue-200 ${
							activeTab === "dashboard"
								? "text-white font-bold border-b-2 border-white"
								: "text-blue-100"
						}`}
					>
						Tổng quan
					</button>
					<button
						onClick={() => onNavChange("single")}
						className={`hover:text-blue-200 ${
							activeTab === "single"
								? "text-white font-bold border-b-2 border-white"
								: "text-blue-100"
						}`}
					>
						Phân tích đơn lẻ
					</button>
					<button
						onClick={() => onNavChange("batch")}
						className={`hover:text-blue-200 ${
							activeTab === "batch"
								? "text-white font-bold border-b-2 border-white"
								: "text-blue-100"
						}`}
					>
						Phân tích hàng loạt
					</button>
					<button
						onClick={() => onNavChange("compare")}
						className={`hover:text-blue-200 ${
							activeTab === "compare"
								? "text-white font-bold border-b-2 border-white"
								: "text-blue-100"
						}`}
					>
						So sánh mô hình
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
