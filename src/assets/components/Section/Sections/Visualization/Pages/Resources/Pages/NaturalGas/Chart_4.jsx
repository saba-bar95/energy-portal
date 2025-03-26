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

const Chart_4 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [year, setYear] = useState(2023);
  const chartID = 11;

  const text = {
    ka: {
      title: "ბუნებრივი გაზის საბოლოო მოხმარება მრეწველობის სექტორში",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Final consumption of natural gas in the industrial sector",
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
          (item) => item.name_ge !== "სულ" && item.name == 2
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
    return data
      .map((item) => ({
        name_ka: item.name_ge,
        name_en: item.name_en, // Use English name for the chart
        value: item[`y_${year}`] || 0, // Get the value for the selected year
      }))
      .reverse(); // Reverse the order of the data
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
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.6173 7.26116C25.3806 7.12537 25.0893 7.12654 24.8538 7.26436L17.3164 11.6722V7.92188C17.3164 7.64898 17.1704 7.39695 16.9337 7.26116C16.697 7.12537 16.4057 7.12654 16.1702 7.26436L8.63281 11.6722V0.761719C8.63281 0.341047 8.29177 0 7.87109 0H0.761719C0.341047 0 0 0.341047 0 0.761719V25.2383C0 25.659 0.341047 26 0.761719 26H25.2383C25.659 26 26 25.659 26 25.2383V7.92188C26 7.64898 25.854 7.39695 25.6173 7.26116ZM1.52344 1.52344H7.10938V2.53906H1.52344V1.52344ZM24.4766 24.4766H1.52344V4.0625H7.10938V13C7.10938 13.5878 7.74891 13.9538 8.25561 13.6575L15.793 9.2497V13C15.793 13.5878 16.4325 13.9538 16.9392 13.6575L24.4766 9.2497V24.4766Z"
                fill="#1E1E1E"
              />
              <path
                d="M10.918 16.834H7.87109C7.45042 16.834 7.10938 17.175 7.10938 17.5957V20.6426C7.10938 21.0633 7.45042 21.4043 7.87109 21.4043H10.918C11.3386 21.4043 11.6797 21.0633 11.6797 20.6426V17.5957C11.6797 17.175 11.3386 16.834 10.918 16.834ZM10.1562 19.8809H8.63281V18.3574H10.1562V19.8809Z"
                fill="#1E1E1E"
              />
              <path
                d="M19.6016 16.834H16.5547C16.134 16.834 15.793 17.175 15.793 17.5957V20.6426C15.793 21.0633 16.134 21.4043 16.5547 21.4043H19.6016C20.0222 21.4043 20.3633 21.0633 20.3633 20.6426V17.5957C20.3633 17.175 20.0222 16.834 19.6016 16.834ZM18.8398 19.8809H17.3164V18.3574H18.8398V19.8809Z"
                fill="#1E1E1E"
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
          <ResponsiveContainer height={800}>
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
              <Bar dataKey="value" fill="#007C90" barSize={25}>
                <LabelList
                  dataKey={`name_${language}`}
                  content={customNameLabel}
                />{" "}
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

export default Chart_4;
