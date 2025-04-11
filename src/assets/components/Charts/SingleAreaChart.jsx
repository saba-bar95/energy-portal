/* eslint-disable react/prop-types */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";
import Download from "../Download/Download";
import fetchDataIndicators from "../../../../fetchDataIndicators";

const SingleAreaChart = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataIndicators(info.chartName);

        const newDataKeys = []; // Start with the current dataKeys

        rawData.forEach((el) => {
          const name = el[`name_${language}`];
          if (name && !newDataKeys.includes(name)) {
            // Check if name exists and is not already in newDataKeys
            newDataKeys.push(name); // Push to newDataKeys if it exists and is unique
          }
        });

        // Update the state with the new array
        setDataKeys(newDataKeys);

        const stackedData = chartYears.map((year) => {
          const yearData = {
            year: year,
          };

          rawData.forEach((item) => {
            yearData[item[`name_${language}`]] = item[`y_${year}`];
          });

          return yearData;
        });

        setData(stackedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [language, info.chartName]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName = name;
            return (
              <p key={`item-${index}`} className="text">
                <span style={{ color }} className="before-span">
                  ■
                </span>
                {displayName} :
                <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                  {value.toFixed(1)}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const getGradientStopColors = (linearGradientString) => {
    const regex = /rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)/g;
    const colors = linearGradientString.match(regex) || [];
    return colors;
  };

  const stopColors = getGradientStopColors(info.linear);
  const gradientId = `areaGradient-${info.chartName}`; // Unique gradient ID

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart">
          <div className="header-container">
            {info.svg}
            <div className="info-wrapper">
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
                <h3>{info[`unit_${language}`]}</h3>
              </div>
            </div>
            <Download
              data={data}
              filename={info[`title_${language}`]}
              unit={info[`unit_${language}`]}
            />
          </div>

          <svg width="0" height="0">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                {stopColors.map((color, index) => (
                  <stop
                    key={`stop-${index}`}
                    offset={index === 0 ? "0%" : "100%"}
                    stopColor={color}
                  />
                ))}
              </linearGradient>
            </defs>
          </svg>

          <ResponsiveContainer height={420} className="vertical-stacked">
            <AreaChart data={data}>
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30, bottom: 10 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <Tooltip content={CustomTooltip} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) => {
                return (
                  <Area
                    type="monotone"
                    dataKey={el}
                    key={el}
                    stroke={info.colors[i]}
                    fillOpacity={1}
                    strokeWidth={2}
                    dot={false}
                    fill={`url(#${gradientId}`}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default SingleAreaChart;
