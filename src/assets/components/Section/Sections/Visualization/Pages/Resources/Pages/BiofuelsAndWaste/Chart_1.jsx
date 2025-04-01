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

const Chart_1 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const chartID = 26;
  const chartName = 5;

  const text = {
    ka: {
      title: "ბიოსაწვავის და ნარჩენებიდან წარმოებული ენერგია",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Energy from biofuels and waste",
      unit: "ktoe",
    },
  };

  const years = useMemo(
    () => Array.from({ length: 11 }, (_, i) => `y_20${i + 13}`),
    []
  );

  const colorMap = useMemo(
    () => ({
      შეშა: "#2C6552",
      "სხვა მცენარეული მასალები და ნარჩენები": "#339F8D",
      ბიოდიზელი: "#9EE9C4",
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);

        const filteredData = rawData.filter(
          (item) => item.name_ge !== "სულ" && item.name === chartName
        );

        // Extract unique categories from the filtered data
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
        className="legend-container"
        id="coal-chart-5"
        style={{ marginTop: language === "en" ? "0px" : "0px" }}>
        {" "}
        {/* Corrected here */}
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
        <div className="main-chart chart-1">
          <div className="header-container">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M25.7341 10.366C25.6612 10.0119 25.3495 9.75777 24.988 9.75777H23.6541C23.4439 9.06549 23.1667 8.39651 22.8258 7.75847L23.7678 6.81643C24.0234 6.56083 24.0642 6.16076 23.8654 5.8589C22.8842 4.3688 21.6312 3.11576 20.1411 2.13462C19.8392 1.9358 19.4392 1.97658 19.1836 2.23218L18.2415 3.17421C17.6035 2.8333 16.9346 2.55618 16.2423 2.34593V1.01204C16.2423 0.650515 15.9882 0.338804 15.634 0.265929C13.911 -0.0886431 12.0903 -0.0886431 10.3673 0.265929C10.0132 0.338804 9.75907 0.650515 9.75907 1.01204V2.34598C9.06678 2.55618 8.39781 2.83335 7.75981 3.17427L6.81777 2.23223C6.56218 1.97663 6.16205 1.9359 5.86025 2.13467C4.37015 3.11581 3.11711 4.36885 2.13597 5.85895C1.93715 6.16086 1.97793 6.56088 2.23352 6.81648L3.17556 7.75852C2.83465 8.39651 2.55752 9.06554 2.34728 9.75782H1.01329C0.651759 9.75782 0.340048 10.0119 0.267173 10.3661C0.0898873 11.2275 0 12.1135 0 12.9994C0 13.8853 0.0898873 14.7713 0.267173 15.6327C0.340048 15.9869 0.651759 16.241 1.01329 16.241H2.34723C2.55742 16.9333 2.8346 17.6022 3.17551 18.2402L2.23347 19.1823C1.97788 19.4379 1.93715 19.8379 2.13591 20.1398C3.11706 21.6299 4.3701 22.8829 5.86019 23.8641C6.16205 24.063 6.56213 24.0221 6.81772 23.7665L7.75976 22.8245C8.39776 23.1654 9.06673 23.4425 9.75902 23.6528V24.9867C9.75902 25.3482 10.0131 25.66 10.3673 25.7328C11.2288 25.9101 12.1148 26 13.0006 26C13.8864 26 14.7725 25.9101 15.6339 25.7328C15.9881 25.66 16.2422 25.3482 16.2422 24.9867V23.6528C16.9345 23.4426 17.6034 23.1654 18.2415 22.8245L19.1835 23.7665C19.4392 24.0222 19.8392 24.0629 20.1411 23.8641C21.6311 22.8829 22.8842 21.6299 23.8653 20.1398C24.0641 19.8379 24.0234 19.4379 23.7678 19.1823L22.8257 18.2402C23.1666 17.6022 23.4438 16.9333 23.654 16.241H24.988C25.3495 16.241 25.6612 15.9869 25.7341 15.6327C25.9114 14.7712 26.0012 13.8852 26.0012 12.9994C26.0012 12.1136 25.9114 11.2275 25.7341 10.366ZM24.3499 14.7175H23.0734C22.7226 14.7175 22.4172 14.957 22.3336 15.2977C22.1019 16.2419 21.729 17.1421 21.2251 17.9733C21.0432 18.2733 21.0897 18.6588 21.3378 18.9068L22.2398 19.8088C21.5543 20.739 20.7402 21.553 19.81 22.2385L18.9081 21.3366C18.66 21.0885 18.2746 21.0419 17.9746 21.2238C17.1434 21.7277 16.2432 22.1006 15.2989 22.3323C14.9583 22.4159 14.7187 22.7214 14.7187 23.0722V24.3487C13.5851 24.5186 12.4162 24.5186 11.2826 24.3487V23.0722C11.2826 22.7214 11.043 22.4159 10.7024 22.3323C9.7581 22.1007 8.85791 21.7277 8.02673 21.2238C7.7267 21.0419 7.3413 21.0885 7.09322 21.3366L6.19125 22.2385C5.26105 21.553 4.44703 20.739 3.7615 19.8088L4.66347 18.9068C4.91155 18.6587 4.95807 18.2733 4.77621 17.9733C4.27239 17.1421 3.89943 16.2419 3.66771 15.2977C3.58412 14.957 3.27865 14.7175 2.92789 14.7175H1.65139C1.56643 14.1507 1.52351 13.5751 1.52351 12.9994C1.52351 12.4237 1.56643 11.8481 1.65139 11.2813H2.92789C3.27865 11.2813 3.58412 11.0418 3.66771 10.7011C3.89938 9.75686 4.27234 8.85667 4.77621 8.02544C4.95807 7.72541 4.91155 7.34001 4.66342 7.09193L3.7615 6.19001C4.44703 5.2598 5.26105 4.44579 6.19125 3.76026L7.09322 4.66223C7.3413 4.91031 7.72675 4.95683 8.02673 4.77497C8.85791 4.27114 9.7581 3.89819 10.7024 3.66646C11.043 3.58287 11.2826 3.27741 11.2826 2.92664V1.65014C12.4162 1.48017 13.5851 1.48017 14.7187 1.65014V2.92664C14.7187 3.27741 14.9583 3.58287 15.2989 3.66646C16.2432 3.89814 17.1434 4.27109 17.9746 4.77497C18.2745 4.95683 18.6599 4.91026 18.9081 4.66223L19.81 3.76026C20.7402 4.44579 21.5543 5.2598 22.2398 6.19001L21.3379 7.09193C21.0898 7.34001 21.0432 7.72541 21.2251 8.02544C21.7289 8.85667 22.1019 9.75686 22.3336 10.7011C22.4172 11.0418 22.7226 11.2813 23.0734 11.2813H24.3499C24.4349 11.8481 24.4778 12.4237 24.4778 12.9994C24.4778 13.5751 24.4349 14.1507 24.3499 14.7175Z"
                fill="black"
              />
              <path
                d="M13.0004 5.38184C8.80005 5.38184 5.38281 8.79908 5.38281 12.9994C5.38281 17.1997 8.80005 20.617 13.0004 20.617C17.2007 20.617 20.6179 17.1997 20.6179 12.9994C20.6179 8.79908 17.2007 5.38184 13.0004 5.38184ZM13.7621 13.8884C13.7621 13.0748 14.4241 12.4127 15.2378 12.4127H15.7427V12.9176C15.7427 13.7313 15.0807 14.3933 14.267 14.3933H13.7621V13.8884ZM12.2386 14.3934H11.7337C10.9201 14.3934 10.2581 13.7314 10.2581 12.9177V12.4128H10.7629C11.5766 12.4128 12.2386 13.0748 12.2386 13.8885V14.3934ZM13.7621 19.0459V15.9169H14.267C15.9208 15.9169 17.2662 14.5715 17.2662 12.9177V11.651C17.2662 11.2303 16.9252 10.8893 16.5045 10.8893H15.2378C14.3492 10.8893 13.5501 11.2781 13.0004 11.894C12.4507 11.2781 11.6516 10.8893 10.7629 10.8893H9.4963C9.07561 10.8893 8.73454 11.2303 8.73454 11.651V12.9177C8.73454 14.5714 10.08 15.9169 11.7337 15.9169H12.2386V19.0459C9.23654 18.6699 6.90633 16.1017 6.90633 12.9994C6.90633 9.63914 9.64012 6.90535 13.0004 6.90535C16.3606 6.90535 19.0944 9.63914 19.0944 12.9994C19.0944 16.1017 16.7642 18.6699 13.7621 19.0459Z"
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

export default Chart_1;
