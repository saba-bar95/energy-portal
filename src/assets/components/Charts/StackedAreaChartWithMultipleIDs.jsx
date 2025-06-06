/* eslint-disable react/prop-types */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Brush,
} from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";
import Download from "../Download/Download";
import fetchDataWithCodes from "../../../../fetchDataWithCodes";

const StackedAreaChartWithMultipleIDs = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hiddenBars, setHiddenBars] = useState(new Set());

  const toggleBarVisibility = (key) => {
    setHiddenBars((prev) => {
      const newSet = new Set(prev);

      // Ensure at least one bar remains visible
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
        const promises = info.chartIDs.map((chartID) =>
          fetchDataWithCodes([chartID])
        );

        const allRawData = await Promise.all(promises);
        const combinedRawData = allRawData.flat();

        let filteredData = combinedRawData.filter((el) => {
          if (el.chart_id === 10) {
            return el.name === 4;
          } else {
            return el.name_ge !== "სულ";
          }
        });

        // Sort data in ascending order based on y_2023
        filteredData.sort((a, b) => b.y_2023 - a.y_2023);

        const newDataKeys = [];

        filteredData.forEach((el) => {
          const name = el[`name_${language}`];
          if (name && !newDataKeys.includes(name)) {
            newDataKeys.push(name);
          }
        });

        setDataKeys(newDataKeys);

        const stackedData = chartYears.map((year) => {
          const yearData = { year: year };

          filteredData.forEach((item) => {
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
  }, [language, info.chartIDs, info.chartName]);

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
      {data.length > 0 && (
        <div className="main-chart" id={id}>
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

          <ResponsiveContainer height={windowWidth < 768 ? 400 : 500}>
            <AreaChart data={data}>
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
                tickMargin={5}
                tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
              />
              <YAxis
                padding={{ top: 20 }}
                tickLine={false}
                tickMargin={10}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
                tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
              />
              <Tooltip content={CustomTooltip} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) =>
                hiddenBars.has(el) ? null : (
                  <Area
                    dataKey={el}
                    key={el}
                    stroke={info.colors[i]}
                    fill={info.colors[i]}
                    fillOpacity={1}
                    strokeWidth={2}
                    dot={false}
                    stackId="1"
                    type="monotone"
                  />
                )
              )}
              {info.legend && windowWidth >= 820 && (
                <Legend content={CustomLegend} />
              )}
              <Brush
                dataKey="year"
                stroke="#115EFE"
                height={windowWidth < 768 ? 10 : 20}
                tickFormatter={() => ""} // Hide year labels
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default StackedAreaChartWithMultipleIDs;
