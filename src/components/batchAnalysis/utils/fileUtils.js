export const readTextFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = (e) => {
            reject(new Error("Đọc file thất bại"));
        };
        reader.readAsText(file);
    });
};

export const extractTextFromPDF = async (file) => {
    try {
        const pdfjsLib = window.pdfjsLib;

        if (!pdfjsLib) {
            throw new Error(
                "PDF.js chưa được tải. Vui lòng làm mới trang và thử lại."
            );
        }

        return new Promise(async (resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                try {
                    const typedArray = new Uint8Array(this.result);
                    const loadingTask = pdfjsLib.getDocument(typedArray);
                    const pdf = await loadingTask.promise;

                    let rawText = "";

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const textItems = textContent.items.map(
                            (item) => item.str
                        );
                        rawText += textItems.join("\n") + "\n";
                    }

                    // Ghép lại các dòng bị xuống hàng sai
                    let processed = rawText
                        .replace(/\r/g, "")
                        .replace(/-\s*\n/g, "- ") // giữ gạch đầu dòng liền với nội dung
                        // eslint-disable-next-line no-useless-escape
                        .replace(/\n(?=[^\-\•])/g, " ") // nối các dòng không bắt đầu bằng dấu gạch thành 1 câu
                        .replace(/\s{2,}/g, " "); // loại bỏ khoảng trắng dư

                    // Tách thành phản hồi bằng cách split theo các gạch đầu dòng
                    const feedbackList = processed
                        // eslint-disable-next-line no-useless-escape
                        .split(/\n?[\-\•]\s+/)
                        .map((s) => s.trim())
                        .filter((s) => s.length > 0);

                    resolve(feedbackList.join("\n")); // Ghép lại theo từng dòng
                } catch (err) {
                    reject(err);
                }
            };
            fileReader.onerror = reject;
            fileReader.readAsArrayBuffer(file);
        });
    } catch (err) {
        throw new Error(
            "Không thể tải thư viện PDF.js. Vui lòng thử lại sau."
        );
    }
};