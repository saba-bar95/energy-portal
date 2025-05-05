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
      unit: "მილიონი მ³",
      value: "ბუნებრივი გაზი", // Assuming this is the single value; adjust if needed
    },
    en: {
      title: "Production",
      unit: "mil. m³",
      value: "Natural Gas", // Assuming this is the single value; adjust if needed
    },
  };

  useEffect(() => {
    const chartID = 7;
    const chartName = 2;

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
            d="M19.6502 5.44186H6.34788C4.84835 5.44186 3.62695 4.22047 3.62695 2.72093C3.62695 1.2214 4.84835 0 6.34788 0H19.6502C21.1497 0 22.3711 1.2214 22.3711 2.72093C22.3711 4.22047 21.1497 5.44186 19.6502 5.44186ZM6.34788 1.81395C5.85207 1.81395 5.44091 2.22512 5.44091 2.72093C5.44091 3.21674 5.85207 3.62791 6.34788 3.62791H19.6502C20.146 3.62791 20.5572 3.21674 20.5572 2.72093C20.5572 2.22512 20.146 1.81395 19.6502 1.81395H6.34788Z"
            fill="black"
          />
          <path
            d="M16.0233 12.6977H9.97679C8.47725 12.6977 7.25586 11.4763 7.25586 9.97679C7.25586 8.47725 8.47725 7.25586 9.97679 7.25586H16.0233C17.5228 7.25586 18.7442 8.47725 18.7442 9.97679C18.7442 11.4763 17.5228 12.6977 16.0233 12.6977ZM9.97679 9.06981C9.48098 9.06981 9.06981 9.48098 9.06981 9.97679C9.06981 10.4726 9.48098 10.8838 9.97679 10.8838H16.0233C16.5191 10.8838 16.9303 10.4726 16.9303 9.97679C16.9303 9.48098 16.5191 9.06981 16.0233 9.06981H9.97679Z"
            fill="black"
          />
          <path
            d="M22.0689 25.9999H19.0456C18.5498 25.9999 18.1387 25.5888 18.1387 25.0929V14.2092C18.1387 13.7134 18.5498 13.3022 19.0456 13.3022H22.0689C22.5647 13.3022 22.9759 13.7134 22.9759 14.2092V25.0929C22.9759 25.5888 22.5647 25.9999 22.0689 25.9999ZM19.9526 24.186H21.1619V15.1162H19.9526V24.186Z"
            fill="black"
          />
          <path
            d="M25.0923 24.186H22.0691C21.5733 24.186 21.1621 23.7748 21.1621 23.279C21.1621 22.7832 21.5733 22.372 22.0691 22.372H24.1854V16.9302H22.0691C21.5733 16.9302 21.1621 16.519 21.1621 16.0232C21.1621 15.5274 21.5733 15.1162 22.0691 15.1162H25.0923C25.5882 15.1162 25.9993 15.5274 25.9993 16.0232V23.279C25.9993 23.7748 25.5882 24.186 25.0923 24.186Z"
            fill="black"
          />
          <path
            d="M6.95367 25.9999H3.93041C3.4346 25.9999 3.02344 25.5888 3.02344 25.0929V14.2092C3.02344 13.7134 3.4346 13.3022 3.93041 13.3022H6.95367C7.44948 13.3022 7.86065 13.7134 7.86065 14.2092V25.0929C7.86065 25.5888 7.44948 25.9999 6.95367 25.9999ZM4.83739 24.186H6.04669V15.1162H4.83739V24.186Z"
            fill="black"
          />
          <path
            d="M3.93023 24.186H0.906977C0.411163 24.186 0 23.7748 0 23.279V16.0232C0 15.5274 0.411163 15.1162 0.906977 15.1162H3.93023C4.42605 15.1162 4.83721 15.5274 4.83721 16.0232C4.83721 16.519 4.42605 16.9302 3.93023 16.9302H1.81395V22.372H3.93023C4.42605 22.372 4.83721 22.7832 4.83721 23.279C4.83721 23.7748 4.42605 24.186 3.93023 24.186Z"
            fill="black"
          />
          <path
            d="M13.0004 26.0001C10.2552 26.0001 7.71571 24.6336 6.19199 22.3359C6.09525 22.1908 6.04688 22.0094 6.04688 21.8401V15.4187C6.04688 15.0317 6.30083 14.681 6.66362 14.5601L9.4692 13.6289C9.59013 13.5926 9.67478 13.4717 9.67478 13.3387V11.7908C9.67478 11.295 10.0859 10.8838 10.5818 10.8838H15.419C15.9148 10.8838 16.3259 11.295 16.3259 11.7908V13.3387C16.3259 13.4717 16.4106 13.5805 16.5315 13.6289L19.3371 14.5601C19.712 14.681 19.9539 15.0317 19.9539 15.4187V21.8401C19.9539 22.0215 19.9055 22.1908 19.8087 22.3359C18.2971 24.6336 15.7455 26.0001 13.0004 26.0001ZM7.86083 21.5619C9.04594 23.2066 10.9566 24.1861 13.0004 24.1861C15.0441 24.1861 16.9548 23.2066 18.1399 21.5619V16.0717L15.9632 15.3461C15.0925 15.0559 14.512 14.2456 14.512 13.3387V12.6977H11.4887V13.3387C11.4887 14.2456 10.9083 15.0559 10.0376 15.3461L7.86083 16.0717V21.5619Z"
            fill="black"
          />
          <path
            d="M15.418 9.06979H10.5808C10.085 9.06979 9.67383 8.65863 9.67383 8.16281V4.53491C9.67383 4.03909 10.085 3.62793 10.5808 3.62793H15.418C15.9138 3.62793 16.325 4.03909 16.325 4.53491V8.16281C16.325 8.65863 15.9138 9.06979 15.418 9.06979ZM11.4878 7.25584H14.511V5.44188H11.4878V7.25584Z"
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
          <Brush
            dataKey="name" // The key to brush on (e.g., months or years)
            height={20} // Brush height
            stroke="#115EFE" // Brush color
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_1;
