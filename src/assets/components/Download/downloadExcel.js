import * as XLSX from "xlsx";

const downloadExcel = (data, fileName) => {
  console.log("sss");
  //   // Create a new workbook
  //   const workbook = XLSX.utils.book_new();

  //   // Convert your data to a worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(data);

  //   // Append the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  //   // Generate a binary string representation of the workbook
  //   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  //   // Create a Blob from the binary string
  //   const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  //   // Create a link element to trigger the download
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = `${fileName}.xlsx`; // Set the file name
  //   link.click(); // Trigger the download
};

export default downloadExcel;
