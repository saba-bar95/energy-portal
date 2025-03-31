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
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";
import MultipleYearSDropdown from "../../../../../../../YearDropdown/MultipleYearsDropdown";

const Chart_3 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [selectedYears, setSelectedYears] = useState([2023]);

  const chartID = 20;
  const chartName = 4;

  const barColors = ["#084E99", "#30B0C7", "#ED4C5C"];
  const barSizes = {
    1: 25,
    2: 20,
    3: 17,
  };

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

  const chartData = useMemo(() => {
    return data.map((item) => {
      const yearData = {
        name_ka: item.name_ge,
        name_en: item.name_en,
      };
      selectedYears.forEach((year) => {
        yearData[year] = item[`y_${year}`] || 0;
      });
      return yearData;
    });
    // .sort((a, b) => {
    //   // Sort by the first selected year's value
    //   const yearKey = selectedYears[0];
    //   return b[yearKey] - a[yearKey];
    // })
    // .reverse();
  }, [data, selectedYears]);

  const customNameLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text x={x + 5} y={y - 10}>
        {value}
      </text>
    );
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const barHeight = height; // Use the bar's height
    const rectWidth = 50; // Keep a fixed width, or adjust as needed
    const rectHeight = barHeight; // Adjust as needed, add some padding

    return (
      <g>
        <rect
          x={x + width + 10}
          y={y}
          width={rectWidth}
          height={rectHeight}
          fill="#EFEFEF"
          rx={5}
        />
        <text
          x={x + width + 10 + rectWidth / 2}
          y={y + rectHeight / 2}
          fill="#1E1E1E"
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
            if (selectedYears.includes(parseInt(name))) {
              return (
                <p key={`item-${index}`} className="text">
                  <span style={{ color }} className="before-span">
                    ■
                  </span>
                  {name} :
                  <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                    {value.toFixed(1)}
                  </span>
                </p>
              );
            }
            return null;
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
                d="M14.5821 10.0856C14.7209 10.0855 14.8583 10.1128 14.9866 10.1658C15.1148 10.2189 15.2313 10.2967 15.3295 10.3948C15.4276 10.493 15.5054 10.6095 15.5585 10.7377C15.6115 10.866 15.6388 11.0034 15.6387 11.1422L15.6387 26.9434C15.6387 27.2236 15.5274 27.4924 15.3292 27.6905C15.1311 27.8887 14.8623 28 14.5821 28C14.3019 28 14.0331 27.8887 13.835 27.6905C13.6368 27.4924 13.5255 27.2236 13.5255 26.9434L13.5255 11.1422C13.5255 10.862 13.6368 10.5932 13.835 10.3951C14.0331 10.1969 14.3019 10.0856 14.5821 10.0856Z"
                fill="black"
              />
              <path
                d="M14.5821 9.61074C14.9372 9.61017 15.2889 9.67978 15.6171 9.81555C15.9452 9.95132 16.2432 10.1506 16.4941 10.4019L22.2004 16.1082C22.3985 16.3063 22.5098 16.5749 22.5098 16.855C22.5098 17.1351 22.3985 17.4037 22.2004 17.6018C22.0024 17.7999 21.7338 17.9111 21.4537 17.9111C21.1736 17.9111 20.9049 17.7999 20.7069 17.6018L15.0005 11.8955C14.9456 11.8405 14.8804 11.7969 14.8086 11.7672C14.7368 11.7375 14.6598 11.7221 14.5821 11.7221C14.5044 11.7221 14.4275 11.7375 14.3557 11.7672C14.2839 11.7969 14.2187 11.8405 14.1637 11.8955L8.4574 17.6018C8.25818 17.7943 7.99132 17.9009 7.71429 17.8986C7.43725 17.8962 7.17222 17.7852 6.97627 17.5894C6.78032 17.3935 6.66912 17.1285 6.66664 16.8515C6.66415 16.5745 6.77057 16.3076 6.96298 16.1082L12.6702 10.4019C12.9211 10.1507 13.2192 9.95145 13.5473 9.81568C13.8754 9.67991 14.227 9.61027 14.5821 9.61074Z"
                fill="black"
              />
              <path
                d="M2.80191 3.48888e-05L26.3609 3.69484e-05C27.1036 0.000932514 27.8155 0.296343 28.3407 0.821473C28.8658 1.3466 29.1612 2.05857 29.1621 2.80122L29.1621 10.1871C29.1621 10.4673 29.0508 10.736 28.8526 10.9342C28.6545 11.1323 28.3858 11.2437 28.1055 11.2437C27.8253 11.2437 27.5566 11.1323 27.3584 10.9342C27.1603 10.736 27.049 10.4673 27.049 10.1871L27.049 2.80122C27.0487 2.61881 26.9762 2.44393 26.8472 2.31495C26.7182 2.18597 26.5433 2.1134 26.3609 2.11318L2.80191 2.11318C2.6195 2.1134 2.44462 2.18596 2.31564 2.31495C2.18666 2.44393 2.11409 2.61881 2.11387 2.80122L2.11387 10.1871C2.11387 10.4673 2.00255 10.736 1.80441 10.9342C1.60626 11.1323 1.33752 11.2436 1.0573 11.2436C0.777079 11.2436 0.508335 11.1323 0.310188 10.9342C0.112043 10.736 0.000726768 10.4673 0.000726792 10.1871L0.000727438 2.80122C0.00162205 2.05857 0.297034 1.3466 0.822164 0.821471C1.34729 0.29634 2.05926 0.000930324 2.80191 3.48888e-05Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <div className="years-wrapper">
              <MultipleYearSDropdown
                years={years}
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
              />
              <Download />
            </div>
          </div>
          <ResponsiveContainer height={700}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                type="number"
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
              />
              <YAxis
                dataKey={`name_${language}`}
                type="category"
                padding={{ top: 15, bottom: 10 }}
                axisLine={false}
                tickFormatter={customNameLabel}
                tick={false}
              />
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <Tooltip content={CustomTooltip} />

              {selectedYears
                .slice()
                .sort((a, b) => b - a) // Sort years in descending order
                .map((year, index) => {
                  const barSize = barSizes[selectedYears.length] || 15; // Default to 15 if length is not 1, 2, or 3

                  return (
                    <Bar
                      key={year}
                      dataKey={year}
                      fill={barColors[index % barColors.length]}
                      barSize={barSize}
                      minPointSize={2}>
                      <LabelList
                        dataKey={year}
                        content={renderCustomizedLabel}
                      />
                      {index === 0 && (
                        <LabelList
                          dataKey={`name_${language}`}
                          content={customNameLabel}
                        />
                      )}
                    </Bar>
                  );
                })}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_3;
