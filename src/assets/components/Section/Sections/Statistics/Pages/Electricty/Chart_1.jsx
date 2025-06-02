/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import Download from "../../../../../Download/Download";
import YearDropdown from "../../../../../YearDropdown/YearDropdown";
import fetchDataWithMonthes from "../../../../../../../../fetchDataWithMonthes";

const Chart_1 = () => {
  const text = {
    ge: {
      title: "წარმოება",
      unit: "გვტ.სთ",
      hydro: "ჰიდროელექტროსადგურები",
      thermal: "თბოელექტროსადგურები",
      wind: "ქარი",
    },
    en: {
      title: "Production",
      unit: "GWh",
      hydro: "Hydro Power Plants",
      thermal: "Thermal Power Plants",
      wind: "Wind",
    },
  };
  const [data, setData] = useState([]);
  const { language } = useParams();
  const [year, setYear] = useState(2024);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeKeys, setActiveKeys] = useState({
    [text[language].hydro]: true,
    [text[language].thermal]: true,
    [text[language].wind]: true,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  useEffect(() => {
    const chartID = 7;
    const chartName = 43;

    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithMonthes(year, chartID);
        const filteredData = rawData.filter((el) => el.name === chartName);
        setData(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [year]);

  const chartData = months.map((month) => ({
    name: language === "ge" ? month.name_ge : month.name_en,
    [text[language].hydro]: data[0]?.[month.name_en] || 0,
    [text[language].thermal]: data[1]?.[month.name_en] || 0,
    [text[language].wind]: data[2]?.[month.name_en] || 0,
  }));

  const toggleBar = (key) => {
    // Count how many bars are currently visible
    const activeCount = Object.values(activeKeys).filter(Boolean).length;

    // Ensure at least one bar remains visible
    if (activeCount > 1 || !activeKeys[key]) {
      setActiveKeys((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const CustomLegend = () => {
    const legendItems = [
      { name: text[language].hydro, color: "#5654D4" },
      { name: text[language].thermal, color: "#3FC8E4" },
      { name: text[language].wind, color: "#ED4C5C" },
    ];

    return (
      <div className="legend-container">
        {legendItems.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{
              opacity: activeKeys[entry.name] ? 1 : 0.5,
              cursor: "pointer",
            }}
            onClick={() => toggleBar(entry.name)}>
            <span style={{ color: entry.color }}>■</span>
            {entry.name}
          </p>
        ))}
      </div>
    );
  };

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
    <div
      className={
        language === "en" ? "main-chart elec-1-en" : "main-chart elec-1"
      }>
      <div className="header-container">
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
          {windowWidth >= 820 && <Legend content={CustomLegend} />}
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          {activeKeys[text[language].hydro] && (
            <Bar dataKey={text[language].hydro} fill="#5654D4" stackId={1} />
          )}
          {activeKeys[text[language].thermal] && (
            <Bar dataKey={text[language].thermal} fill="#3FC8E4" stackId={1} />
          )}
          {activeKeys[text[language].wind] && (
            <Bar dataKey={text[language].wind} fill="#ED4C5C" stackId={1} />
          )}
          <Brush
            dataKey="name"
            height={windowWidth < 768 ? 10 : 20}
            stroke="#115EFE"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_1;
