/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import Download from "../../../../../Download/Download";
import YearDropdown from "../../../../../YearDropdown/YearDropdown";
import fetchDataWithMonthes from "../../../../../../fetchFunctions/fetchDataWithMonthes";

const Chart_3 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useParams();
  const [year, setYear] = useState(2025);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const years = useMemo(
    () => Array.from({ length: 2025 - 2018 + 1 }, (_, i) => 2018 + i),
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
      title: "ექსპორტი",
      unit: "ათასი ტონა",
      value: "ნავთობი და ნავთობპროდუქტები", // Assuming this is the single value; adjust if needed
    },
    en: {
      title: "Exports",
      unit: "thousand tons",
      value: "Oil and oil products", // Assuming this is the single value; adjust if needed
    },
  };

  useEffect(() => {
    const chartID = 18;
    const chartName = 4;

    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithMonthes(year, chartID);
        const filteredData = rawData.filter((el) => el.name === chartName);
        setData(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Transform the data for Recharts using language-specific keys
  const chartData = months
    .map((month) => {
      const value = data[0]?.[month.name_en] || 0;
      return {
        name: language === "ge" ? month.name_ge : month.name_en,
        [text[language].value]: value,
      };
    })
    .filter((entry) => entry[text[language].value] > 0);

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
    <div className="main-chart" style={{ paddingBottom: "20px" }}>
      <div className="header-container">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.9999 9.36521C13.1236 9.36511 13.2461 9.39042 13.3605 9.43969C13.4748 9.48895 13.5787 9.56122 13.6662 9.65234C13.7537 9.74347 13.8231 9.85166 13.8704 9.97074C13.9177 10.0898 13.942 10.2174 13.9419 10.3463L13.9419 25.0189C13.9419 25.2791 13.8426 25.5286 13.666 25.7126C13.4893 25.8966 13.2497 26 12.9999 26C12.75 26 12.5104 25.8966 12.3337 25.7126C12.1571 25.5286 12.0578 25.2791 12.0578 25.0189L12.0578 10.3463C12.0578 10.0861 12.1571 9.83656 12.3338 9.65257C12.5104 9.46858 12.75 9.36521 12.9999 9.36521Z"
            fill="black"
          />
          <path
            d="M13.0002 8.92433C13.3168 8.9238 13.6303 8.98844 13.9229 9.11451C14.2154 9.24059 14.4812 9.42562 14.7049 9.65898L19.7926 14.9577C19.9692 15.1416 20.0684 15.3911 20.0684 15.6512C20.0684 15.9113 19.9692 16.1607 19.7926 16.3446C19.616 16.5285 19.3765 16.6318 19.1267 16.6318C18.877 16.6318 18.6375 16.5285 18.4609 16.3446L13.3732 11.0459C13.3242 10.9948 13.2661 10.9544 13.2021 10.9268C13.138 10.8991 13.0694 10.8849 13.0002 10.8849C12.9309 10.8849 12.8623 10.8991 12.7983 10.9268C12.7343 10.9544 12.6761 10.9948 12.6271 11.0459L7.53941 16.3446C7.36179 16.5234 7.12385 16.6223 6.87686 16.6202C6.62986 16.618 6.39356 16.5149 6.21885 16.333C6.04414 16.1512 5.945 15.9051 5.94278 15.6479C5.94057 15.3907 6.03545 15.1428 6.207 14.9577L11.2955 9.65898C11.5192 9.42569 11.7849 9.2407 12.0775 9.11463C12.37 8.98856 12.6836 8.92389 13.0002 8.92433Z"
            fill="black"
          />
          <path
            d="M2.49751 -7.26266e-05L23.5025 -7.07902e-05C24.1646 0.000759918 24.7994 0.27507 25.2676 0.76269C25.7358 1.25031 25.9992 1.91143 26 2.60103L26 9.45933C26 9.71953 25.9008 9.96908 25.7241 10.1531C25.5474 10.3371 25.3078 10.4404 25.058 10.4404C24.8081 10.4404 24.5685 10.3371 24.3919 10.1531C24.2152 9.96908 24.1159 9.71953 24.1159 9.45933L24.1159 2.60103C24.1157 2.43165 24.051 2.26926 23.936 2.14949C23.821 2.02972 23.6651 1.96234 23.5025 1.96213L2.49751 1.96213C2.33487 1.96234 2.17896 2.02972 2.06395 2.14949C1.94895 2.26926 1.88426 2.43164 1.88406 2.60103L1.88406 9.45933C1.88406 9.71953 1.78481 9.96908 1.60814 10.1531C1.43148 10.3371 1.19187 10.4404 0.94203 10.4404C0.692188 10.4404 0.452578 10.3371 0.275913 10.1531C0.0992489 9.96908 6.30229e-08 9.71953 8.57707e-08 9.45932L6.85342e-07 2.60103C0.000798017 1.91143 0.264184 1.25031 0.732385 0.762688C1.20059 0.275068 1.83537 0.000757966 2.49751 -7.26266e-05Z"
            fill="black"
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
        <BarChart
          data={chartData}
          margin={
            windowWidth < 768
              ? { top: 15, right: 5, left: -10, bottom: 5 }
              : { top: 20, right: 30, left: 20, bottom: 5 }
          }>
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{
              style: {
                fontSize: windowWidth < 768 ? 12 : windowWidth < 1600 ? 14 : 16,
              },
            }}
          />
          <YAxis
            tickLine={false}
            tick={{
              style: {
                fontSize: windowWidth < 768 ? 12 : windowWidth < 1600 ? 14 : 16,
              },
            }}
          />
          <Tooltip content={CustomTooltip} />
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <Bar
            dataKey={text[language].value}
            fill="#ED4C5C" // Adjust color as needed
            name={text[language].value}
            minPointSize={2}
          />
          <Brush
            dataKey="name" // The key to brush on (e.g., months or years)
            height={windowWidth < 768 ? 10 : windowWidth < 1200 ? 15 : 20} // Reduce height by half
            stroke="#115EFE" // Brush color
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_3;
