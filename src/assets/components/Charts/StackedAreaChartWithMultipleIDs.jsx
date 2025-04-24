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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = info.chartIDs.map((chartID) =>
          fetchDataWithCodes([chartID])
        );

        const allRawData = await Promise.all(promises);
        const combinedRawData = allRawData.flat();
        const filteredData = combinedRawData.filter((el) => {
          if (el.chart_id === 10) {
            return el.name === 4;
          } else {
            return el.name_ge !== "სულ";
          }
        });

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

          <ResponsiveContainer height={info.height || 500}>
            <AreaChart data={data}>
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
                tickMargin={5}
              />
              <YAxis
                padding={{ top: 20 }}
                tickLine={false}
                tickMargin={10}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <Tooltip content={CustomTooltip} />
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
              {info.legend && <Legend content={CustomLegend} />}
              <Brush
                dataKey="year"
                height={20} // Reduce height by half
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

export default StackedAreaChartWithMultipleIDs;
