import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const downloadPDF = (
  data,
  fileName,
  language,
  unit,
  year,
  isMonth,
  resource
) => {
  const isGeorgian = language === "ge";
  const doc = new jsPDF();

  if (resource) {
    const headers = [
      isGeorgian ? "დასახელება" : "Name",
      isGeorgian ? "სულ" : "Total",
      isGeorgian ? "ქალაქად" : "City",
      isGeorgian ? "სოფლად" : "Village",
    ];

    // Prepare the data for the table
    const tableData = data.map((item) => [
      isGeorgian ? item.name_ge : item.name_en,
      item.total.toFixed(1), // Format total
      item.city.toFixed(1), // Format city
      item.village.toFixed(1), // Format village
    ]);

    autoTable(doc, {
      head: [headers],
      body: tableData,
      theme: "grid", // Optional: you can change the theme
    });

    // Save the PDF
    doc.save(`${fileName} (${unit}).pdf`);

    return;
  }

  if (isMonth) {
    const yearHeader = isGeorgian ? "წელი" : "Year";
    const monthHeader = isGeorgian ? "თვე" : "Month";

    const headers = [
      monthHeader,
      ...Object.keys(data[0]).filter((key) => key !== "name"),
      yearHeader,
    ];

    // Prepare the data for the table
    const tableData = data.map((item) => [
      item.name,
      ...Object.keys(item)
        .filter((key) => key !== "name")
        .map((key) => item[key].toFixed(1)), // Format values to one decimal place
      year, // Add the year to each row
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: [headers],
      body: tableData,
      theme: "grid", // Optional: you can change the theme
    });

    // Save the PDF
    doc.save(`${fileName} (${unit}).pdf`);
    return;
  }

  if (year) {
    // Define headers based on language
    const headers = [
      isGeorgian ? "დასახელება" : "Name",
      isGeorgian ? "რაოდენობა" : "Value",
      isGeorgian ? "წელი" : "Year",
    ];

    // Prepare the data for the table
    const tableData = data.map((item) => [
      item.name,
      item.value.toFixed(1), // Format value to one decimal place
      year, // Add the year to each row
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: [headers],
      body: tableData,
      theme: "grid", // Optional: you can change the theme
    });

    // Save the PDF
    doc.save(`${fileName} (${unit}).pdf`);

    return;
  }

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
  doc.save(`${fileName} (${unit}).pdf`);
};

export default downloadPDF;
