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

const Chart_4 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const chartID = 34;

  const text = {
    ka: {
      title: "ენერგორესურსების საბოლოო მოხმარება ტრანსპორტის სექტორში",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Final energy consumption in the transport sector",
      unit: "ktoe",
    },
  };

  const years = useMemo(
    () => Array.from({ length: 11 }, (_, i) => `y_20${i + 13}`),
    []
  );

  const colorMap = useMemo(
    () => ({
      "შიდა ავიაცია": "#5654D4",
      საგზაო: "#3FC8E4",
      "შიდა საზღვაო": "#ED4C5C",
      სარკინიგზო: "#007C90",
      "მილსადენი ტრანსპორტი": "#FF9F0A",
      სხვა: "#929497",
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);

        const filteredData = rawData.filter((item) => item.name_ge !== "სულ");

        const uniqueCategories = filteredData.map((item) => ({
          key_ge: item.name_ge,
          key_en: item.name_en,
          color: colorMap[item.name_ge] || "#000000", // Fallback color if not found
        }));

        setCategories(uniqueCategories);

        const stackedData = years.map((year) => {
          const yearData = { year: year.replace("y_", "") };
          filteredData.forEach((item) => {
            yearData[item.name_ge] = item[year] || 0; // Georgian key
            yearData[item.name_en] = item[year] || 0; // English key
          });
          return yearData;
        });

        setData(stackedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    fetchData();
  }, [years, colorMap]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName = name;
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
      <div
        className="legend-container ss"
        style={{
          marginTop: language === "en" ? "-30px" : "-70px",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "start",
          paddingLeft: "20px",
          marginLeft: "50px",
        }}>
        {payload.map((entry, index) => {
          const displayName = language === "ka" ? entry.dataKey : entry.dataKey;
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
        <div
          className="main-chart"
          style={{ paddingBottom: "50px", gridRow: "2 / 4" }}>
          <div className="header-container">
            <svg
              width="32"
              height="26"
              viewBox="0 0 32 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.4002 20.0567C22.3744 20.0567 21.543 20.8881 21.543 21.9138C21.543 22.9396 22.3744 23.771 23.4002 23.771C24.4259 23.771 25.2573 22.9396 25.2573 21.9138C25.2573 20.8881 24.4259 20.0567 23.4002 20.0567ZM19.3145 21.9138C19.3145 19.6573 21.1437 17.8281 23.4002 17.8281C25.6567 17.8281 27.4859 19.6573 27.4859 21.9138C27.4859 24.1703 25.6567 25.9996 23.4002 25.9996C21.1437 25.9996 19.3145 24.1703 19.3145 21.9138Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.54275 20.0567C7.51708 20.0567 6.6856 20.8881 6.6856 21.9138C6.6856 22.9396 7.51708 23.771 8.54275 23.771C9.56842 23.771 10.3999 22.9396 10.3999 21.9138C10.3999 20.8881 9.56842 20.0567 8.54275 20.0567ZM4.45703 21.9138C4.45703 19.6573 6.28627 17.8281 8.54275 17.8281C10.7992 17.8281 12.6285 19.6573 12.6285 21.9138C12.6285 24.1703 10.7992 25.9996 8.54275 25.9996C6.28627 25.9996 4.45703 24.1703 4.45703 21.9138Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.7842 6.7386C21.2617 6.68687 20.5957 6.6856 19.6005 6.6856H18.1997C17.5843 6.6856 17.0854 6.18673 17.0854 5.57132C17.0854 4.95592 17.5843 4.45703 18.1997 4.45703H19.6536C20.582 4.45702 21.3587 4.457 22.0038 4.52087C22.687 4.58852 23.3026 4.73339 23.8953 5.06895C24.4842 5.40241 24.9346 5.85859 25.363 6.41336C25.7722 6.94306 26.2077 7.62578 26.7352 8.45283L26.762 8.49482C27.4641 9.59567 28.1739 10.3587 29.1737 11.0445C29.2171 11.0743 29.2601 11.1037 29.3027 11.1329C30.3029 11.8179 31.0982 12.3625 31.5389 13.2611C31.7663 13.7248 31.8593 14.1971 31.9023 14.699C31.9425 15.1707 31.9425 15.7361 31.9425 16.3983V16.5085C31.9425 17.3752 31.9427 18.1243 31.8696 18.7266C31.792 19.3669 31.6167 20.0019 31.1445 20.5359C31.1098 20.5752 31.074 20.6137 31.0371 20.6513C30.5274 21.1715 29.9046 21.3741 29.2737 21.4624C28.6983 21.5429 27.9875 21.5429 27.1903 21.5427H26.3711C25.7557 21.5427 25.2568 21.0438 25.2568 20.4285C25.2568 19.8131 25.7557 19.3142 26.3711 19.3142H27.1184C28.01 19.3142 28.5624 19.3116 28.965 19.2553C29.3297 19.2042 29.4092 19.1285 29.4453 19.0915C29.4554 19.0812 29.4652 19.0707 29.4749 19.0597C29.5213 19.0072 29.6052 18.8876 29.6572 18.4584C29.712 18.0064 29.7139 17.3939 29.7139 16.4427C29.7139 15.7241 29.7131 15.2543 29.6817 14.8888C29.6521 14.5428 29.6003 14.3696 29.5379 14.2422C29.392 13.9448 29.1463 13.7282 27.9133 12.8824C26.6348 12.0055 25.7244 11.0122 24.8832 9.69328C24.3221 8.81381 23.9399 8.21659 23.5993 7.77569C23.2713 7.35091 23.0337 7.1421 22.7974 7.00827C22.5647 6.87653 22.2809 6.78778 21.7842 6.7386ZM13.3711 20.4285C13.3711 19.8131 13.87 19.3142 14.4854 19.3142H20.4282C21.0436 19.3142 21.5425 19.8131 21.5425 20.4285C21.5425 21.0438 21.0436 21.5427 20.4282 21.5427H14.4854C13.87 21.5427 13.3711 21.0438 13.3711 20.4285Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0446 4.53703C17.6158 4.30847 18.2644 4.58638 18.493 5.15778L19.9701 8.85061C20.3411 9.77796 20.5874 10.3896 20.8272 10.8395C21.0541 11.265 21.227 11.4492 21.4004 11.5666C21.5738 11.684 21.809 11.7761 22.2884 11.8287C22.795 11.8844 23.4544 11.8859 24.4532 11.8859H29.3441C29.9595 11.8859 30.4584 12.3848 30.4584 13.0002C30.4584 13.6156 29.9595 14.1145 29.3441 14.1145H24.3944C23.4703 14.1145 22.6878 14.1145 22.0451 14.0439C21.3615 13.9689 20.7323 13.8056 20.1509 13.412C19.5697 13.0185 19.1845 12.4949 18.8607 11.8881C18.5566 11.3176 18.266 10.5911 17.9228 9.73294C17.9155 9.71482 17.9082 9.69654 17.901 9.67827L16.4237 5.98545C16.1952 5.41406 16.4732 4.76558 17.0446 4.53703Z"
                fill="black"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.30249 3.01046e-06H5.37765H13.2689C14.2094 -5.64181e-05 15.0293 -0.000115703 15.688 0.0924443C16.4012 0.192715 17.0866 0.420326 17.638 0.996813C18.1828 1.56632 18.3915 2.2623 18.4842 2.98396C18.5716 3.66233 18.5714 4.51059 18.5714 5.50053V20.4286C18.5714 21.044 18.0725 21.5429 17.4571 21.5429H11.0621C10.4467 21.5429 9.94784 21.044 9.94784 20.4286C9.94784 19.8132 10.4467 19.3143 11.0621 19.3143H16.3429V5.57143C16.3429 4.49071 16.3406 3.78744 16.2739 3.26822C16.2106 2.77615 16.1072 2.62046 16.0276 2.53725C15.9546 2.46098 15.8254 2.36224 15.3777 2.29932C14.8928 2.23116 14.2315 2.22857 13.1937 2.22857H5.37765C4.33988 2.22857 3.67866 2.23116 3.19371 2.29932C2.74609 2.36224 2.61682 2.46098 2.54387 2.53725C2.46428 2.62046 2.3608 2.77615 2.29753 3.26822C2.23074 3.78744 2.22857 4.49071 2.22857 5.57143V15.9714C2.22857 17.0521 2.23074 17.7555 2.29753 18.2746C2.3608 18.7668 2.46428 18.9224 2.54387 19.0056C2.61682 19.0819 2.74609 19.1806 3.19371 19.2436C3.67866 19.3118 4.33988 19.3143 5.37765 19.3143C5.99305 19.3143 6.49193 19.8132 6.49193 20.4286C6.49193 21.044 5.99305 21.5429 5.37765 21.5429H5.3025C4.36201 21.543 3.54206 21.543 2.88352 21.4504C2.17017 21.3502 1.48482 21.1225 0.933417 20.5461C0.388665 19.9766 0.179967 19.2806 0.0871541 18.559C-8.70832e-05 17.8806 -4.25571e-05 17.0322 2.01432e-06 16.0423V5.57143C2.01432e-06 5.54773 2.01432e-06 5.5241 2.01432e-06 5.50055C-4.25571e-05 4.51059 -8.70832e-05 3.66233 0.0871541 2.98396C0.179967 2.2623 0.388665 1.56632 0.933417 0.996813C1.48482 0.420326 2.17017 0.192715 2.88352 0.0924443C3.54206 -0.000115703 4.36201 -5.64181e-05 5.30249 3.01046e-06Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              {categories.map((category, i) => (
                <Bar
                  key={i}
                  dataKey={
                    language === "en" ? category.key_en : category.key_ge
                  } // Use the appropriate key based on the language
                  fill={category.color}
                  stackId={1}
                  minPointSize={4}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_4;
