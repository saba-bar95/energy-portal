/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import Download from "../Download/Download";
import fetchDataWithCodes from "../../../../fetchDataWithCodes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";

const VerticalStackedByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(info.chartID);

        // Filter Data and Modify specific items
        let filteredData = rawData
          .filter(
            (item) =>
              item.name === info.chartName &&
              item.chart_id === info.chartID &&
              item.name_ge !== "სულ"
          )
          .map((item) => ({
            ...item,
            name_ge:
              item.name_ge === "ქარის ელექტროსადგურები"
                ? "ქარი"
                : item.name_ge === "სხვა ბიტუმოვანი"
                ? "სხვა ბიტუმოვანი ქვანახშირი"
                : item.name_ge, // Default case
          }));

        // Sort filteredData so "Other" or "სხვა" always appears last, while others are sorted in ascending order
        filteredData = filteredData.sort((a, b) => {
          const aContainsOther =
            a.name_ge.includes("სხვა") || a.name_en.includes("Other");
          const bContainsOther =
            b.name_ge.includes("სხვა") || b.name_en.includes("Other");

          // Ensure "Other"/"სხვა" goes last
          if (aContainsOther) return 1;
          if (bContainsOther) return -1;

          // If neither contains "Other"/"სხვა", sort by value in ascending order for the latest year
          return (
            b[`y_${chartYears[chartYears.length - 1]}`] -
            a[`y_${chartYears[chartYears.length - 1]}`]
          );
        });

        if (info.chartName === 4 && info.chartID === 7) {
          filteredData = filteredData.sort((a, b) => {
            const aIsExactOther =
              a.name_ge.trim() === "სხვა" || a.name_en.trim() === "Other";
            const bIsExactOther =
              b.name_ge.trim() === "სხვა" || b.name_en.trim() === "Other";

            // Move exact "Other" or "სხვა" to the last position
            if (aIsExactOther) return 1;
            if (bIsExactOther) return -1;

            // If neither is the exact "Other"/"სხვა", sort by value in ascending order for the latest year
            return (
              b[`y_${chartYears[chartYears.length - 1]}`] -
              a[`y_${chartYears[chartYears.length - 1]}`]
            );
          });
        }

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

  const CustomLegend = ({ payload }) => {
    return (
      <div className="legend-container" style={info?.styles}>
        {payload.map((entry, index) => {
          const displayName = entry.dataKey; // Fallback to the original dataKey if no match
          return (
            <p key={`item-${index}`}>
              <span style={{ color: entry.color }}>■</span>
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
          <ResponsiveContainer height={420}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <Tooltip content={CustomTooltip} />
              <Legend content={CustomLegend} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />;
              {dataKeys.map((el, i) => {
                return (
                  <Bar
                    dataKey={el}
                    stackId="a"
                    key={el}
                    fill={info.colors[i]}
                    minPointSize={3}
                  />
                );
              })}
              <Brush
                dataKey="year"
                height={20} // Reduce height by half
                stroke="#115EFE"
                tickFormatter={() => ""} // Hide year labels
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default VerticalStackedByYears;
