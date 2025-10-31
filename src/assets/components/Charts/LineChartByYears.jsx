/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import Download from "../Download/Download";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchDataWithCodes from "../../fetchFunctions/fetchDataWithCodes";

const LineChartByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hiddenBars, setHiddenBars] = useState(new Set()); // Track hidden bars

  const toggleBarVisibility = (key) => {
    setHiddenBars((prev) => {
      const newSet = new Set(prev);

      // If it's the last remaining visible bar, prevent hiding
      if (newSet.size === dataKeys.length - 1 && !newSet.has(key)) {
        return prev;
      }

      // Toggle visibility
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }

      return newSet;
    });
  };

  useEffect(() => {
    setHiddenBars(new Set()); // Reset hiddenBars when language changes
  }, [language]);

  const id = language === "en" ? `${info.id}-${language}` : info.id;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(info.chartID);

        const filteredData = rawData.filter(
          (item) =>
            item.name === info.chartName &&
            item.chart_id === info.chartID &&
            item.name_ge !== "სულ"
        );

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

        filteredData.forEach((el) => {
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

          filteredData.forEach((item) => {
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
  }, [language, info.chartID, info.chartName]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName = name;
            return (
              <p key={`item-${index}`} className="text">
                <span style={{ color }} className="before-span"></span>
                {displayName} :
                <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                  {value ? value.toFixed(1) : 0}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const CustomLegend = () => {
    return (
      <div className="legend-container" style={info?.styles}>
        {dataKeys.map((key, index) => {
          const isActive = !hiddenBars.has(key);
          return (
            <p
              key={index}
              onClick={() => toggleBarVisibility(key)}
              style={{
                cursor: "pointer",
                opacity: isActive ? 1 : 0.3,
              }}>
              <span style={{ color: info.colors[index] }}>■</span>
              {key}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {data.length > 0 && availableYears.length > 0 && (
        <div className="main-chart" id={id} style={info.styles}>
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

          {info.colors.map((el, i) => {
            return (
              <svg width="0" height="0" key={i}>
                <filter
                  id={`line-shadow-${el}`}
                  y="-20%"
                  width="140%"
                  height="140%">
                  <feDropShadow
                    dx="0"
                    dy="12"
                    stdDeviation="10"
                    floodColor={el}
                  />
                </filter>
              </svg>
            );
          })}

          <ResponsiveContainer height={windowWidth < 768 ? 380 : 420}>
            <LineChart
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
              <Legend content={CustomLegend} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) =>
                hiddenBars.has(el) ? null : (
                  <Line
                    dataKey={el}
                    key={el}
                    stroke={info.colors[i]}
                    strokeWidth={3}
                    dot={false} // Set to true if you want to show dots on the line
                    filter={`url(#line-shadow-${info.colors[i]})`}
                  />
                )
              )}

              <Brush
                dataKey="year"
                height={windowWidth < 768 ? 10 : windowWidth < 1200 ? 15 : 20} // Reduce height by half
                stroke="#115EFE"
                tickFormatter={() => ""} // Hide year labels
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default LineChartByYears;
