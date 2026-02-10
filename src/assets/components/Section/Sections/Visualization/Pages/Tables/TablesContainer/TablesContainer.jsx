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

  const unitHeader = {
    ge: {
      header: "ფიზიკური ერთეული",
    },

    en: {
      header: "Physical unit",
    },
  };

  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchTableData(info.name, year);
        const filteredData = rawData.filter(
          (row) => row.source_table === info.sourceTables[unit],
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
      // Deduplicate rows by sub_code + name
      const rowsMap = new Map();
      data.forEach((item) => {
        const key = `${item.sub_code}_${item[`object_name_${language}`]}`;
        if (!rowsMap.has(key)) {
          rowsMap.set(key, {
            sub_code: item.sub_code,
            name: item[`object_name_${language}`],
          });
        }
      });
      let rows = Array.from(rowsMap.values());

      // --- NEW LOGIC: place _c rows below their _b parent ---
      function placeChildrenBelowParents(rows) {
        const childrenByPrefix = {};
        rows.forEach((row) => {
          if (!row.sub_code) return;
          const [prefix, suffix] = row.sub_code.split("_");
          if (suffix === "c") {
            if (!childrenByPrefix[prefix]) childrenByPrefix[prefix] = [];
            childrenByPrefix[prefix].push(row);
          }
        });

        const ordered = [];
        const seen = new Set();

        rows.forEach((row) => {
          const rowKey = `${row.sub_code}_${row.name}`;
          if (seen.has(rowKey)) return;

          ordered.push(row);
          seen.add(rowKey);

          if (row.sub_code) {
            const [prefix, suffix] = row.sub_code.split("_");
            if (suffix === "b" && childrenByPrefix[prefix]) {
              childrenByPrefix[prefix].forEach((child) => {
                const childKey = `${child.sub_code}_${child.name}`;
                if (!seen.has(childKey)) {
                  ordered.push(child);
                  seen.add(childKey);
                }
              });
            }
          }
        });

        return ordered;
      }

      rows = placeChildrenBelowParents(rows);

      // --- EXTRA STEP: move "Other"/"სხვა" _b row to the end ---
      const otherIndex = rows.findIndex(
        (row) =>
          row.sub_code?.endsWith("_b") && (row.name === "" || row.name === ""),
      );

      if (otherIndex !== -1) {
        const [otherRow] = rows.splice(otherIndex, 1);

        // also collect its children if any
        const otherPrefix = otherRow.sub_code.split("_")[0];
        const otherChildren = rows.filter(
          (r) =>
            r.sub_code?.startsWith(otherPrefix) && r.sub_code?.endsWith("_c"),
        );

        // remove children from current position
        rows = rows.filter(
          (r) =>
            !(
              r.sub_code?.startsWith(otherPrefix) && r.sub_code?.endsWith("_c")
            ),
        );

        // push parent + children at the end
        rows.push(otherRow, ...otherChildren);
      }

      // Columns
      let columns = [
        ...new Set(data.map((item) => item[`item_name_${language}`])),
      ];
      const totalColumnName = language === "ge" ? "სულ" : "Total";
      if (columns.includes(totalColumnName)) {
        columns = columns
          .filter((col) => col !== "Total" && col !== "სულ")
          .concat(totalColumnName);
      }

      // Values
      const values = {};
      rows.forEach((row) => {
        const rowKey = `${row.sub_code}_${row.name}`;
        values[rowKey] = {};
        columns.forEach((column) => {
          const item = data.find(
            (item) =>
              item.sub_code === row.sub_code &&
              item[`object_name_${language}`] === row.name &&
              item[`item_name_${language}`] === column,
          );
          values[rowKey][column] = item?.number || 0;
        });
      });

      setTableData({ rows, columns, values });
    }
  }, [data, language]);

  const filteredRows = name
    ? tableData.rows.filter((row) => row.name === name)
    : tableData.rows;

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
            {filteredRows.map((row) => {
              const rowKey = `${row.sub_code}_${row.name}`;

              return (
                <tr key={rowKey}>
                  <td
                    style={{
                      fontWeight: row.sub_code?.endsWith("b")
                        ? "bold"
                        : "normal",
                      padding: row.sub_code?.endsWith("b")
                        ? "10px"
                        : "10px 10px 10px 20px",
                    }}>
                    {row.name}
                  </td>
                  {tableData.columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        fontWeight: data
                          .find(
                            (item) =>
                              item.sub_code === row.sub_code &&
                              item[`object_name_${language}`] === row.name &&
                              item[`item_name_${language}`] === column,
                          )
                          ?.sub_code?.endsWith("b")
                          ? "bold"
                          : "normal",
                      }}>
                      {tableData.values[rowKey][column]}
                    </td>
                  ))}
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
