/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_6 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 25;

  const text = {
    ka: {
      title: "საერთაშორისო საზღვაო და საჰაერო ბუნკერები",
      unit: "ერთეული",
    },
    en: {
      title: "International maritime and air bunkers",
      unit: "unit",
    },
  };

  const years = useMemo(
    () => [
      "y_2013",
      "y_2014",
      "y_2015",
      "y_2016",
      "y_2017",
      "y_2018",
      "y_2019",
      "y_2020",
      "y_2021",
      "y_2022",
      "y_2023",
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);

        const transformedData = years.map((year) => ({
          year: year.replace("y_", ""),
          imports: rawData[0][year],
          exports: rawData[1][year],
          name_ge: rawData[0].name_ge,
          name_en: rawData[0].name_en,
          export_name_ge: rawData[1].name_ge,
          export_name_en: rawData[1].name_en,
        }));

        setData(transformedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [years]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName =
              name === "imports"
                ? language === "en"
                  ? payload[index].payload.name_en
                  : payload[index].payload.name_ge
                : language === "en"
                ? payload[index].payload.export_name_en
                : payload[index].payload.export_name_ge;

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
      <div className="legend-container">
        {payload.map((entry, index) => {
          const displayName =
            entry.dataKey === "imports"
              ? language === "en"
                ? data[0].name_en
                : data[0].name_ge
              : language === "en"
              ? data[1].export_name_en
              : data[1].export_name_ge;

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
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.01562 20.4141C3.56215 20.4141 3.8153 21.9375 7.00771 21.9375C10.2379 21.9375 10.3916 20.4141 12.9997 20.4141C15.6235 20.4141 15.7432 21.9375 18.992 21.9375C22.2224 21.9375 22.376 20.4141 24.9844 20.4141C25.5453 20.4141 26 19.9594 26 19.3984C26 18.8375 25.5453 18.3828 24.9844 18.3828C24.3698 18.3828 23.8589 18.4407 23.4193 18.5333L25.1845 13.3261C25.4075 12.6681 24.9176 11.9844 24.2227 11.9844H12.9492V8.9375C12.9492 8.37657 12.4945 7.92188 11.9336 7.92188H10.918V4.875C10.918 4.31407 10.4633 3.85938 9.90234 3.85938H8.88672V1.01562C8.88672 0.454695 8.43202 0 7.87109 0C7.31016 0 6.85547 0.454695 6.85547 1.01562V3.85938H5.83984C5.27891 3.85938 4.82422 4.31407 4.82422 4.875V7.92188H3.80859C3.24766 7.92188 2.79297 8.37657 2.79297 8.9375V11.9844H1.77734C1.08266 11.9844 0.592363 12.6679 0.815496 13.3261L2.5807 18.5333C2.14109 18.4407 1.63028 18.3828 1.01562 18.3828C0.454695 18.3828 0 18.8375 0 19.3984C0 19.9594 0.454695 20.4141 1.01562 20.4141ZM6.85547 5.89062H8.88672V7.92188H6.85547V5.89062ZM4.82422 9.95312H10.918V11.9844H4.82422V9.95312ZM22.806 14.0156L20.9324 19.5428C20.4333 19.7594 19.8887 19.9062 18.992 19.9062C16.3683 19.9062 16.2486 18.3828 12.9997 18.3828C9.76955 18.3828 9.61589 19.9062 7.00771 19.9062C6.11117 19.9062 5.56664 19.7594 5.06766 19.5428L3.19399 14.0156H22.806ZM26 23.4609C26 24.0219 25.5453 24.4766 24.9844 24.4766C22.376 24.4766 22.2224 26 18.992 26C15.7432 26 15.6235 24.4766 12.9997 24.4766C10.3916 24.4766 10.2379 26 7.00771 26C3.74618 26 3.65488 24.4766 1.01562 24.4766C0.454695 24.4766 0 24.0219 0 23.4609C0 22.9 0.454695 22.4453 1.01562 22.4453C4.27715 22.4453 4.36846 23.9688 7.00771 23.9688C9.61589 23.9688 9.76955 22.4453 12.9997 22.4453C16.2486 22.4453 16.3683 23.9688 18.992 23.9688C21.6281 23.9688 21.7248 22.4453 24.9844 22.4453C25.5453 22.4453 26 22.9 26 23.4609Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>

          <svg width="0" height="0">
            <filter
              id="lineShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%">
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="10"
                floodColor="#30B0C7"
              />
            </filter>
          </svg>
          <svg width="0" height="0">
            <filter
              id="lineShadowRed"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%">
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="10"
                floodColor="#FB3B52"
              />
            </filter>
          </svg>

          <ResponsiveContainer height={420}>
            <LineChart data={data}>
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
              <Legend content={<CustomLegend />} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <Line
                dataKey="exports"
                stroke="#30B0C7"
                strokeWidth={3}
                dot={false}
                filter="url(#lineShadow)" // Apply shadow filter
              />
              <Line
                dataKey="imports"
                stroke="#FB3B52"
                strokeWidth={3}
                dot={false}
                filter="url(#lineShadowRed)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_6;
