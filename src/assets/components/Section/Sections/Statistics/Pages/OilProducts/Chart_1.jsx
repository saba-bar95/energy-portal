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
  Brush,
} from "recharts";
import Download from "../../../../../Download/Download";
import YearDropdown from "../../../../../YearDropdown/YearDropdown";

const Chart_1 = () => {
  const [data, setData] = useState([]);
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
      title: "წარმოება",
      unit: "ათასი ტონა",
      value: "ნავთობი და ნავთობპროდუქტები", // Assuming this is the single value; adjust if needed
    },
    en: {
      title: "Production",
      unit: "thousand tons",
      value: "Oil and oil products", // Assuming this is the single value; adjust if needed
    },
  };

  useEffect(() => {
    const chartID = 7;
    const chartName = 4;

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
    <div className="main-chart">
      <div className="header-container">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25.2436 24.531H23.8727V4.43885C24.4873 4.20191 24.96 3.77543 25.2436 3.1594C25.48 2.59075 25.48 1.97472 25.2436 1.40607C24.7709 0.221394 23.4473 -0.299865 22.2655 0.174007C21.32 0.553104 20.8 1.45346 20.8473 2.4012L14.7964 4.91272C14.3709 4.39146 13.7564 4.10714 13.0473 4.10714C11.7709 4.10714 10.7782 5.14966 10.7782 6.38172C10.7782 6.42911 10.7782 6.52388 10.7782 6.57127L5.2 8.84585C5.15273 8.41937 5.2 7.99289 5.38909 7.5664C5.53091 7.1873 5.34182 6.71343 4.96364 6.57127L2.12727 5.38659C1.74909 5.24443 1.27636 5.38659 1.13454 5.81308C0.378179 7.61379 0.378179 9.55666 1.13454 11.3574C1.89091 13.1581 3.26182 14.5323 5.05819 15.2905C5.43637 15.4327 5.90909 15.2905 6.0509 14.864L7.23272 12.0208C7.37454 11.6417 7.23272 11.1678 6.80727 11.0257C6.38182 10.8361 6.05091 10.5992 5.76728 10.2675L11.2509 7.99289L5.57818 24.4836H0.756366C0.330912 24.4836 0 24.8153 0 25.2418C0 25.6683 0.330912 26 0.756366 26H25.2436C25.6691 26 26 25.6683 26 25.2418C26 24.8627 25.6691 24.531 25.2436 24.531ZM22.7855 1.54823C23.1636 1.40607 23.6364 1.54823 23.7782 1.97472C23.92 2.35382 23.7782 2.82769 23.3527 2.96985C22.9745 3.11201 22.5018 2.96985 22.36 2.54336C22.2182 2.16427 22.4073 1.73778 22.7855 1.54823ZM21.4145 3.82282C21.6509 4.10714 21.9818 4.29669 22.36 4.43885V24.531H20.4218L14.7018 7.9455C15.08 7.51901 15.2691 6.99776 15.2691 6.42911V6.38172L21.4145 3.82282ZM9.07637 19.1289L11.6291 20.7874L7.61091 23.3937L9.07637 19.1289ZM9.78546 16.9964H16.2145L16.4509 17.6599L13 19.8871L9.5491 17.6599L9.78546 16.9964ZM12.6691 8.65631C12.9054 8.70369 13.1418 8.70369 13.3309 8.65631L15.6946 15.4801H10.3054L12.6691 8.65631ZM18.4364 23.4411L14.4182 20.8348L16.9709 19.1763L18.4364 23.4411ZM13 21.7352L17.3018 24.531H8.69818L13 21.7352ZM13 5.62353C13.4255 5.62353 13.7564 5.95524 13.7564 6.38172C13.7564 6.80821 13.4255 7.13992 13 7.13992C12.5745 7.13992 12.2436 6.80821 12.2436 6.38172C12.2436 5.95524 12.5745 5.62353 13 5.62353ZM5.01091 13.5372C3.92364 12.9211 3.12 11.9734 2.6 10.7887C2.12727 9.60405 2.03273 8.3246 2.36364 7.13992L3.78182 7.70856C3.59273 8.51414 3.68727 9.36711 4.01818 10.1727C4.34909 10.9783 4.91636 11.6417 5.57818 12.0682L5.01091 13.5372Z"
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
            tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
          />
          <YAxis
            tickLine={false}
            tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
          />
          <Tooltip content={CustomTooltip} />
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <Bar
            dataKey={text[language].value}
            fill="#5654D4" // Adjust color as needed
            name={text[language].value}
            minPointSize={2}
          />
          <Brush
            dataKey="name" // The key to brush on (e.g., months or years)
            height={windowWidth < 768 ? 10 : 20}
            stroke="#115EFE" // Brush color
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_1;
