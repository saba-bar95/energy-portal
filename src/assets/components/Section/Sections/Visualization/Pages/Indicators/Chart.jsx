/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  AreaChart, // Changed to AreaChart
  Area, // Changed to Area
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../Download/Download";
import fetchDataIndicators from "../../../../../../../../fetchDataIndicators";

const Chart = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);

  const [chartText, setChartText] = useState({
    ka: {
      title: "", // Initialize as empty strings
      unit: "ათასი ტნე",
    },
    en: {
      title: "",
      unit: "ktoe",
    },
  });

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
        const rawData = await fetchDataIndicators(info.name);

        const transformedData = years.map((year) => ({
          year: year.replace("y_", ""),
          imports: rawData[0][year],
          name_ge: rawData[0].name_ge,
          name_en: rawData[0].name_en,
        }));

        setData(transformedData);

        setChartText({
          ka: {
            title: rawData[0].name_ge,
            unit: "ათასი ტნე",
          },
          en: {
            title: rawData[0].name_en,
            unit: "ktoe",
          },
        });
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [years, info]);

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

  const filterId = `lineShadow-${info.name}`;

  const getGradientStopColors = (linearGradientString) => {
    const regex = /rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)/g;
    const colors = linearGradientString.match(regex) || [];
    return colors;
  };

  const stopColors = getGradientStopColors(info.linear);
  const gradientId = `areaGradient-${info.name}`; // Unique gradient ID

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
                d="M15.419 10.0856C15.5578 10.0855 15.6952 10.1128 15.8235 10.1658C15.9517 10.2189 16.0682 10.2967 16.1664 10.3948C16.2645 10.493 16.3423 10.6095 16.3954 10.7377C16.4484 10.866 16.4757 11.0034 16.4756 11.1422L16.4756 26.9434C16.4756 27.2236 16.3643 27.4924 16.1661 27.6905C15.968 27.8887 15.6992 28 15.419 28C15.1388 28 14.87 27.8887 14.6719 27.6905C14.4738 27.4924 14.3624 27.2236 14.3624 26.9434L14.3624 11.1422C14.3624 10.862 14.4738 10.5932 14.6719 10.3951C14.8701 10.1969 15.1388 10.0856 15.419 10.0856Z"
                fill="black"
              />
              <path
                d="M15.419 9.61074C15.7741 9.61017 16.1259 9.67978 16.454 9.81555C16.7821 9.95132 17.0801 10.1506 17.331 10.4019L23.0374 16.1082C23.2354 16.3063 23.3467 16.5749 23.3467 16.855C23.3467 17.1351 23.2354 17.4037 23.0374 17.6018C22.8393 17.7999 22.5707 17.9111 22.2906 17.9111C22.0105 17.9111 21.7418 17.7999 21.5438 17.6018L15.8374 11.8955C15.7825 11.8405 15.7173 11.7969 15.6455 11.7672C15.5737 11.7375 15.4968 11.7221 15.419 11.7221C15.3413 11.7221 15.2644 11.7375 15.1926 11.7672C15.1208 11.7969 15.0556 11.8405 15.0006 11.8955L9.29431 17.6018C9.09509 17.7943 8.82823 17.9009 8.5512 17.8986C8.27417 17.8962 8.00914 17.7852 7.81318 17.5894C7.61723 17.3935 7.50604 17.1285 7.50355 16.8515C7.50107 16.5745 7.60749 16.3076 7.7999 16.1082L13.5071 10.4019C13.758 10.1507 14.0561 9.95145 14.3842 9.81568C14.7123 9.67991 15.064 9.61027 15.419 9.61074Z"
                fill="black"
              />
              <path
                d="M3.6398 3.48888e-05L27.1988 3.69484e-05C27.9415 0.000932514 28.6534 0.296343 29.1786 0.821473C29.7037 1.3466 29.9991 2.05857 30 2.80122L30 10.1871C30 10.4673 29.8887 10.736 29.6905 10.9342C29.4924 11.1323 29.2236 11.2437 28.9434 11.2437C28.6632 11.2437 28.3945 11.1323 28.1963 10.9342C27.9982 10.736 27.8869 10.4673 27.8869 10.1871L27.8869 2.80122C27.8866 2.61881 27.8141 2.44393 27.6851 2.31495C27.5561 2.18597 27.3812 2.1134 27.1988 2.11318L3.6398 2.11318C3.45739 2.1134 3.28252 2.18596 3.15353 2.31495C3.02455 2.44393 2.95199 2.61881 2.95176 2.80122L2.95176 10.1871C2.95176 10.4673 2.84044 10.736 2.6423 10.9342C2.44415 11.1323 2.17541 11.2436 1.89519 11.2436C1.61497 11.2436 1.34623 11.1323 1.14808 10.9342C0.949934 10.736 0.838617 10.4673 0.838617 10.1871L0.838618 2.80122C0.839513 2.05857 1.13492 1.3466 1.66005 0.821471C2.18518 0.29634 2.89715 0.000930324 3.6398 3.48888e-05Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{chartText[language].title}</h2>
              <h3>{chartText[language].unit}</h3>
            </div>
            <Download />
          </div>

          <svg width="0" height="0">
            <filter
              id={filterId} // Use the unique filter ID
              x="-20%"
              y="-50%"
              width="140%"
              height="200%">
              <feDropShadow
                dx="0"
                dy="12"
                stdDeviation="10"
                floodColor={info.color}
              />
            </filter>
          </svg>

          <svg width="0" height="0">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                {stopColors.map((color, index) => (
                  <stop
                    key={`stop-${index}`}
                    offset={index === 0 ? "0%" : "100%"}
                    stopColor={color}
                  />
                ))}
              </linearGradient>
            </defs>
          </svg>

          <ResponsiveContainer height={380}>
            <AreaChart data={data}>
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
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="imports"
                stroke={info.color}
                fill={`url(#${gradientId})`} // Use the gradient as fill
                fillOpacity={1} // Change the opacity here (0 to 1)
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;
