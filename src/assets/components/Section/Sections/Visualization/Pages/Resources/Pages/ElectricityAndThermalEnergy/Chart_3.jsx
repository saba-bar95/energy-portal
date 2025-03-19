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
  const chartID = 9;

  const text = {
    ka: {
      title: "ელექტრო და თბოენერგიის საბოლოო მოხმარება სახეების მიხედვით",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Final consumption of electricity and thermal energy by type",
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

        const filteredData = rawData.filter(
          (item) =>
            item.name === 1 && item.chart_id === 9 && item.name_ge !== "სულ"
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
              : entry.dataKey === "ელექტროენერგია"
              ? "Electricity"
              : entry.dataKey === "გეოთერმული"
              ? "Geothermal"
              : entry.dataKey === "მზე"
              ? "Solar"
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
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.1924 3.80758C19.737 1.35225 16.4724 0 13 0C9.52758 0 6.263 1.35225 3.80758 3.80758C1.35688 6.25833 0.00512891 9.58567 0 13.0508C0 16.0574 1.04939 18.9697 2.95689 21.2873C4.83823 23.5731 7.46205 25.1614 10.345 25.7597C10.5531 25.8028 10.7623 25.824 10.9701 25.824C11.6645 25.824 12.3412 25.5869 12.8915 25.1391C13.6053 24.5583 14.0148 23.6975 14.015 22.7772L14.0156 18.3848C16.2729 17.9249 17.9767 15.9243 17.9767 13.5332V10.918C17.9767 10.357 17.522 9.90234 16.961 9.90234H16.0978V7.3125C16.0978 6.75157 15.6431 6.29688 15.0821 6.29688C14.5212 6.29688 14.0665 6.75157 14.0665 7.3125V9.90234H12.0353V7.3125C12.0353 6.75157 11.5806 6.29688 11.0196 6.29688C10.4587 6.29688 10.004 6.75157 10.004 7.3125V9.90234H9.08994C8.52902 9.90234 8.07432 10.357 8.07432 10.918V13.5332C8.07432 15.9062 9.75254 17.8943 11.9844 18.3739L11.9837 22.7769C11.9837 23.1965 11.7493 23.4498 11.6096 23.5635C11.3705 23.7579 11.0601 23.8335 10.7578 23.7708C5.70685 22.7226 2.03917 18.2166 2.03018 13.0508C2.03018 13.0508 2.0313 13.0635 2.0313 13.0508C2.0313 7.00258 6.95185 2.03125 13.0001 2.03125C19.0483 2.03125 23.9688 6.9518 23.9688 13C23.9688 17.4341 21.3416 21.4124 17.2757 23.1352C16.7592 23.354 16.5179 23.9501 16.7368 24.4666C16.9557 24.9831 17.5518 25.2244 18.0682 25.0054C20.3888 24.0222 22.3648 22.388 23.7826 20.2795C25.2332 18.1222 26 15.6049 26 13C26 9.52758 24.6478 6.26295 22.1924 3.80758ZM10.1055 13.5332V11.9336H15.9453V13.5332C15.9453 15.1433 14.6355 16.4531 13.0254 16.4531C11.4153 16.4531 10.1055 15.1432 10.1055 13.5332Z"
                fill="black"
              />
            </svg>
            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={300}>
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
              <Bar dataKey="ელექტროენერგია" fill="#30B0C7" barSize={30} />
              <Bar dataKey="გეოთერმული" fill="#138C00" barSize={30} />
              <Bar dataKey="მზე" fill="#ED4C5C" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_3;
