/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_1 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 7;
  const chartName = 3;

  const text = {
    ka: {
      title: "ქვანახშირის წარმოება",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Coal production",
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

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const rectWidth = width; // Width of the rectangle
    const rectHeight = 25; // Height of the rectangle

    return (
      <g>
        <rect
          x={x} // Positioning the rectangle to the right of the bar
          y={y - rectHeight - 5} // Position the rectangle above the bar
          width={rectWidth}
          height={rectHeight}
          fill="#EFEFEF" // Rectangle color
          rx={5} // Rounded corners
        />
        <text
          x={x + width / 2} // Center the text inside the rectangle
          y={y - rectHeight / 2 - 5} // Center vertically within the rectangle
          fill="#1E1E1E" // Text color
          textAnchor="middle"
          dominantBaseline="middle">
          {value.toFixed(1)}
        </text>
      </g>
    );
  };

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart chart-1">
          <div className="header-container">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.6409 10.8299C25.4176 10.6909 25.1383 10.6769 24.9021 10.793L21.8044 12.3164C21.655 12.3899 21.5338 12.5104 21.4593 12.6593L19.5931 16.3918L17.4219 16.8232C17.191 16.869 16.9943 17.0191 16.8891 17.2296L15.5762 19.8554H13C12.7439 19.8554 12.505 19.9841 12.3641 20.1979L9.31722 24.819C9.16295 25.0529 9.1496 25.3527 9.28244 25.5994C9.41528 25.8461 9.67285 26 9.95311 26H25.2383C25.6589 26 26 25.6589 26 25.2383C26 24.4874 26 12.2979 26 11.4765C26 11.2134 25.8642 10.969 25.6409 10.8299ZM22.7072 13.5702L24.4766 12.7V15.4216L21.4842 16.0161L22.7072 13.5702ZM11.3678 24.4766L13.4102 21.3789H20.0663L21.0875 24.4766H11.3678ZM20.6172 19.8555H17.2793L18.0847 18.2448L24.4766 16.9748V24.4766H22.6915L21.3406 20.3787C21.2377 20.0664 20.946 19.8555 20.6172 19.8555Z"
                fill="black"
              />
              <path
                d="M0 17.2033C0 17.4053 0.0802344 17.599 0.223133 17.7419L2.37763 19.8964C2.52637 20.0451 2.72132 20.1194 2.91622 20.1194C3.11112 20.1194 3.30612 20.0451 3.4548 19.8963L13.6885 9.66261L18.536 14.5101C18.7228 14.6969 18.9928 14.7736 19.2497 14.7129C19.5066 14.6522 19.7138 14.4629 19.7973 14.2124C20.5484 11.9591 19.9628 9.47351 18.2817 7.79244L16.9202 6.43089L17.4588 5.89226C17.756 5.59503 17.7562 5.11246 17.4588 4.81503L15.3043 2.66059C15.0068 2.36311 14.5245 2.36311 14.227 2.66059L13.6886 3.19922L12.327 1.83767C10.6475 0.158084 8.16238 -0.429608 5.90708 0.322108C5.65663 0.405592 5.46727 0.61283 5.40663 0.869733C5.346 1.12664 5.42268 1.39669 5.60935 1.58336L10.4569 6.43094L0.223133 16.6646C0.0802344 16.8075 0 17.0013 0 17.2033ZM17.2045 8.86971C18.162 9.82715 18.6494 11.11 18.5949 12.4146L14.7658 8.58539L15.843 7.50817L17.2045 8.86971ZM15.8431 5.35367C15.6705 5.52612 13.9434 7.2533 13.6886 7.50812L12.6113 6.43089C12.7993 6.24285 14.4725 4.56971 14.7658 4.27645L15.8431 5.35367ZM11.2497 2.9149L12.6113 4.27645L11.5341 5.35367L7.70494 1.52451C9.00901 1.47042 10.2924 1.95747 11.2497 2.9149ZM11.5341 7.50817L12.6113 8.58539L2.91622 18.2805L1.83894 17.2032L11.5341 7.50817Z"
                fill="black"
              />
              <path
                d="M21.8001 10.6346C22.1771 10.8231 22.6343 10.6695 22.8221 10.2939L24.3455 7.24705C24.5336 6.87076 24.3811 6.41327 24.0049 6.22508C23.6287 6.03704 23.1711 6.18943 22.9829 6.56572L21.4595 9.6126C21.2714 9.98889 21.4238 10.4464 21.8001 10.6346Z"
                fill="black"
              />
              <path
                d="M14.183 15.3658L11.1361 16.8892C10.7598 17.0773 10.6073 17.5349 10.7954 17.9112C10.9836 18.2876 11.4412 18.44 11.8174 18.2518L14.8642 16.7284C15.2405 16.5402 15.393 16.0827 15.2049 15.7064C15.0168 15.3302 14.5592 15.1776 14.183 15.3658Z"
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
                padding={{ right: 15, left: 15 }}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                tickLine={false}
                padding={{ top: 30 }}
                axisLine={{ stroke: "#B7B7B7", strokeDasharray: "3 3" }}
              />
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <Bar dataKey="value" fill="#2C3E50">
                <LabelList dataKey="value" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_1;
