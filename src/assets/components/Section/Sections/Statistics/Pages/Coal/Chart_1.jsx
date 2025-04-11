/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import fetchDataWithCodes from "../../../../../../../../fetchDataWithMonthes";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Download from "../../../../../Download/Download";
import YearDropdown from "../../../../../YearDropdown/YearDropdown";

const Chart_1 = () => {
  const [data, setData] = useState([]);
  const { language } = useParams();
  const [year, setYear] = useState(2024);

  const years = useMemo(
    () => Array.from({ length: 2024 - 2018 + 1 }, (_, i) => 2018 + i),
    []
  );

  const months = [
    { name_en: "Jan", name_ge: "იან" },
    { name_en: "Feb", name_ge: "თებ" },
    { name_en: "Mar", name_ge: "მარ" },
    { name_en: "Apr", name_ge: "აპრ" },
    { name_en: "May", name_ge: "მაი" },
    { name_en: "Jun", name_ge: "ივნ" },
    { name_en: "Jul", name_ge: "ივლ" },
    { name_en: "Aug", name_ge: "აგვ" },
    { name_en: "Sep", name_ge: "სექ" },
    { name_en: "Oct", name_ge: "ოქტ" },
    { name_en: "Nov", name_ge: "ნოე" },
    { name_en: "Dec", name_ge: "დეკ" },
  ];

  const text = {
    ge: {
      title: "წარმოება",
      unit: "ათასი ტონა",
      value: "ქვანახშირი", // Assuming this is the single value; adjust if needed
    },
    en: {
      title: "Production",
      unit: "thousand tons",
      value: "Coal", // Assuming this is the single value; adjust if needed
    },
  };

  useEffect(() => {
    const chartID = 7;
    const chartName = 3;

    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(year, chartID);
        const filteredData = rawData.filter((el) => el.name === chartName);
        setData(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [year]);

  // Transform the data for Recharts using language-specific keys
  const chartData = months.map((month) => ({
    name: language === "ge" ? month.name_ge : month.name_en,
    [text[language].value]: data[0]?.[month.name_en] || 0,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => (
            <p key={`item-${index}`} className="text">
              <span style={{ color }} className="before-span">
                ■
              </span>
              {name} :
              <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                {value.toFixed(1)}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
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
        <div className="years-wrapper">
          <YearDropdown years={years} year={year} setYear={setYear} />
          <Download
            data={chartData}
            filename={text[language].title}
            unit={text[language].unit}
            year={year}
            isMonth={true}
          />
        </div>
      </div>
      <ResponsiveContainer height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickLine={false} />
          <Tooltip content={CustomTooltip} />
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <Bar
            dataKey={text[language].value}
            fill="#5654D4" // Adjust color as needed
            name={text[language].value}
            minPointSize={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_1;
