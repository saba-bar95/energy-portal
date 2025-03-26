/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_2 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 12;
  const chartName = 2;

  const text = {
    ka: {
      title: "ბუნებრივი გაზის იმპორტი",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Natural gas import",
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
    // Transform the raw data into Recharts-compatible format
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);
        const filteredData = rawData.filter(
          (item) => item.name === chartName && item.chart_id === chartID
        );

        const transformedData = years.map((year) => ({
          year: year.replace("y_", ""), // Remove "y_" prefix for cleaner display
          value: filteredData[0][year],
          georgian: filteredData[0].name_ge,
          english: filteredData[0].name_en, // English name as key
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
          {payload.map(({ value, color }, index) => {
            return (
              <p key={`item-${index}`} className="text">
                <span style={{ color }} className="before-span">
                  ■
                </span>
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

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart" style={{ flex: 1 }}>
          <div className="header-container">
            <svg
              width="32"
              height="26"
              viewBox="0 0 32 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M31.7752 11.5546V21.9538C31.7338 23.0636 31.2548 24.1119 30.4429 24.8696C29.631 25.6274 28.5522 26.033 27.4422 25.9979H4.33298C3.22297 26.033 2.14418 25.6274 1.33229 24.8696C0.520403 24.1119 0.0414247 23.0636 0 21.9538V11.5546C0 11.1716 0.15217 10.8042 0.423034 10.5333C0.693898 10.2625 1.06127 10.1103 1.44433 10.1103C1.82739 10.1103 2.19476 10.2625 2.46562 10.5333C2.73649 10.8042 2.88865 11.1716 2.88865 11.5546V21.9538C2.93553 22.2947 3.1115 22.6047 3.38026 22.8197C3.64901 23.0347 3.99004 23.1384 4.33298 23.1092H27.4422C27.7852 23.1384 28.1262 23.0347 28.3949 22.8197C28.6637 22.6047 28.8397 22.2947 28.8865 21.9538V11.5546C28.8865 11.1716 29.0387 10.8042 29.3096 10.5333C29.5804 10.2625 29.9478 10.1103 30.3309 10.1103C30.7139 10.1103 31.0813 10.2625 31.3522 10.5333C31.623 10.8042 31.7752 11.1716 31.7752 11.5546ZM14.8621 18.3574C15.1094 18.6042 15.4379 18.753 15.7865 18.7763H16.0609C16.3499 18.7419 16.6217 18.6211 16.8409 18.4296L16.9131 18.3574L21.4194 13.8655C21.554 13.7309 21.6609 13.571 21.7337 13.3951C21.8066 13.2191 21.8441 13.0305 21.8441 12.8401C21.8441 12.6496 21.8066 12.461 21.7337 12.2851C21.6609 12.1091 21.554 11.9493 21.4194 11.8146C21.2847 11.6799 21.1248 11.5731 20.9489 11.5002C20.7729 11.4273 20.5844 11.3898 20.3939 11.3898C20.2035 11.3898 20.0149 11.4273 19.8389 11.5002C19.663 11.5731 19.5031 11.6799 19.3684 11.8146L17.3319 13.8511V1.44433C17.3319 1.06127 17.1798 0.693898 16.9089 0.423034C16.638 0.15217 16.2707 0 15.8876 0C15.5045 0 15.1372 0.15217 14.8663 0.423034C14.5954 0.693898 14.4433 1.06127 14.4433 1.44433V13.8511L12.4068 11.8002C12.2725 11.6648 12.1128 11.5573 11.9368 11.484C11.7608 11.4107 11.572 11.3729 11.3813 11.3729C11.1906 11.3729 11.0019 11.4107 10.8258 11.484C10.6498 11.5573 10.4901 11.6648 10.3558 11.8002C10.222 11.9351 10.1161 12.0952 10.0442 12.2711C9.97231 12.4471 9.93587 12.6355 9.93697 12.8256C9.93587 13.0157 9.97231 13.2041 10.0442 13.3801C10.1161 13.5561 10.222 13.7161 10.3558 13.8511L14.8621 18.3574Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={380}>
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
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="value" fill="#ED4C5C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_2;
