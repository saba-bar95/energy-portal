/* eslint-disable react/prop-types */
import { Sankey, Tooltip } from "recharts";
import { useParams } from "react-router-dom";
import Download from "../Download/Download";
import { useState, useEffect, useMemo } from "react";
import YearDropdown from "../YearDropdown/YearDropdown";
import { useRef } from "react";
import fetchSankeyData from "../../fetchFunctions/fetchSankeyData";

const SankeyChart = ({ info }) => {
  const MyCustomNode = ({ x, y, width, height, payload }) => {
    const isRightNode = x > 100; // Adjust threshold based on your chart's layout

    const colorMap = {
      Coal: "#d83712",
      "Biofuel and waste": "#28ce46",
      "Oil and Oil products": "#41d9ff",
      "Natural gas": "#bedd0d",
      Exports: "#df1ac4",
      "Electricity and heat": "#c59100",
      Production: "#da1818",
      Imports: "#2415ec",
      Transport: "red",
      "Stock Changes": "red",
      Industry: "orange",
      Construction: "#0db3dd",
      "Commercial and public services": "#36b941",
      Residential: "#475f8b",
      "Agriculture, forestry and fishing": "#90409b",
      Other: "#6a2dda",
      "International Marine Bunkers": "#bdcabe",
      "International aviation bunkers": "#243325",
      Electricity: "#c690ebff", // Gold/yellow — stands out nicely from "Electricity and heat"
    };

    const fillColor = colorMap[payload.name_en] || "#93c5fd"; // Fallback color

    const fontsize =
      window.innerWidth < 768
        ? 10
        : window.innerWidth < 1200
        ? 11
        : window.innerWidth < 1500
        ? 12
        : 13;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke={fillColor}
          strokeWidth={3}
          fill={fillColor} // Dynamic fill color
        />
        <text
          x={isRightNode ? x + width * 5 : x - 10} // Adjust text position based on node side
          y={y + height / 2} // Center text vertically
          textAnchor={isRightNode ? "end" : "start"} // Align text appropriately
          fill="black"
          fontWeight="bold"
          fontSize={fontsize}>
          {language === "ge" ? payload.name_ge : payload.name_en}
        </text>
      </g>
    );
  };

  const CustomizedLink = (props) => {
    const { sourceX, targetX, sourceY, targetY, linkWidth, index, payload } =
      props;
    const isHovered = hoveredLinkIndex === index; // Check if this link is hovered

    const colorMap = {
      Coal: "#d83712",
      "Biofuel and waste": "#28ce46",
      "Oil and Oil products": "#41d9ff",
      "Natural gas": "#bedd0d",
      Exports: "#df1ac4",
      "Electricity and heat": "#c59100",
      Production: "#da1818",
      Imports: "#2415ec",
      Transport: "red",
    };

    const sourceColor = colorMap[payload.source.name_en] || "#df9494"; // Fallback color if not found
    const targetColor = colorMap[payload.target.name_en] || "#df9494"; // Fallback color if not found

    const strokeColor = `url(#gradient-${index})`;

    return (
      <>
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={sourceColor} />
            <stop offset="100%" stopColor={targetColor} />
          </linearGradient>
        </defs>
        <path
          d={`M${sourceX},${sourceY}C${(sourceX + targetX) / 2},${sourceY} ${
            (sourceX + targetX) / 2
          },${targetY} ${targetX},${targetY}`}
          fill="none"
          stroke={strokeColor} // Dynamic gradient color
          strokeOpacity={isHovered ? 0.8 : 0.5} // Default reduced opacity unless hovered
          strokeWidth={linkWidth} // Keep stroke width proportional to data
          onMouseEnter={() => setHoveredLinkIndex(index)} // Set hovered link
          onMouseLeave={() => setHoveredLinkIndex(null)} // Reset hover
        />
      </>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) {
      return null;
    }
    const { payload: linkPayload } = payload[0];

    const hoveredNode = linkPayload.payload;
    const isMiddleNode =
      hoveredNode.sourceLinks?.length > 0 &&
      hoveredNode.targetLinks?.length > 0;

    const sourceName =
      linkPayload?.payload?.source?.[`name_${language}`] ||
      linkPayload?.payload?.[`name_${language}`] ||
      "Unknown Source";
    const targetName =
      linkPayload?.payload?.target?.[`name_${language}`] || null;
    // const value = linkPayload?.payload?.value || 0;

    const value = isMiddleNode ? null : linkPayload?.payload?.value;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
        }}>
        <p
          style={{
            fontWeight: "bold",
            marginBottom: "5px",
            color: "#444",
          }}>
          <span style={{ color: "#0860ee", fontSize: "12px" }}>
            {sourceName}
          </span>
          {targetName && (
            <span style={{ color: "#d30808", fontSize: "12px" }}>
              {" "}
              → {targetName}
            </span>
          )}
          <span
            style={{
              fontSize: "13px",
              marginLeft: "5px",
            }}>
            {value && value.toFixed(1)}
          </span>
        </p>
      </div>
    );
  };

  const nodeMap = useMemo(
    () => [
      { name_en: "Production", name_ge: "წარმოება" },
      { name_en: "Imports", name_ge: "იმპორტი" },
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
    ],
    []
  );

  const minYear = 2013;

  const { language } = useParams();
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
  const [year, setYear] = useState(null); // Start as null – will be set to latest available
  const [availableYears, setAvailableYears] = useState([]); // Only years with data
  const [data, setData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current) {
        const newWidth = chartContainerRef.current.offsetWidth - 50;
        setChartWidth(newWidth > 0 ? newWidth : 800); // fallback minimum
      }
    };

    // Run immediately after mount
    updateWidth();

    const handleResize = () => {
      updateWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [data]); // Re-run when data loads (ensures container exists)

  // Effect to automatically detect and set the latest available year on mount
  useEffect(() => {
    if (availableYears.length > 0) return; // Only run once

    const currentYear = new Date().getFullYear(); // 2025

    const discoverYears = async () => {
      const yearsWithData = [];

      for (let y = currentYear; y >= minYear; y--) {
        try {
          const rawData = await fetchSankeyData(y);
          if (rawData && Array.isArray(rawData) && rawData.length > 0) {
            yearsWithData.push(y);
          }
          // If no data or error → skip this year (not included in dropdown)
        } catch (error) {
          console.warn(`${error.message} -  No data for year ${y}`);
          // Continue to older years
        }
      }

      if (yearsWithData.length > 0) {
        setAvailableYears(yearsWithData.sort((a, b) => a - b)); // Oldest first
        setYear(yearsWithData[yearsWithData.length - 1]); // Latest
        console.log(
          `Available years: ${yearsWithData.join(", ")}. Showing latest: ${
            yearsWithData[yearsWithData.length - 1]
          }`
        );
      } else {
        console.error("No data found for any year!");
        // Optional fallback
        setYear(minYear);
      }
    };

    discoverYears();
  }, [availableYears]);

  useEffect(() => {
    if (year === null || availableYears.length === 0) return;

    const fetchData = async () => {
      try {
        const rawData = await fetchSankeyData(year);

        setExcelData(rawData);

        const nodes = [];
        const links = [];
        const nodeIndex = new Map(); // Tracks unique nodes and their indices

        const getNodeIndex = (name) => {
          const normalizedName = name.toLowerCase().trim(); // Normalize names

          // Find matching entry from nodeMap
          const nodeEntry = nodeMap.find(
            (node) => node.name_en.toLowerCase().trim() === normalizedName
          );

          if (!nodeIndex.has(normalizedName)) {
            nodeIndex.set(normalizedName, nodes.length);
            nodes.push({
              name_en: name,
              name_ge: nodeEntry ? nodeEntry.name_ge : name, // Use mapped Georgian name if available
            });
          }

          return nodeIndex.get(normalizedName);
        };

        rawData.forEach((entry) => {
          let leftOrRightName = entry.res_chart_id?.trim(); // Production, Imports, Exports, Industry, etc.
          let fuelName = entry.res_legend_code?.trim(); // Electricity, Electricity and heat, Natural gas, etc.

          if (!leftOrRightName || !fuelName) return;

          // Get node indices
          const middleIndex = getNodeIndex(fuelName);

          if (entry.column_name === 201) {
            // Expected: Supply → Fuel (left → middle)
            const normalized = leftOrRightName.toLowerCase();

            // Normal valid supply nodes
            if (
              normalized === "production" ||
              normalized === "imports" ||
              normalized === "imports "
            ) {
              const sourceIndex = getNodeIndex(leftOrRightName);
              links.push({
                source: sourceIndex,
                target: middleIndex,
                value: entry.value,
              });
              return;
            }

            // Special fix: Misclassified electricity export — Exports wrongly used as source
            // Should be Electricity → Exports, so reverse it
            if (normalized === "exports" && fuelName === "Electricity") {
              const targetIndex = getNodeIndex(leftOrRightName); // "Exports"
              links.push({
                source: middleIndex, // Electricity →
                target: targetIndex, // → Exports
                value: entry.value,
              });
              console.log(
                `Fixed electricity export direction: Electricity → Exports (${entry.value})`
              );
              return;
            }

            // Anything else in column 201 is invalid
            console.warn(
              `Skipping invalid supply entry: "${leftOrRightName}" → "${fuelName}" (${entry.value})`
            );
          } else if (entry.column_name === 202) {
            // Expected: Fuel → Consumption (middle → right)
            const normalized = leftOrRightName.toLowerCase();

            // Special fix: Misclassified electricity import — Imports wrongly used as target
            // Should be Imports → Electricity, so reverse it
            if (
              (normalized === "imports" || normalized === "imports ") &&
              fuelName === "Electricity"
            ) {
              const sourceIndex = getNodeIndex(leftOrRightName); // "Imports "
              links.push({
                source: sourceIndex, // Imports →
                target: middleIndex, // → Electricity
                value: entry.value,
              });
              console.log(
                `Fixed electricity import direction: Imports → Electricity (${entry.value})`
              );
              return;
            }

            // Block real invalid cases (e.g. fuel → Production)
            if (
              normalized === "production" ||
              normalized === "imports" ||
              normalized === "imports "
            ) {
              console.warn(
                `Skipping invalid consumption target: "${fuelName}" → "${leftOrRightName}" (${entry.value})`
              );
              return;
            }

            // Normal valid consumption
            const targetIndex = getNodeIndex(leftOrRightName);
            links.push({
              source: middleIndex,
              target: targetIndex,
              value: entry.value,
            });
          }
        });

        setData({ nodes, links }); // Update state with final Sankey data
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [year, nodeMap, availableYears]); // Runs effect when `year` changes

  return (
    <>
      {data && year !== null && availableYears.length > 0 && (
        <div
          className="main-chart sankey-1"
          ref={chartContainerRef}
          style={info.styles}>
          <div className="header-container">
            <div
              className="info-wrapper"
              style={{
                flexDirection: window.innerWidth < 768 ? "column" : "row",
                gap: window.innerWidth < 768 ? "5px" : "",
              }}>
              {info.svg}
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
                <h3>{info[`unit_${language}`]}</h3>
              </div>
            </div>
            <div
              className="year-wrapper"
              style={{ flexDirection: "row", alignItems: "center" }}>
              <YearDropdown
                years={availableYears}
                year={year}
                setYear={setYear}
              />
              <Download
                data={excelData}
                filename={info[`title_${language}`]}
                isSankey={true}
                year={year}
                unit={info[`unit_${language}`]}
              />
            </div>
          </div>
          <Sankey
            width={chartWidth}
            height={500}
            data={data}
            node={<MyCustomNode />}
            nodePadding={20}
            margin={{ right: 30, left: 30 }}
            link={<CustomizedLink />} // Use CustomizedLink here
          >
            <Tooltip content={<CustomTooltip />} />
          </Sankey>
        </div>
      )}
    </>
  );
};

export default SankeyChart;
