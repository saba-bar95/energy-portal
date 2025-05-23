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
import fetchDataWithCodes from "../../../../fetchDataWithCodes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chartYears from "../../../../chartYears";

const MultipleLineChartByYears = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);

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

        let newDataKeys = []; // Start with an empty array

        filteredData.forEach((el) => {
          const name = el[`name_${language}`];
          if (name && !newDataKeys.includes(name)) {
            newDataKeys.push(name); // Push to newDataKeys if it exists and is unique
          }
        });

        // **Sort newDataKeys to ensure "Other"/"სხვა" is last**
        newDataKeys.sort((a, b) => {
          const aContainsOther = a.includes("Other") || a.includes("სხვა");
          const bContainsOther = b.includes("Other") || b.includes("სხვა");

          if (aContainsOther) return 1;
          if (bContainsOther) return -1;
          return 0; // Maintain original order otherwise
        });

        // Update the state with the sorted array
        setDataKeys(newDataKeys);

        const stackedData = chartYears.map((year) => {
          const yearData = {
            year: year,
          };

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

          <ResponsiveContainer height={630}>
            <LineChart
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
                padding={{ top: 30, bottom: 10 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <Tooltip content={CustomTooltip} />
              <Legend content={CustomLegend} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) => {
                return (
                  <Line
                    // type="monotone"
                    dataKey={el}
                    key={el}
                    stroke={info.colors[i]}
                    strokeWidth={2}
                    dot={false} // Set to true if you want to show dots on the line
                  />
                );
              })}
              <Brush
                dataKey="year"
                height={20} // Reduce height by half
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

export default MultipleLineChartByYears;
