/* eslint-disable react/prop-types */
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
import Download from "../Download/Download";
import fetchPrices from "../../../../fetchPrices";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./ChartWithFilters.scss";
import Filter from "./Filter/Filter";

const ChartWithFilters = ({ info }) => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const [vatID, setVatID] = useState(144);
  const [typeID, setTypeID] = useState(142);
  const [dataKeys, setDataKeys] = useState([]);
  const [lastYear, setLastYear] = useState(2023);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [activeKeys, setActiveKeys] = useState(() =>
    dataKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const vats = {
    ge: [
      { number: 144, name: "დღგ-ის გარეშე" },
      { number: 145, name: "დღგ-ის ჩათვლით" },
    ],
    en: [
      { number: 144, name: "Without VAT" },
      { number: 145, name: "Including VAT" },
    ],
  };

  const types = {
    ge: [
      { number: 142, name: "საყოფაცხოვრებო" },
      { number: 143, name: "არასაყოფაცხოვრებო" },
    ],
    en: [
      { number: 142, name: "Household" },
      { number: 143, name: "Non-household" },
    ],
  };

  const years = useMemo(
    () => Array.from({ length: lastYear - 2018 + 1 }, (_, i) => 2018 + i),
    [lastYear]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchPrices(info.chartName, typeID);
        const newDataKeys = [];

        const getLastYear = (data) =>
          Math.max(
            ...data.flatMap((obj) =>
              Object.keys(obj)
                .filter((k) => k.startsWith("y_"))
                .map((k) => +k.split("_")[2])
            )
          );

        const lastYear = getLastYear(rawData);
        setLastYear(lastYear);

        const infoNames = typeID === 142 ? info.names : info.names_n;

        infoNames.forEach((el) => {
          const name = el[`name_${language}`];
          if (name && !newDataKeys.includes(name)) {
            newDataKeys.push(name);
          }
        });

        setDataKeys(newDataKeys);
        setActiveKeys(
          newDataKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {})
        );
        const result = [];

        years.forEach((year) => {
          const yearKey140 = `y_140_${year}`;
          const yearKey141 = `y_141_${year}`;

          const yearData140 = { year: `${year}_140` };
          const yearData141 = { year: `${year}_141` };

          infoNames.forEach(({ code, name_en, name_ge }) => {
            const matchingRawData = rawData.find(
              (data) => data.quantity === code && data.vat === vatID
            );

            const nameKey = language === "en" ? name_en : name_ge;

            // Check if the key exists in matchingRawData, otherwise set to "N/A"
            yearData140[nameKey] =
              matchingRawData && yearKey140 in matchingRawData
                ? matchingRawData[yearKey140]
                : "N/A";
            yearData141[nameKey] =
              matchingRawData && yearKey141 in matchingRawData
                ? matchingRawData[yearKey141]
                : "N/A";
          });

          result.push(yearData140);
          result.push(yearData141);
        });

        setData(result);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchData();
  }, [language, years, vatID, typeID, info]);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="custom-tooltip">
        <div className="tooltip-container">
          {payload.map(({ name, value, color }, index) => {
            const displayName = name;
            const displayValue = value === "N/A" ? "N/A" : value.toFixed(2);
            return (
              <p key={`item-${index}`} className="text">
                <span style={{ color }} className="before-span"></span>
                {displayName} :
                <span style={{ fontWeight: 900, marginLeft: "5px" }}>
                  {displayValue}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    );
  };

  const CustomLegend = () => {
    return (
      <div className="legend-container" style={info?.styles}>
        {dataKeys.map((entry, index) => (
          <p
            key={`item-${index}`}
            style={{
              opacity: activeKeys[entry] ? 1 : 0.5,
              cursor: "pointer",
            }}
            onClick={() => toggleBar(entry)}>
            <span style={{ color: info.colors[index] }}>■</span>
            {entry}
          </p>
        ))}
      </div>
    );
  };

  let unitHeader = info[`unit_${language}`];

  if (info.chartName === "electricityPriceGel" && typeID === 143) {
    unitHeader = info[`unit1_${language}`];
  }

  const classN =
    language === "en"
      ? `main-chart ${info.chartName}-${typeID}-chart-with-filters-en`
      : `main-chart ${info.chartName}-${typeID}-chart-with-filters`;

  return (
    <>
      {data.length > 0 && (
        <div className={classN}>
          <div className="header-container">
            {info.svg}
            <div className="info-wrapper">
              <div className="text-wrapper">
                <h2>{info[`title_${language}`]}</h2>
                <h3>{unitHeader}</h3>
              </div>
            </div>
            <div
              className="left-side"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "15px",
              }}>
              <Filter
                vatID={vatID}
                setVatID={setVatID}
                vats={vats[`${language}`]}
                typeID={typeID}
                setTypeID={setTypeID}
                types={types[`${language}`]}
              />
              <Download
                data={data}
                filename={info[`title_${language}`]}
                unit={unitHeader}
                isFiltered={true}
              />
            </div>
          </div>
          <ResponsiveContainer height={420}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 50,
              }}>
              <XAxis
                className="sss"
                dataKey="year"
                axisLine={{ stroke: "#B7B7B7" }}
                tickLine={false}
                interval={0}
                tick={({ x, y, payload }) => {
                  const strValue = String(payload.value);
                  const fontsize = windowWidth < 1200 ? "10" : "14";
                  return (
                    <g className="tick">
                      <text
                        x={x}
                        y={y + 10}
                        textAnchor="middle"
                        fontSize={fontsize}
                        fill="#000">
                        {strValue.includes("_140")
                          ? "I-VI"
                          : strValue.includes("_141")
                          ? "VII-XII"
                          : ""}
                      </text>
                    </g>
                  );
                }}
              />
              <XAxis
                dataKey="year"
                xAxisId="groupedYears"
                tickLine={false}
                axisLine={false}
                interval={0}
                tick={({ x, y, payload }) => {
                  const strValue = String(payload.value);
                  const year = strValue.includes("_140")
                    ? strValue.split("_")[0]
                    : "";
                  const fontsize = windowWidth < 1200 ? "12px" : "16px";
                  const right = windowWidth < 1200 ? 5 : 50;
                  const top = windowWidth < 1200 ? 0 : 10;

                  return (
                    <text
                      x={x + right}
                      y={y + top}
                      fontSize={fontsize}
                      textAnchor="middle"
                      fill="#1E1E1E"
                      fontWeight="900">
                      {year}
                    </text>
                  );
                }}
                height={1}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "#B7B7B7" }}
                tickFormatter={(value) =>
                  typeof value === "number" ? value.toFixed(2) : ""
                }
                tick={{ style: { fontSize: windowWidth < 768 ? 12 : 16 } }}
              />
              <Tooltip content={<CustomTooltip />} />
              {windowWidth >= 820 && <Legend content={CustomLegend} />}
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              {dataKeys.map((el, i) =>
                activeKeys[el] ? (
                  <Bar
                    dataKey={el}
                    key={el}
                    fill={info.colors[i]}
                    minPointSize={3}
                    valueAccessor={(entry) =>
                      entry[el] === "N/A" ? null : entry[el]
                    }
                  />
                ) : null
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default ChartWithFilters;
