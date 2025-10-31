/* eslint-disable react/prop-types */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Download from "../Download/Download";
import "./SingleAreaChart.scss";
import fetchDataIndicators from "../../fetchFunctions/fetchDataIndicators";

const SingleAreaChart = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataIndicators(info.chartName);

        // Extract available years dynamically from the data
        const yearKeys = Object.keys(rawData[0]).filter((key) =>
          key.startsWith("y_")
        );

        const extractedYears = yearKeys
          .map((key) => parseInt(key.replace("y_", "")))
          .filter((year) => !isNaN(year))
          .sort((a, b) => a - b);

        setAvailableYears(extractedYears);

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

        const stackedData = extractedYears.map((year) => {
          const yearData = {
            year: year,
          };

          rawData.forEach((item) => {
            yearData[item[`name_${language}`]] = item[`y_${year}`] || 0;
          });

          return yearData;
        });

        setData(stackedData);
      } catch (error) {
        console.log("Fetch error:", error);
        setAvailableYears([]);
        setData([]);
        setDataKeys([]);
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
                  {info.twoFixed ? value.toFixed(2) : value.toFixed(1)}
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
      {data.length > 0 && availableYears.length > 0 && (
        <div
          className="main-chart single-area-chart"
          style={{ paddingBottom: "20px" }}>
          <div className="header-container">
            {info.svg}
            <div className="info-wrapper">
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
                <h3>{info[`unit_${language}`]}</h3>
              </div>
            </div>
            <div className="wrapper-1">
              <div
                className="sdg-content"
                style={{ backgroundColor: info.sdgColor }}>
                {info.sdgText}
              </div>
              <Download
                data={data}
                filename={info[`title_${language}`]}
                unit={info[`unit_${language}`]}
                twoFixed={info.twoFixed}
              />
            </div>
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
            <AreaChart
              data={data}
              margin={
                windowWidth < 768
                  ? { top: 15, right: 5, left: -10, bottom: 5 }
                  : { top: 20, right: 30, left: 20, bottom: 5 }
              }>
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
                tick={{
                  style: {
                    fontSize:
                      windowWidth < 768 ? 12 : windowWidth < 1600 ? 14 : 16,
                  },
                }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30, bottom: 10 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
                tick={{
                  style: {
                    fontSize:
                      windowWidth < 768 ? 12 : windowWidth < 1600 ? 14 : 16,
                  },
                }}
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
              <Brush
                dataKey="year"
                height={windowWidth < 768 ? 10 : windowWidth < 1200 ? 15 : 20} // Reduce height by half
                stroke="#115EFE"
                tickFormatter={() => ""} // Hide year labels
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default SingleAreaChart;
