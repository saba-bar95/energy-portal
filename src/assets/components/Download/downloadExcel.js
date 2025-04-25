import * as XLSX from "xlsx";

const downloadExcel = (
  data,
  fileName,
  language,
  unit,
  year,
  isMonth,
  resource,
  isFilter,
  isTreeMap,
  isSankey
) => {
  const isGeorgian = language === "ge";
  const workbook = XLSX.utils.book_new();

  if (isSankey) {
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
      {
        name_en: "Oil and Oil products",
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
      // Find corresponding Georgian name in nodeMap
      const nodeEntry = nodeMap.find((node) => node.name_en === name);
      return nodeEntry ? nodeEntry.name_ge : name; // Return Georgian name if available, else fallback to English
    };
    const headers = [
      isGeorgian ? "ნაკადი" : "Source",
      isGeorgian ? "კატეგორია" : "Category",
      isGeorgian ? "რაოდენობა" : "Value",
      isGeorgian ? "წელი" : "Year",
    ];

    // Format Data Rows with Georgian names if selected
    const sheetData = data.map((entry) => [
      isGeorgian ? getLocalizedName(entry.res_chart_id) : entry.res_chart_id,
      isGeorgian
        ? getLocalizedName(entry.res_legend_code)
        : entry.res_legend_code,
      entry.value,
      year,
    ]);

    sheetData.unshift(headers); // Insert headers

    // Convert JSON to Sheet
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const diagram = isGeorgian ? "დიაგრამა" : "diagram";
    XLSX.writeFile(workbook, `${fileName}'s ${diagram} (${unit}).xlsx`);
    return;
  }

  if (isTreeMap) {
    const yearHeader = isGeorgian ? "წელი" : "Year";
    const nameHeader = isGeorgian ? "დასახელება" : "Name";
    const valueHeader = isGeorgian ? "რაოდენობა" : "Value";

    // Ensure we are accessing the children array
    const worksheetData = [
      [nameHeader, valueHeader, yearHeader], // Column headers
      ...(data[0]?.children || []).map((item) => [
        item.name,
        `${item.value.toFixed(1)}%`,
        year,
      ]), // Extract correct data
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    return;
  }

  if (resource) {
    // Determine the column header based on the language
    const nameHeader = isGeorgian ? "name_ge" : "name_en";
    const header1 = isGeorgian ? "დასახელება" : "Name";

    // Define the row headers based on the selected language
    const rowHeaders = isGeorgian
      ? ["სულ", "ქალაქად", "სოფლად"] // Georgian translations
      : ["Total", "Urban", "Rural"]; // English

    // Prepare the data for the worksheet
    const worksheetData = [
      [header1, ...rowHeaders], // Column headers
      ...data.map((item) => [
        item[nameHeader],
        item.total, // Access total directly
        item.city, // Access city directly
        item.village, // Access village directly
      ]), // Map data to rows
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, `${fileName} (${unit}).xlsx`);
    return;
  }

  if (isMonth) {
    // Create the year header with the appropriate language
    const yearHeader = isGeorgian ? "წელი" : "Year";
    const monthHeader = isGeorgian ? "თვე" : "Month";

    // Extract headers dynamically from the first item
    const headers = Object.keys(data[0])
      .filter((key) => key !== "name")
      .map((key) => (isGeorgian ? key : key)); // Adjust this if you want to translate keys

    // Prepare the data for the worksheet
    const worksheetData = [
      [monthHeader, ...headers, yearHeader], // Column headers
      ...data.map((item) => [
        item.name,
        ...headers.map((header) => item[header]),
        year,
      ]), // Map data to rows
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate the Excel file and trigger the download
    XLSX.writeFile(workbook, `${fileName} (${unit}).xlsx`);
    return;
  }

  if (year) {
    // Create the year header with the appropriate language
    const yearHeader = isGeorgian ? "წელი" : "Year";
    const nameHeader = isGeorgian ? "დასახელება" : "Name";
    const valueHeader = isGeorgian ? "რაოდენობა" : "Value";

    // Prepare the data for the worksheet
    const worksheetData = [
      [nameHeader, valueHeader, yearHeader], // Column headers
      ...data.map((item) => [item.name, item.value, year]), // Map data to rows
    ];

    // Create a worksheet from the data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate the Excel file and trigger the download
    const fileNameWithUnit = unit
      ? `${fileName} (${unit}).xlsx`
      : `${fileName}.xlsx`;
    XLSX.writeFile(workbook, fileNameWithUnit);

    return;
  }

  // Modify the data based on the language
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
        if (isFilter) {
          newItem[key] = newItem[key].toFixed(2); // Only format non-year numerical values
        } else newItem[key] = newItem[key].toFixed(1); // Only format non-year numerical values
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
  link.download = `${fileName} (${unit}).xlsx`;
  link.click();
};

export default downloadExcel;
