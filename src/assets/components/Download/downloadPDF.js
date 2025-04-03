import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const downloadPDF = (data, fileName, language) => {
  const isGeorgian = language === "ge";

  const doc = new jsPDF();

  const modifiedData = data.map((item) => {
    const newItem = { ...item };
    newItem[isGeorgian ? "წელი" : "Year"] = item.year; // Use the year value directly without rounding or formatting
    delete newItem.year;

    Object.keys(newItem).forEach((key) => {
      if (
        typeof newItem[key] === "number" &&
        key !== (isGeorgian ? "წელი" : "Year")
      ) {
        newItem[key] = newItem[key].toFixed(1); // Only format non-year numerical values
      }
    });

    return newItem;
  });

  // Define headers
  const headers = [
    isGeorgian ? "წელი" : "Year",
    ...Object.keys(modifiedData[0]).filter(
      (key) => key !== (isGeorgian ? "წელი" : "Year")
    ),
  ];

  // Prepare data for jsPDF-autotable
  const tableData = modifiedData.map((item) =>
    headers.map((header) => item[header])
  );

  // Add the table to the PDF with centered alignment for numbers
  autoTable(doc, {
    head: [headers],
    body: tableData,
    styles: {
      halign: "center", // Horizontal alignment
      valign: "middle", // Vertical alignment
    },
  });

  // Save the PDF and trigger the download
  doc.save(`${fileName}.pdf`);
};

export default downloadPDF;
