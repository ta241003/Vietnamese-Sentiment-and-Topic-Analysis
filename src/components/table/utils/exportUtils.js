import { formatDateTime, formatConfidence, formatModel } from './formatUtils';

export const exportToExcel = (data) => {
    // Tạo tiêu đề
    let csvContent = "Phản hồi,Cảm xúc,Chủ đề,Độ tin cậy,Mô hình,Thời gian\n";

    // Thêm dữ liệu
    data.forEach((item) => {
        const feedback = `"${item.feedback.replace(/"/g, '""')}"`;
        const sentiment = `"${item.sentiment.replace(/"/g, '""')}"`;
        const topic = `"${item.topic.replace(/"/g, '""')}"`;
        const confidence = formatConfidence(item.confidence);
        const model = formatModel(item.model_type);
        const time = item.timestamp ? `"${formatDateTime(item.timestamp)}"` : `"N/A"`;

        csvContent += `${feedback},${sentiment},${topic},${confidence},${model},${time}\n`;
    });

    // Thêm BOM để Excel nhận diện UTF-8
    const BOM = "\uFEFF";
    const csvContentWithBOM = BOM + csvContent;

    // Tạo và tải file
    const blob = new Blob([csvContentWithBOM], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Tạo tên file có timestamp
    const date = new Date();
    const timestamp = `${date.getFullYear()}${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${date
            .getDate()
            .toString()
            .padStart(2, "0")}_${date
                .getHours()
                .toString()
                .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`;

    link.setAttribute("href", url);
    link.setAttribute("download", `feedback_data_${timestamp}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToPDF = (data) => {
    // Tạo cửa sổ mới
    const printWindow = window.open("", "_blank");

    // Tạo nội dung HTML
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Bảng phản hồi</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h2 { color: #333; }
        @media print {
          .no-print { display: none; }
          body { margin: 0; padding: 20px; }
        }
      </style>
    </head>
    <body>
      <h2>Bảng phản hồi</h2>
      <div class="no-print">
        <button onclick="window.print();return false;">In PDF</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Phản hồi</th>
            <th>Cảm xúc</th>
            <th>Chủ đề</th>
            <th>Độ tin cậy</th>
            <th>Mô hình</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
  `;

    // Thêm dữ liệu
    data.forEach((item) => {
        htmlContent += `
      <tr>
        <td>${item.feedback}</td>
        <td>${item.sentiment}</td>
        <td>${item.topic}</td>
        <td>${formatConfidence(item.confidence)}</td>
        <td>${formatModel(item.model_type)}</td>
        <td>${formatDateTime(item.timestamp)}</td>
      </tr>
    `;
    });

    // Đóng HTML
    htmlContent += `
        </tbody>
      </table>
      <div class="no-print">
        <p>Thời gian xuất: ${new Date().toLocaleString("vi-VN")}</p>
      </div>
    </body>
    </html>
  `;

    // Ghi và in
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => printWindow.print();
};