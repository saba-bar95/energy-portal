/* eslint-disable react/prop-types */
import { Sankey, Tooltip } from "recharts";
import { useParams } from "react-router-dom";
import Download from "../Download/Download";
import { useState, useEffect, useMemo } from "react";
import fetchSankeyData from "../../../../fetchSankeyData";
import YearDropdown from "../YearDropdown/YearDropdown";
import chartYears from "../../../../chartYears";
import { useRef } from "react";

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
    };

    const fillColor = colorMap[payload.name_en] || "#93c5fd"; // Fallback color

    const fontsize = chartWidth >= 600 ? 13 : 10;

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
          x={isRightNode ? x + width + 10 : x - 10} // Adjust text position based on node side
          y={y + height / 2} // Center text vertically
          textAnchor={isRightNode ? "start" : "end"} // Align text appropriately
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

  const { language } = useParams();
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
  const [year, setYear] = useState(2023);
  const [data, setData] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const chartContainerRef = useRef(null);

  const initialWidth =
    window.innerWidth >= 2301 && window.innerWidth <= 2700
      ? window.innerWidth - 650
      : window.innerWidth >= 1921 && window.innerWidth <= 2300
      ? window.innerWidth - 500
      : window.innerWidth >= 1600 && window.innerWidth <= 1920
      ? window.innerWidth - 440
      : window.innerWidth >= 1200 && window.innerWidth <= 1599
      ? window.innerWidth - 210
      : window.innerWidth >= 950 && window.innerWidth <= 1199
      ? window.innerWidth - 100
      : window.innerWidth >= 650 && window.innerWidth <= 949
      ? window.innerWidth - 50 // Adjust as needed
      : window.innerWidth >= 0 && window.innerWidth <= 649
      ? window.innerWidth - 30
      : window.innerWidth - 1000; // Default case

  const [chartWidth, setChartWidth] = useState(initialWidth);

  useEffect(() => {
    const updateWidth = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth - 50);
      }
    };

    // Set initial width when the component mounts
    updateWidth();

    // Update width dynamically on window resize
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
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
          const sourceIndex =
            entry.column_name === 201 ? getNodeIndex(entry.res_chart_id) : null;
          const targetIndex =
            entry.column_name === 202 ? getNodeIndex(entry.res_chart_id) : null;
          const middleIndex = getNodeIndex(entry.res_legend_code);

          if (sourceIndex !== null) {
            links.push({
              source: sourceIndex,
              target: middleIndex,
              value: entry.value,
            });
          } else if (targetIndex !== null) {
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
  }, [year, nodeMap]); // Runs effect when `year` changes

  return (
    <>
      {data && (
        <div className="main-chart sankey-1" ref={chartContainerRef}>
          <div className="header-container">
            <div className="info-wrapper">
              {info.svg}
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
                <h3>{info[`unit_${language}`]}</h3>
              </div>
            </div>
            <div className="year-wrapper">
              <YearDropdown years={chartYears} year={year} setYear={setYear} />
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
            width={window.innerWidth >= 800 ? chartWidth : window.innerWidth}
            // width={chartWidth}
            height={500}
            data={data}
            node={<MyCustomNode />}
            nodePadding={20}
            margin={{ right: 260, left: 80, top: 0, bottom: 0 }}
            link={<CustomizedLink />} // Use CustomizedLink here
          >
            <Tooltip content={<CustomTooltip />} />{" "}
          </Sankey>
        </div>
      )}
    </>
  );
};

export default SankeyChart;
