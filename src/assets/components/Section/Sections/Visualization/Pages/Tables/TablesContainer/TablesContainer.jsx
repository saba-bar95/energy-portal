/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import "./TablesContainer.scss";
import TablesFilter from "./TablesFilter/TablesFilter";
import TableDownloadBtn from "./TableDownloadBtn/TableDownloadBtn";
import { useEffect, useState } from "react";
import { useRef } from "react";
import fetchTableData from "../../../../../../../fetchFunctions/fetchTableData";

const TablesContainer = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState(null);
  const [year, setYear] = useState(2024); // Track the selected year
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

  const filteredRows = name
    ? tableData.rows.filter((row) => row === name)
    : tableData.rows;

  const unitHeader = {
    ge: {
      header: "ფიზიკური ერთეული",
    },
    en: {
      header: "Physical unit",
    },
  };

  const unitsArray = [
    {
      name_en: "Electricity",
      name_ge: "ელექტროენერგია",
      unit_en: "GWh",
      unit_ge: "გვტ.სთ",
    },
    {
      name_en: "Natural Gas",
      name_ge: "ბუნებრივი გაზი",
      unit_en: "mil. m³",
      unit_ge: "მლნ. მ³",
    },
    {
      name_en: "Fuel Wood",
      name_ge: "შეშა",
      unit_en: "1000 m³",
      unit_ge: "1000 მ³",
    },
    {
      name_en: "Coal",
      name_ge: "ქვანახშირი",
      unit_en: "1000 tonnes",
      unit_ge: "1000 ტონა",
    },
    {
      name_en: "Oil and Petroleum Products",
      name_ge: "ნავთობი და ნავთობპროდუქტები",
      unit_en: "1000 tonnes",
      unit_ge: "1000 ტონა",
    },
    {
      name_en: "Other vegetal materials and residuals",
      name_ge: "სხვა მცენარეული მასალები და ნარჩენები",
      unit_en: "1000 tonnes",
      unit_ge: "1000 ტონა",
    },
    {
      name_en: "Other",
      name_ge: "სხვა",
      unit_en: "1000 tonnes",
      unit_ge: "1000 ტონა",
    },
  ];

  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && headerRef.current) {
        const scrollAmount = containerRef.current.scrollLeft;
        headerRef.current.style.transform = `translateX(${scrollAmount}px)`;
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="tables-container" ref={containerRef}>
        <div className="header" ref={headerRef}>
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
      <div className="units">
        <h3>{unitHeader[`${language}`].header}</h3>
        {unitsArray.map((unit, index) => (
          <p key={index}>
            <span>{unit[`name_${language}`]} </span>
            <span>{unit[`unit_${language}`]}</span>
          </p>
        ))}
      </div>
    </>
  );
};

export default TablesContainer;
