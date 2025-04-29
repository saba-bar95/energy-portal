/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import "./TablesContainer.scss";
import TablesFilter from "./TablesFilter/TablesFilter";
import TableDownloadBtn from "./TableDownloadBtn/TableDownloadBtn";
import { useEffect, useState } from "react";
import fetchTableData from "../../../../../../../../../fetchTableData";

const TablesContainer = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2023); // Track the selected year
  const [unit, setUnit] = useState(0); // Track the selected unit
  const [name, setName] = useState(null); // Track the selected name

  const [tableData, setTableData] = useState({
    rows: [],
    columns: [],
    values: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchTableData(info.name, year);

        const filteredData = rawData.filter(
          (row) => row.source_table === info.sourceTables[unit]
        );

        setData(filteredData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [year, info.sourceTables, info.name, unit]);

  useEffect(() => {
    if (data) {
      const rows = [
        ...new Set(data.map((item) => item[`object_name_${language}`])),
      ]; // Unique row headers
      let columns = [
        ...new Set(data.map((item) => item[`item_name_${language}`])),
      ]; // Unique column headers

      // Move "Total" to the last position
      // Determine correct column label based on language
      const totalColumnName = language === "ge" ? "სულ" : "Total";

      // Move only the correct "Total" or "სულ" to the last position
      if (columns.includes(totalColumnName)) {
        columns = columns
          .filter((col) => col !== "Total" && col !== "სულ")
          .concat(totalColumnName);
      }

      const values = {};

      rows.forEach((row) => {
        values[row] = {};
        columns.forEach((column) => {
          const item = data.find(
            (item) =>
              item[`object_name_${language}`] === row &&
              item[`item_name_${language}`] === column
          );
          values[row][column] = item?.number || 0; // Ensure there's a default value
        });
      });

      setTableData({ rows, columns, values });
    }
  }, [data, language]);

  // Filter rows based on the selected name
  // const filteredRows = name
  //   ? tableData.rows.filter((row) => {
  //       const selectedItem = data.find(
  //         (el) => el[`object_name_${language}`] === name
  //       );
  //       if (!selectedItem) return false; // Ensure selectedItem exists

  //       const subCodePrefix = selectedItem.sub_code.split("_")[0]; // Extract prefix (e.g., "15")

  //       return data.some(
  //         (item) =>
  //           item[`object_name_${language}`] === row &&
  //           item.sub_code.startsWith(subCodePrefix) // Match items that have the same prefix
  //       );
  //     })
  //   : tableData.rows;

  const filteredRows = name
    ? tableData.rows.filter((row) => row === name)
    : tableData.rows;

  return (
    <div className="tables-container">
      <div className="header">
        <h1 style={{ textTransform: "initial" }}>
          {info.text[`${language}`].header}
        </h1>
        <div className="wrapper">
          <TablesFilter
            year={year}
            setYear={setYear}
            unit={unit}
            setUnit={setUnit}
            name={name}
            names={tableData.rows}
            // names={tableData.rows.filter((row) =>
            //   data.some(
            //     (item) =>
            //       item[`object_name_${language}`] === row &&
            //       item.sub_code.endsWith("b")
            //   )
            // )}
            setName={setName}
          />
          <TableDownloadBtn
            data={tableData}
            title={info.text[`${language}`].header}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {tableData.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, rowIndex) => {
            const rowItem = data.find(
              (item) => item[`object_name_${language}`] === row
            );

            return (
              <tr key={rowIndex}>
                <td
                  style={{
                    fontWeight: rowItem?.sub_code?.endsWith("b")
                      ? "bold"
                      : "normal",

                    padding: rowItem?.sub_code?.endsWith("b")
                      ? "10px"
                      : "10px 10px 10px 20px",
                  }}>
                  {row}
                </td>
                {tableData.columns.map((column, colIndex) => {
                  const item = data.find(
                    (item) =>
                      item[`object_name_${language}`] === row &&
                      item[`item_name_${language}`] === column
                  );

                  return (
                    <td
                      key={colIndex}
                      style={{
                        fontWeight: item?.sub_code?.endsWith("b")
                          ? "bold"
                          : "normal",
                      }}>
                      {tableData.values[row][column]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablesContainer;
