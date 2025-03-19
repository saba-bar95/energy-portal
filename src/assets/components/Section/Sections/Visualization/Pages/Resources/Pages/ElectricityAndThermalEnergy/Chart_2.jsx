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

const Chart_2 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 8;

  const text = {
    ka: {
      title: "საერთაშორისო ვაჭრობა",
      unit: "ათასი ტნე",
    },
    en: {
      title: "International trade",
      unit: "Thousand tons",
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
                d="M1.08461 20.3555L1.08464 20.3555L1.07781 20.3506C0.864041 20.1982 0.75 19.9731 0.75 19.7294C0.75 19.5016 0.860216 19.2696 1.08729 19.1013C1.08763 19.101 1.08797 19.1008 1.0883 19.1005L7.54445 14.3672L7.54495 14.3668C7.81748 14.1667 8.1882 14.1292 8.50361 14.2791C8.82032 14.4296 8.98851 14.7104 8.98851 15.005V16.4941V17.2441H9.73851H16.6254C17.1571 17.2441 17.521 17.6476 17.521 18.0582V21.3684C17.521 21.7832 17.1527 22.1825 16.6254 22.1825H9.73851H8.98851V22.9325V24.4323C8.98851 24.7269 8.82032 25.0078 8.50361 25.1583C8.1882 25.3082 7.81748 25.2706 7.54495 25.0705L7.54314 25.0692L1.08461 20.3555Z"
                stroke="#1E1E1E"
                strokeWidth="1.5"
              />
              <path
                d="M16.262 3.81732H17.012V3.06732V1.56753C17.012 1.27295 17.1802 0.992066 17.4969 0.84156C17.8123 0.69167 18.183 0.729184 18.4555 0.92934L18.4567 0.930186L24.9152 5.65452L24.9152 5.65457L24.9227 5.65991C25.1364 5.81229 25.2505 6.03745 25.2505 6.28116C25.2505 6.50875 25.1404 6.74059 24.9137 6.90886C24.9132 6.90925 24.9127 6.90964 24.9122 6.91003L18.4573 11.6209L18.4555 11.6223C18.183 11.8224 17.8123 11.8599 17.4969 11.71C17.1802 11.5595 17.012 11.2787 17.012 10.9841V9.495V8.745H16.262H9.37512C8.84339 8.745 8.47949 8.34153 8.47949 7.93093V4.62068C8.47949 4.2166 8.83652 3.81732 9.37512 3.81732H16.262Z"
                stroke="#1E1E1E"
                strokeWidth="1.5"
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

          <ResponsiveContainer height={380}>
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
                dataKey="imports"
                stroke="#30B0C7"
                strokeWidth={3}
                dot={false}
                filter="url(#lineShadow)" // Apply shadow filter
              />
              <Line
                dataKey="exports"
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

export default Chart_2;
