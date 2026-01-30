/* eslint-disable react/prop-types */
import "./TableDownloadBtn.scss";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

const TableDownloadBtn = ({ data, title }) => {
  const { language } = useParams();

  const text = {
    en: {
      header: "Download",
    },
    ge: {
      header: "გადმოწერა",
    },
  };

  const handleDownload = () => {
    // no need to pass data again
    if (!data?.rows || !data?.columns || !data?.values) return;

    const workbook = XLSX.utils.book_new();

    const nameHeader = language === "ge" ? "დასახელება" : "Name";

    // Build rows for Excel
    const worksheetData = [
      // Header row
      [nameHeader, ...data.columns],

      // Data rows
      ...data.rows.map((rowObj) => {
        const key = `${rowObj.sub_code}_${rowObj.name}`;

        return [
          rowObj.name, // ← display only the Georgian/visible name

          ...data.columns.map((col) => {
            const value = data.values[key]?.[col];
            return value ?? "-"; // null/undefined → "-"
          }),
        ];
      }),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Optional: auto-size columns (better readability)
    worksheet["!cols"] = worksheetData[0].map(() => ({ wch: 18 }));

    XLSX.utils.book_append_sheet(workbook, worksheet, "Energy Balance");

    // Use title or fallback
    const filename = title ? `${title}.xlsx` : "Energy_Balance.xlsx";
    XLSX.writeFile(workbook, filename);
  };

  const svg = () => {
    return (
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 11.3907V12.2903C1 13.009 1.28548 13.6982 1.79365 14.2064C2.30181 14.7145 2.99103 15 3.70968 15H12.7419C13.4606 15 14.1498 14.7145 14.658 14.2064C15.1661 13.6982 15.4516 13.009 15.4516 12.2903V11.3871M8.22581 1V10.9355M8.22581 10.9355L11.3871 7.77419M8.22581 10.9355L5.06452 7.77419"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div
      className="table-download-btn"
      onClick={() => {
        handleDownload(data);
      }}>
      <p>{svg()}</p>
      <p>{text[`${language}`].header} </p>
    </div>
  );
};

export default TableDownloadBtn;
