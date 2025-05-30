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

const StackedAreaChart = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        let filteredData = rawData.filter(
          (item) =>
            item.name === info.chartName &&
            item.chart_id === info.chartID &&
            item.name_ge !== "სულ"
        );

        // Sort data: "Other"/"სხვა" last, others in ascending order
        filteredData = filteredData.sort((a, b) => {
          const aContainsOther =
            a.name_ge.includes("სხვა") || a.name_en.includes("Other");
          const bContainsOther =
            b.name_ge.includes("სხვა") || b.name_en.includes("Other");

          // Ensure "Other"/"სხვა" goes last
          if (aContainsOther) return 1;
          if (bContainsOther) return -1;

          // Sort remaining items in ascending order based on the latest year (2023)
          return b.y_2023 - a.y_2023;
        });

        // Extract unique data keys
        const newDataKeys = [];
        filteredData.forEach((el) => {
          const name = el[`name_${language}`];
          if (name && !newDataKeys.includes(name)) {
            newDataKeys.push(name);
          }
        });

        setDataKeys(newDataKeys);

        // Create stacked data grouped by years
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
                  {value.toFixed(1)}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="legend-container" style={info?.styles}>
        {payload.map((entry, index) => {
          const displayName = entry.dataKey; // Fallback to the original dataKey if no match
          return (
            <p key={`item-${index}`}>
              <span style={{ color: entry.color }}></span>
              {displayName}
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
              {info.legend && windowWidth >= 820 && (
                <Legend content={CustomLegend} />
              )}
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) => {
                return (
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
                );
              })}
              <Brush
                dataKey="year"
                height={windowWidth < 768 ? 10 : 20}
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

export default StackedAreaChart;
