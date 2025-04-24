import React from "react";

const TablePagination = ({
	currentPage,
	totalPages,
	rowsPerPage,
	totalItems,
	onPageChange,
}) => {
	const startItem = (currentPage - 1) * rowsPerPage + 1;
	const endItem = Math.min(currentPage * rowsPerPage, totalItems);

	return (
		<div className="flex justify-between items-center mt-4 text-gray-500">
			<div>
				Hiển thị {startItem} đến {endItem} trên tổng số {totalItems}{" "}
				phản hồi
			</div>
			<div className="flex gap-2">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`px-3 py-1 rounded ${
						currentPage === 1
							? "bg-gray-300 cursor-not-allowed"
							: "bg-blue-500 hover:bg-blue-600 text-white"
					}`}
				>
					Trước
				</button>
				<span className="px-3 py-1 bg-gray-200 rounded">
					{currentPage} / {totalPages}
				</span>
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`px-3 py-1 rounded ${
						currentPage === totalPages
							? "bg-gray-300 cursor-not-allowed"
							: "bg-blue-500 hover:bg-blue-600 text-white"
					}`}
				>
					Sau
				</button>
			</div>
		</div>
	);
};

export default TablePagination;
