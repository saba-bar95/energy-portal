import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import georgianFont from "../../fonts/NotoSansGeorgian_ExtraCondensed-Bold.ttf";

const downloadPDF = (
  data,
  fileName,
  language,
  unit,
  year,
  isMonth,
  resource,
  isFilter,
  isTreeMap,
  isSankey,
  isConditioning,
  isFiltered,
  twoFixed
) => {
  const isGeorgian = language === "ge";

  const doc = new jsPDF();

  if (isGeorgian) {
    doc.addFont(georgianFont, "NotoSansGeorgian", "normal");
    doc.addFont(georgianFont, "NotoSansGeorgian", "bold");
    doc.setFont("NotoSansGeorgian");
  }

  const fontStyles = {
    font: isGeorgian ? "NotoSansGeorgian" : "helvetica",
    fontSize: 10,
  };

  if (isFiltered) {
    const yearHeader = isGeorgian ? "წელი" : "Year";

    // Language-specific "Not available" text
    const notAvailableText = isGeorgian
      ? "ჯერ არაა ხელმისაწვდომი"
      : "Not available yet";

    const formattedYear = (year) => {
      const [yearValue, suffix] = year.split("_");
      return suffix === "140"
        ? `${yearValue} (I-VI)`
        : `${yearValue} (VII-XII)`;
    };

    // Helper function to safely format numeric values
    const safeFormatValue = (value) => {
      if (value === null || value === undefined || value === notAvailableText) {
        return notAvailableText;
      }
      const numValue = Number(value);
      return isNaN(numValue) ? notAvailableText : numValue.toFixed(2);
    };

    // Modify data to format year and safely format numbers
    const modifiedData = data.map((entry) => ({
      [yearHeader]: formattedYear(entry.year),
      ...Object.fromEntries(
        Object.entries(entry)
          .filter(([key]) => key !== "year")
          .map(([key, value]) => [key, safeFormatValue(value)])
      ),
    }));

    // Extract table headers
    const headers = [
      yearHeader,
      ...Object.keys(modifiedData[0]).filter((key) => key !== yearHeader),
    ];

    // Convert modified data into row format for autoTable
    const tableData = modifiedData.map((row) =>
      headers.map((header) => row[header] || notAvailableText)
    );

    // Generate the table in the PDF
    autoTable(doc, {
      head: [headers],
      body: tableData,
      theme: "grid",
      styles: fontStyles,
    });

    // Save the PDF file
    doc.save(`${fileName}.pdf`);
    return;
  }

  if (isConditioning) {
    const headers = ["", ...data.map((entry) => entry.category)]; // First empty column for row headers

    // Extract row headers & values dynamically
    const rowHeaders = Object.keys(data[0]).filter((key) => key !== "category");

    // Format table rows
    const tableData = rowHeaders.map((rowHeader) => [
      rowHeader, // First column (row headers)
      ...data.map((entry) => Number(entry[rowHeader]).toFixed(1)), // Round numbers to 1 decimal place
    ]);

    // Generate Table in PDF with autoTable
    autoTable(doc, {
      head: [headers], // Add headers as first row
      body: tableData, // Add formatted row data
      theme: "grid", // Styled table format
      styles: {
        ...fontStyles,
        fontSize: 10,
      },
      headStyles: { fillColor: [41, 128, 185] }, // Header background color
    });

    // Save PDF
    doc.save(`${fileName}_${year}.pdf`);
    return;
  }

  if (isSankey) {
    const headers = [
      isGeorgian ? "ნაკადი" : "Source",
      isGeorgian ? "კატეგორია" : "Category",
      isGeorgian ? "რაოდენობა" : "Value",
      isGeorgian ? "წელი" : "Year",
    ];

    // Mapping English names to Georgian if language is Georgian
    const nodeMap = [
      { name_en: "Production", name_ge: "წარმოება" },
      { name_en: "Imports ", name_ge: "იმპორტი" },
      { name_en: "Electricity", name_ge: "ელექტროენერგია" },
      {
        name_en: "Electricity and heat",
        name_ge: "ელექტროენერგია და თბოენერგია",
      },
      { name_en: "Natural gas", name_ge: "ბუნებრივი გაზი" },
      { name_en: "Coal", name_ge: "ქვანახშირი" },
      {
        name_en: "Oil and oil products",
        name_ge: "ნავთობი და ნავთობპროდუქტები",
      },
      { name_en: "Biofuel and waste", name_ge: "ბიოსაწვავი და ნარჩენები" },
      { name_en: "Exports", name_ge: "ექსპორტი" },
      {
        name_en: "International Marine Bunkers",
        name_ge: "საერთაშორისო საზღვაო ბუნკერები",
      },
      {
        name_en: "International aviation bunkers",
        name_ge: "საერთაშორისო საჰაერო ბუნკერები",
      },
      { name_en: "Stock Changes", name_ge: "მარაგების ცვლილება" },
      { name_en: "Industry", name_ge: "მრეწველობა" },
      { name_en: "Construction", name_ge: "მშენებლობა" },
      { name_en: "Transport", name_ge: "ტრანსპორტი" },
      {
        name_en: "Commercial and public services",
        name_ge: "კერძო და სახელმწიფო მომსახურება",
      },
      { name_en: "Residential", name_ge: "შინამეურნეობები" },
      {
        name_en: "Agriculture, forestry and fishing",
        name_ge: "სოფლის, სატყეო და თევზის მეურნეობა",
      },
      { name_en: "Other", name_ge: "სხვა" },
    ];

    const getLocalizedName = (name) => {
      const nodeEntry = nodeMap.find((node) => node.name_en === name);
      return nodeEntry ? nodeEntry.name_ge : name;
    };

    // Format Data Rows
    const tableData = data.map((entry) => [
      isGeorgian ? getLocalizedName(entry.res_chart_id) : entry.res_chart_id,
      isGeorgian
        ? getLocalizedName(entry.res_legend_code)
        : entry.res_legend_code,
      entry.value,
      year,
    ]);

    // Generate Table in PDF using correct `autoTable` function
    autoTable(doc, {
      head: [headers],
      body: tableData,
      theme: "grid", // Styled table
      styles: {
        ...fontStyles,
        fontSize: 10,
      },
      headStyles: { fillColor: [41, 128, 185] }, // Header color
      columnStyles: {
        0: { cellWidth: 50 }, // Source column width
        1: { cellWidth: 60 }, // Category column width
        2: { cellWidth: 30 }, // Value column width
        3: { cellWidth: 20 }, // Year column width
      },

      didDrawCell: (data) => {
        const doc = data.doc;
        const cellText = Array.isArray(data.cell.text)
          ? data.cell.text.join(" ")
          : data.cell.text;
        const maxWidth = data.cell.width;

        if (
          typeof cellText === "string" &&
          doc.getStringUnitWidth(cellText) * 10 > maxWidth
        ) {
          doc.setFontSize(8); // Reduce font size if text is too long
        }
      },
    });

    const diagram = isGeorgian ? "დიაგრამა" : "diagram";
    doc.save(`${fileName}'s ${diagram} (${unit}).pdf`);
    return;
  }

  if (isTreeMap) {
    // Define headers based on language
    const headers = [
      isGeorgian ? "დასახელება" : "Name",
      isGeorgian ? "რაოდენობა" : "Value",
      isGeorgian ? "წელი" : "Year",
    ];

    // Ensure we are accessing the `children` array correctly
    const tableData = (data[0]?.children || []).map((item) => [
      item.name,
      `${item.value.toFixed(1)}%`, // Format value to one decimal place and add "%"
      year,
    ]);

    // Add the table to the PDF
    autoTable(doc, {
      head: [headers],
      body: tableData,
      theme: "grid", // Optional: Change the theme
      styles: fontStyles,
    });

    // Save the PDF
    doc.save(`${fileName}.pdf`);
  }

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
      styles: fontStyles,
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
      styles: fontStyles,
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
      styles: fontStyles,
    });

    const fileNameWithUnit = unit
      ? `${fileName} (${unit}).pdf`
      : `${fileName}.pdf`;
    // Save the PDF
    doc.save(fileNameWithUnit);

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
        if (isFilter) {
          newItem[key] = newItem[key].toFixed(2); // Only format non-year numerical values
        } else
          newItem[key] = twoFixed
            ? newItem[key].toFixed(2)
            : newItem[key].toFixed(1); // Only
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
      ...fontStyles,
      halign: "center", // Horizontal alignment
      valign: "middle", // Vertical alignment
    },
  });

  // Save the PDF and trigger the download
  doc.save(`${fileName} (${unit}).pdf`);
};

export default downloadPDF;
