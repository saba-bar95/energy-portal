/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Download from "../Download/Download";
import fetchMainDataIndicators from "../../../../fetchMainIndicators";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";
import YearDropdown from "../YearDropdown/YearDropdown";
import "./PieChart.scss";

const PieChartComponent = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2023);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchMainDataIndicators(info.chartID);
        const result = [];

        chartYears.forEach((year) => {
          const yearKey = `y_${year}`;
          const yearData = { year: `${year}` };

          info.names.forEach(({ code, name_en, name_ge }) => {
            const matchingRawData = rawData.find(
              (data) => data.legend_code === code
            );

            const nameKey = language === "en" ? name_en : name_ge;

            yearData[nameKey] = matchingRawData?.[yearKey] || 0;
          });

          result.push(yearData);
        });

        const currentYear = result.find((entry) => +entry.year === +year);

        const transformedData = Object.keys(currentYear)
          .filter((key) => key !== "year")
          .map((key, index) => ({
            name: key,
            value: currentYear[key], // Include only non-zero values
            color: info.colors[index] || "#8884d8",
          }))
          .filter((entry) => entry.value > 0);

        setData(transformedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [language, info.chartID, info.names, info.colors, year]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "black",
          padding: "10px",
          borderRadius: "5px",
        }}>
        <div className="tooltip-container">
          {payload.map(({ payload: { name, value, fill } }, index) => (
            <p key={`item-${index}`} className="text">
              <span
                style={{ color: fill, fontWeight: "bold" }}
                className="before-span"></span>
              {name} :
              <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                {value.toFixed(1)} %
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="legend-container" style={info?.styles}>
        {payload.map((entry, index) => {
          const { name, value } = entry.payload; // Extract name and value from payload
          return (
            <p
              key={`item-${index}`}
              style={{
                fontWeight: 700,
                width: "100%",
                borderBottom: "1px solid #E9E9E9",
                paddingBottom: "10px",
              }}>
              <span
                style={{
                  color: entry.color,
                  width: "5px",
                  height: "16px",
                  borderRadius: "25px",
                }}></span>
              {name}
              <span
                style={{
                  fontFamily: "FiraGORegular",
                  flex: 1,
                  justifyContent: "end",
                  display: "flex",
                  backgroundColor: "inherit",
                }}>
                {value.toFixed(1)}% {/* Display name followed by value */}
              </span>
            </p>
          );
        })}
      </div>
    );
  };

  const renderCustomLabel = ({ x, y, value, index, cx, cy }) => {
    const color = data[index]?.color || "#000"; // Dynamically use the color from the dataset
    const RADIAN = Math.PI / 180;
    const radius = 15; // Adjust radius to control distance
    const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI); // Calculate angle

    // Offset the position further away from the pie edges
    const xOffset = x + Math.cos(angle * RADIAN) * radius;
    const yOffset = y + Math.sin(angle * RADIAN) * radius;

    return (
      <text
        x={xOffset} // Adjusted horizontal position
        y={yOffset} // Adjusted vertical position
        fill={color} // Use the dynamic color
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontFamily: "FiraGOMedium", fontSize: "14px" }} // Custom styles
      >
        {`${value.toFixed(1)}%`} {/* Display the value */}
      </text>
    );
  };

  const classN = `main-chart pie-chart pie-chart-${info.chartID}`;

  return (
    <>
      {data.length > 0 && (
        <div
          className={classN}
          style={{
            padding: "20px",
          }}>
          <div className="header-container" style={{ padding: 0 }}>
            {info.svg}
            <div className="info-wrapper">
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
              </div>
            </div>
            <div className="year-wrapper">
              <Download
                data={data}
                filename={info[`title_${language}`]}
                isPieChart={true}
                year={year}
              />
            </div>
          </div>
          <YearDropdown years={chartYears} year={year} setYear={setYear} />
          <ResponsiveContainer height={520}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55} // Optional: Adjust for a donut chart
                outerRadius={90}
                paddingAngle={5}
                animationDuration={1} // Disable animations
                fill="#8884d8"
                label={renderCustomLabel} // Apply custom label here
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend content={CustomLegend} />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default PieChartComponent;
