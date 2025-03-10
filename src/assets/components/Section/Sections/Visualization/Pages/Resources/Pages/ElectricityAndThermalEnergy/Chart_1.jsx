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
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";

const Chart_1 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);

  const text = {
    ka: {
      title: "ელექტროენერგიის და თბოენერგიის წარმოება",
      unit: "ათასი ტნე",
    },

    en: {
      title: "Electricity and thermal energy production",
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
        const response = await fetch(
          "http://192.168.1.27:3000/api/resourceswithcodes/7"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const rawData = await response.json();

        const filteredData = rawData
          .filter(
            (item) =>
              item.name === 1 && item.chart_id === 7 && item.name_ge !== "სულ"
          )
          .map((item) => {
            // Transform the name_ge property
            let newNameGe = item.name_ge;
            switch (item.name_ge) {
              case "ჰიდროელექტროსადგურები":
                newNameGe = "ჰიდრო";
                break;
              case "თბოელექტროსადგურები":
                newNameGe = "თბო";
                break;
              case "ქარის ელექტროსადგურები":
                newNameGe = "ქარი";
                break;
              default:
                break; // No change for other cases
            }

            return {
              name_ge: newNameGe, // Use the transformed name
              name_en: item.name_en, // Include name_en
              y_2013: item.y_2013,
              y_2014: item.y_2014,
              y_2015: item.y_2015,
              y_2016: item.y_2016,
              y_2017: item.y_2017,
              y_2018: item.y_2018,
              y_2019: item.y_2019,
              y_2020: item.y_2020,
              y_2021: item.y_2021,
              y_2022: item.y_2022,
              y_2023: item.y_2023,
            };
          });

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
              : entry.dataKey === "ჰიდრო"
              ? "Hydro"
              : entry.dataKey === "თბო"
              ? "Thermal"
              : entry.dataKey === "ქარი"
              ? "Wind"
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
        <div className="main-chart">
          <div className="header-container">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.2296 24.4873H22.4852L17.1407 7.09091H23.9296V8.60364C23.9296 9.02909 24.2667 9.36 24.7 9.36C25.1333 9.36 25.4704 9.02909 25.4704 8.60364V6.33455C25.4704 6.09818 25.3259 5.86182 25.1333 5.72L16.6593 0.236364C16.5148 0.0945454 16.3222 0 16.1296 0H9.91852C9.72593 0 9.53333 0.0945455 9.38889 0.189091L0.818519 5.67273C0.625926 5.81455 0.481481 6.05091 0.481481 6.33455V8.60364C0.481481 9.02909 0.818519 9.36 1.25185 9.36C1.68519 9.36 2.02222 9.02909 2.02222 8.60364V7.09091H8.81111L3.51482 24.4873H0.77037C0.337037 24.4873 0 24.8182 0 25.2436C0 25.6691 0.337037 26 0.77037 26H25.2296C25.663 26 26 25.6691 26 25.2436C26 24.8182 25.663 24.4873 25.2296 24.4873ZM9.62963 9.83273L11.7 11.2509L8.52222 13.4727L9.62963 9.83273ZM17.4778 13.52L14.3 11.2982L16.3704 9.88L17.4778 13.52ZM18.2963 16.2145L20.463 23.3527L14.3 19.0509L18.2963 16.2145ZM17.1889 15.1273L13 18.0582L8.81111 15.1273L13 12.1964L17.1889 15.1273ZM7.65556 16.2145L11.6519 19.0036L5.48889 23.3055L7.65556 16.2145ZM13 19.9491L19.4519 24.4873H6.54815L13 19.9491ZM10.6407 5.57818V1.51273H15.3593V5.57818H10.6407ZM9.1 5.57818H3.85185L9.1 2.17455V5.57818ZM16.9 2.17455L22.1481 5.57818H16.9V2.17455ZM15.5519 7.09091L15.937 8.32L13 10.3527L10.063 8.32L10.4481 7.09091H15.5519Z"
                fill="#1E1E1E"
              />
            </svg>
            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={600}>
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
              />
              <YAxis tickLine={false} padding={{ top: 30 }} />
              <Tooltip content={CustomTooltip} />
              <Legend content={CustomLegend} />
              <Bar dataKey="ჰიდრო" stackId="a" fill="#5654D4" />
              <Bar dataKey="თბო" stackId="a" fill="#3FC8E4" />
              <Bar dataKey="ქარი" stackId="a" fill="#007C90" />
              <Bar dataKey="გეოთერმული" stackId="a" fill="#ED4C5C" />
              <Bar dataKey="მზე" stackId="a" fill="#FF9F0A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_1;
