import * as XLSX from "xlsx";

const downloadExcel = (data, fileName, language) => {
  const workbook = XLSX.utils.book_new();

  // Modify the data based on the language
  const isGeorgian = language === "ge";
  const modifiedData = data.map((item) => {
    const newItem = { ...item };

    // Change "year" to "წელი" or "Year" based on language
    newItem[isGeorgian ? "წელი" : "Year"] = Math.round(newItem.year);
    delete newItem.year;

    // Capitalize other keys for English
    if (!isGeorgian) {
      Object.keys(newItem).forEach((key) => {
        if (typeof newItem[key] === "string") {
          newItem[key] =
            newItem[key].charAt(0).toUpperCase() + newItem[key].slice(1);
        }
      });
    }

    // Format numeric values to one decimal place
    Object.keys(newItem).forEach((key) => {
      if (
        typeof newItem[key] === "number" &&
        key !== (isGeorgian ? "წელი" : "Year")
      ) {
        newItem[key] = newItem[key].toFixed(1);
      }
    });

    return newItem;
  });

  // Define headers based on language
  const headers = [
    isGeorgian ? "წელი" : "Year",
    ...Object.keys(modifiedData[0]).filter(
      (key) => key !== (isGeorgian ? "წელი" : "Year")
    ),
  ];

  // Convert modified data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(modifiedData, { header: headers });
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate a binary string representation of the workbook
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob from the binary string and trigger the download
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  link.click();
};

export default downloadExcel;
