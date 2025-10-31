/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo, useCallback } from "react";
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
import fetchDataWithMonthes from "../../../../../../fetchFunctions/fetchDataWithMonthes";

const Chart_1 = () => {
  const text = useMemo(
    () => ({
      ge: {
        title: "წარმოება",
        unit: "გვტ.სთ",
        hydro: "ჰიდროელექტროსადგურები",
        thermal: "თბოელექტროსადგურები",
        wind: "ქარი",
        solar: "მზის ელექტროსადგური",
      },
      en: {
        title: "Production",
        unit: "GWh",
        hydro: "Hydro Power Plants",
        thermal: "Thermal Power Plants",
        wind: "Wind",
        solar: "Solar Power Plant",
      },
    }),
    []
  );

  const [data, setData] = useState([]);
  const { language } = useParams();
  const [year, setYear] = useState(2025);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeKeys, setActiveKeys] = useState({
    [text[language]?.hydro]: true,
    [text[language]?.thermal]: true,
    [text[language]?.wind]: true,
    [text[language]?.solar]: true,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const years = useMemo(
    () => Array.from({ length: 2025 - 2018 + 1 }, (_, i) => 2018 + i),
    []
  );

  const months = useMemo(
    () => [
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
    ],
    []
  );

  const getDataByLegendCode = useCallback(
    (legendCode) => {
      return data.find((item) => item.legend_code === legendCode);
    },
    [data]
  );

  useEffect(() => {
    const chartID = 7;
    const chartName = 43;

    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithMonthes(year, chartID);
        const filteredData = rawData.filter((el) => el.name === chartName);
        setData(filteredData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [year]);

  // Check if solar data exists for the current year
  const hasSolarData = useMemo(() => {
    const solarData = getDataByLegendCode(203);
    if (!solarData) return false;

    return months.some(
      (month) =>
        solarData[month.name_en] !== null &&
        solarData[month.name_en] !== undefined &&
        solarData[month.name_en] > 0
    );
  }, [getDataByLegendCode, months]);

  // Process data based on legend codes - don't convert null to 0 for solar
  const chartData = useMemo(() => {
    const hydroData = getDataByLegendCode(37); // Hydro power
    const thermalData = getDataByLegendCode(38); // Thermal power
    const windData = getDataByLegendCode(39); // Wind power
    const solarData = getDataByLegendCode(203); // Solar power

    return months
      .map((month) => {
        const hydro = hydroData?.[month.name_en] ?? 0;
        const thermal = thermalData?.[month.name_en] ?? 0;
        const wind = windData?.[month.name_en] ?? 0;
        // For solar, only include if there's actual data, otherwise null
        const solar = solarData?.[month.name_en] ?? null;

        return {
          name: language === "ge" ? month.name_ge : month.name_en,
          [text[language].hydro]: hydro,
          [text[language].thermal]: thermal,
          [text[language].wind]: wind,
          [text[language].solar]: solar,
        };
      })
      .filter(
        (monthData) =>
          monthData[text[language]?.hydro] > 0 ||
          monthData[text[language]?.thermal] > 0 ||
          monthData[text[language]?.wind] > 0 ||
          (monthData[text[language]?.solar] !== null &&
            monthData[text[language]?.solar] > 0)
      );
  }, [getDataByLegendCode, language, text, months]);

  const toggleBar = (key) => {
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
      ...(hasSolarData
        ? [{ name: text[language].solar, color: "#F7B731" }]
        : []),
    ];

    return (
      <div
        className="legend-container"
        style={{
          justifyContent: windowWidth < 768 ? "start" : "center",
          marginLeft: "30px",
        }}>
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

    // Filter out null values from tooltip
    const validPayload = payload.filter(
      ({ value }) => value !== null && value !== undefined && value > 0
    );

    if (!validPayload.length) return null;

    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {validPayload.map(({ name, value, color }, index) => (
            <p key={`item-${index}`} className="text">
              <span style={{ color }} className="before-span">
                ■
              </span>
              {name}:
              <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                {value.toFixed(1)}
              </span>
              {text[language].unit}
            </p>
          ))}
        </div>
      </div>
    );
  };

  // Update active keys when language changes or when solar data availability changes
  useEffect(() => {
    if (text[language]) {
      setActiveKeys({
        [text[language].hydro]: true,
        [text[language].thermal]: true,
        [text[language].wind]: true,
        [text[language].solar]: hasSolarData,
      });
    }
  }, [language, text, hasSolarData]);

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
          <Legend content={CustomLegend} />
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          {activeKeys[text[language]?.hydro] && (
            <Bar
              dataKey={text[language].hydro}
              fill="#5654D4"
              stackId="a"
              name={text[language].hydro}
            />
          )}
          {activeKeys[text[language]?.thermal] && (
            <Bar
              dataKey={text[language].thermal}
              fill="#3FC8E4"
              stackId="a"
              name={text[language].thermal}
            />
          )}
          {activeKeys[text[language]?.wind] && (
            <Bar
              dataKey={text[language].wind}
              fill="#ED4C5C"
              stackId="a"
              name={text[language].wind}
            />
          )}
          {activeKeys[text[language]?.solar] && hasSolarData && (
            <Bar
              dataKey={text[language].solar}
              fill="#F7B731"
              stackId="a"
              name={text[language].solar}
            />
          )}

          <Brush
            dataKey="name"
            height={windowWidth < 768 ? 10 : windowWidth < 1200 ? 15 : 20} // Reduce height by half
            stroke="#115EFE"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_1;
