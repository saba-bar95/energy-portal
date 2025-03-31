/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
} from "recharts";
import { useParams } from "react-router-dom";
import YearsDropdown from "../../../../../../../YearDropdown/YearDropdown";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_2 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2023);
  const chartID = 17;
  const chartName = 4;

  const text = {
    ka: {
      title: "ნედლი ნავთობის და ნავთობპროდუქტების იმპორტი სახეების მიხედვით",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Imports of crude oil and petroleum products by type",
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
          (item) => item.name_ge !== "სულ" && item.name == chartName
        );

        setData(filteredData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // Prepare data for the selected year and reverse the order
  const chartData = useMemo(() => {
    return data.map((item) => ({
      name_ka: item.name_ge,
      name_en: item.name_en, // Use English name for the chart
      value: item[`y_${year}`] || 0, // Get the value for the selected year
    }));
    // .reverse(); // Reverse the order of the data
  }, [data, year]);

  const customNameLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x + 5} y={y - 10}>
        {value}
      </text>
    );
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const rectWidth = 50; // Width of the rectangle
    const rectHeight = 25; // Set this to match the barSize

    return (
      <g>
        <rect
          x={x + width + 10} // Positioning the rectangle to the right of the bar
          y={y} // Align the rectangle with the bar
          width={rectWidth}
          height={rectHeight}
          fill="#EFEFEF" // Rectangle color
          rx={5} // Rounded corners
        />
        <text
          x={x + width + 10 + rectWidth / 2} // Center the text inside the rectangle
          y={y + rectHeight / 2} // Align the text vertically in the middle of the rectangle
          fill="#1E1E1E" // Text color
          textAnchor="middle"
          dominantBaseline="middle">
          {value.toFixed(1)}
        </text>
      </g>
    );
  };

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
                  : payload[index].payload.name_ka
                : language === "en"
                ? payload[index].payload.name_en
                : payload[index].payload.name_ka;

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

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart">
          <div className="header-container">
            <svg
              width="30"
              height="28"
              viewBox="0 0 30 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.58 17.9144C14.4412 17.9145 14.3038 17.8872 14.1755 17.8342C14.0473 17.7811 13.9308 17.7033 13.8327 17.6052C13.7345 17.507 13.6567 17.3905 13.6036 17.2623C13.5506 17.134 13.5233 16.9966 13.5234 16.8578V1.05657C13.5234 0.776351 13.6348 0.507608 13.8329 0.309463C14.031 0.111317 14.2998 0 14.58 0C14.8602 0 15.129 0.111317 15.3271 0.309463C15.5253 0.507608 15.6366 0.776351 15.6366 1.05657V16.8578C15.6366 17.138 15.5253 17.4068 15.3271 17.6049C15.129 17.8031 14.8602 17.9144 14.58 17.9144Z"
                fill="black"
              />
              <path
                d="M14.58 18.3893C14.2249 18.3898 13.8732 18.3202 13.5451 18.1844C13.2169 18.0487 12.9189 17.8494 12.668 17.5981L6.96167 11.8918C6.76361 11.6937 6.65234 11.4251 6.65234 11.145C6.65234 10.8649 6.76361 10.5963 6.96167 10.3982C7.15973 10.2001 7.42836 10.0889 7.70846 10.0889C7.98856 10.0889 8.25718 10.2001 8.45524 10.3982L14.1616 16.1045C14.2165 16.1595 14.2817 16.2031 14.3535 16.2328C14.4253 16.2625 14.5023 16.2778 14.58 16.2778C14.6577 16.2778 14.7346 16.2625 14.8064 16.2328C14.8782 16.2031 14.9434 16.1595 14.9984 16.1045L20.7047 10.3982C20.9039 10.2057 21.1708 10.0991 21.4478 10.1014C21.7249 10.1038 21.9899 10.2148 22.1858 10.4106C22.3818 10.6065 22.493 10.8715 22.4955 11.1485C22.498 11.4255 22.3915 11.6924 22.1991 11.8918L16.4919 17.5981C16.241 17.8493 15.943 18.0486 15.6148 18.1843C15.2867 18.3201 14.9351 18.3897 14.58 18.3893Z"
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
            <div className="years-wrapper">
              <YearsDropdown years={years} year={year} setYear={setYear} />
              <Download />
            </div>
          </div>
          <ResponsiveContainer height={700}>
            <BarChart
              data={chartData}
              layout="vertical" // Set layout to vertical for horizontal bars
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
              <XAxis
                type="number"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                dataKey={`name_${language}`}
                type="category"
                tick={false}
                padding={{ top: 15, bottom: 10 }}
                axisLine={false}
              />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="value" fill="#6FAEA9" barSize={25}>
                <LabelList
                  dataKey={`name_${language}`}
                  content={customNameLabel}
                />
                <LabelList dataKey="value" content={renderCustomizedLabel} />
                {/* Labels on top of bars */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_2;
