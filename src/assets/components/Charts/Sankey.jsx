/* eslint-disable react/prop-types */
import { Sankey, Tooltip } from "recharts";
import SankeyData from "./SankeyData";
import { useParams } from "react-router-dom";
import Download from "../Download/Download";
import { useState } from "react";
import fetchSankeyData from "../../../../fetchSankeyData";

const SankeyChart = ({ info }) => {
  const { language } = useParams();
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);

  const MyCustomNode = ({ x, y, width, height, payload }) => {
    const isRightNode = x > 500; // Adjust threshold based on your chart's layout

    // Color mapping similar to CustomizedLink
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
      Construction: "yellow",
      "Commercial and public services": "#36b941",
      Residential: "#475f8b",
      "Agriculture, forestry and fishing": "#90409b",
      Other: "#6a2dda",
      "International Marine Bunkers": "#bdcabe",
      "International aviation bunkers": "#88a08a",
    };

    const fillColor = colorMap[payload.name_en] || "#93c5fd"; // Fallback color

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          // stroke={isRightNode ? "#3b82f6" : "#6fa2f5"} // Optional stroke color variation
          fill={fillColor} // Dynamic fill color
          strokeWidth={1}
        />
        <text
          x={isRightNode ? x + width + 10 : x - 10} // Adjust text position based on node side
          y={y + height / 2} // Center text vertically
          textAnchor={isRightNode ? "start" : "end"} // Align text appropriately
          fill="black"
          fontWeight="bold"
          fontSize={13}>
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

    const sourceName =
      linkPayload?.payload?.source?.[`name_${language}`] ||
      linkPayload?.payload?.[`name_${language}`] ||
      "Unknown Source";

    const targetName =
      linkPayload?.payload?.target?.[`name_${language}`] || null;
    const value = linkPayload?.payload?.value || 0;

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
            {value.toFixed(2)}
          </span>
        </p>
      </div>
    );
  };

  return (
    <div
      className="main-chart"
      style={{
        width: "max-content",
        margin: "auto",
      }}>
      <div className="header-container">
        {info.svg}
        <div className="info-wrapper">
          <div className="text-wrapper">
            <h2>{info[`title_${language}`]}</h2>
            <h3>{info[`unit_${language}`]}</h3>
          </div>
        </div>
        <Download
          data={SankeyData}
          filename={info[`title_${language}`]}
          unit={info[`unit_${language}`]}
        />
      </div>
      <Sankey
        width={1200}
        height={500}
        data={SankeyData}
        node={<MyCustomNode />}
        nodePadding={20}
        margin={{ right: 170, left: 50, top: 20, bottom: 20 }}
        link={<CustomizedLink />} // Use CustomizedLink here
      >
        <Tooltip content={<CustomTooltip />} />{" "}
      </Sankey>
    </div>
  );
};

export default SankeyChart;
