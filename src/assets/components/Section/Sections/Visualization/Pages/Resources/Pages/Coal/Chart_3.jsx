/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
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

const Chart_3 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 17;
  const chartName = 3;

  const text = {
    ka: {
      title: "ქვანახშირის იმპორტი სახეების მიხედვით",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Coal imports by type",
      unit: "ktoe",
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
        const filteredData = rawData.filter(
          (item) =>
            item.name === chartName &&
            item.chart_id === chartID &&
            item.name_ge !== "სულ"
        );

        const stackedData = years.map((year) => {
          const yearData = {
            year: year.replace("y_", ""),
          };

          filteredData.forEach((item) => {
            yearData[item.name_ge] = item[year] || 0; // Set to 0 if undefined
            yearData[item.name_ge + "_en"] = item.name_en; // Store English name
          });

          return yearData;
        });

        setData(stackedData);
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
            // Determine the appropriate name based on the language
            const displayName =
              language === "en" ? payload[index].payload[`${name}_en`] : name;

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
            language === "ka"
              ? entry.dataKey
              : entry.dataKey === "ანტრაციტი"
              ? "Anthracite"
              : entry.dataKey === "საღუმელე კოქსი"
              ? "Coke oven coke"
              : entry.dataKey === "სხვა ბიტუმოვანი"
              ? "Other bituminous coal"
              : entry.dataKey; // Fallback to the original dataKey if no match
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
        <div className="main-chart chart-3">
          <div className="header-container">
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.581 17.9144C14.4422 17.9145 14.3048 17.8872 14.1765 17.8342C14.0483 17.7811 13.9318 17.7033 13.8336 17.6052C13.7355 17.507 13.6577 17.3905 13.6046 17.2623C13.5516 17.134 13.5243 16.9966 13.5244 16.8578V1.05657C13.5244 0.776351 13.6357 0.507608 13.8339 0.309463C14.032 0.111317 14.3008 0 14.581 0C14.8612 0 15.13 0.111317 15.3281 0.309463C15.5262 0.507608 15.6376 0.776351 15.6376 1.05657V16.8578C15.6376 17.138 15.5262 17.4068 15.3281 17.6049C15.13 17.8031 14.8612 17.9144 14.581 17.9144Z"
                fill="black"
              />
              <path
                d="M14.581 18.3893C14.2259 18.3898 13.8741 18.3202 13.546 18.1844C13.2179 18.0487 12.9199 17.8494 12.669 17.5981L6.96265 11.8918C6.76459 11.6937 6.65332 11.4251 6.65332 11.145C6.65332 10.8649 6.76459 10.5963 6.96265 10.3982C7.16071 10.2001 7.42933 10.0889 7.70943 10.0889C7.98953 10.0889 8.25816 10.2001 8.45622 10.3982L14.1626 16.1045C14.2175 16.1595 14.2827 16.2031 14.3545 16.2328C14.4263 16.2625 14.5032 16.2778 14.581 16.2778C14.6587 16.2778 14.7356 16.2625 14.8074 16.2328C14.8792 16.2031 14.9444 16.1595 14.9994 16.1045L20.7057 10.3982C20.9049 10.2057 21.1718 10.0991 21.4488 10.1014C21.7258 10.1038 21.9909 10.2148 22.1868 10.4106C22.3828 10.6065 22.494 10.8715 22.4964 11.1485C22.4989 11.4255 22.3925 11.6924 22.2001 11.8918L16.4929 17.5981C16.242 17.8493 15.9439 18.0486 15.6158 18.1843C15.2877 18.3201 14.936 18.3897 14.581 18.3893Z"
                fill="black"
              />
              <path
                d="M26.3602 28H2.80118C2.05854 27.9991 1.34657 27.7037 0.821436 27.1785C0.296306 26.6534 0.000894754 25.9414 0 25.1988V17.8129C0 17.5327 0.111317 17.264 0.309463 17.0658C0.507608 16.8677 0.776352 16.7563 1.05657 16.7563C1.33679 16.7563 1.60554 16.8677 1.80368 17.0658C2.00183 17.264 2.11314 17.5327 2.11314 17.8129V25.1988C2.11337 25.3812 2.18593 25.5561 2.31491 25.6851C2.4439 25.814 2.61877 25.8866 2.80118 25.8868H26.3602C26.5426 25.8866 26.7175 25.814 26.8465 25.6851C26.9755 25.5561 27.048 25.3812 27.0482 25.1988V17.8129C27.0482 17.5327 27.1596 17.264 27.3577 17.0658C27.5558 16.8677 27.8246 16.7563 28.1048 16.7563C28.385 16.7563 28.6538 16.8677 28.8519 17.0658C29.0501 17.264 29.1614 17.5327 29.1614 17.8129V25.1988C29.1605 25.9414 28.8651 26.6534 28.3399 27.1785C27.8148 27.7037 27.1028 27.9991 26.3602 28Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={350}>
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
                padding={{ right: 15, left: 15 }}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <Tooltip content={CustomTooltip} />
              <Legend content={CustomLegend} />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <Bar dataKey="საღუმელე კოქსი" fill="#30B0C7" barSize={30} />
              <Bar dataKey="სხვა ბიტუმოვანი" fill="#138C00" barSize={30} />
              <Bar dataKey="ანტრაციტი" fill="#ED4C5C" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_3;
