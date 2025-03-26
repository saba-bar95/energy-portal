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

const Chart_2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useParams();
  const [year, setYear] = useState(2024);

  const years = useMemo(
    () => [
      "y_2018",
      "y_2019",
      "y_2020",
      "y_2021",
      "y_2022",
      "y_2023",
      "y_2024",
    ],
    []
  );

  const months = [
    { name_en: "Jan", name_ka: "იან" },
    { name_en: "Feb", name_ka: "თებ" },
    { name_en: "Mar", name_ka: "მარ" },
    { name_en: "Apr", name_ka: "აპრ" },
    { name_en: "May", name_ka: "მაი" },
    { name_en: "Jun", name_ka: "ივნ" },
    { name_en: "Jul", name_ka: "ივლ" },
    { name_en: "Aug", name_ka: "აგვ" },
    { name_en: "Sep", name_ka: "სექ" },
    { name_en: "Oct", name_ka: "ოქტ" },
    { name_en: "Nov", name_ka: "ნოე" },
    { name_en: "Dec", name_ka: "დეკ" },
  ];

  const text = {
    ka: {
      title: "იმპორტი",
      unit: "ათასი ტონა",
      value: "ქვანახშირი", // Assuming this is the single value; adjust if needed
    },
    en: {
      title: "Imports",
      unit: "thousand tons",
      value: "Coal", // Assuming this is the single value; adjust if needed
    },
  };

  useEffect(() => {
    const chartID = 12;
    const chartName = 3;

    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(year, chartID);
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
  const chartData = months.map((month) => ({
    name: language === "ka" ? month.name_ka : month.name_en,
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
            d="M13.0001 16.6348C12.8764 16.6349 12.7539 16.6096 12.6395 16.5603C12.5252 16.511 12.4213 16.4388 12.3338 16.3477C12.2463 16.2565 12.1769 16.1483 12.1296 16.0293C12.0823 15.9102 12.058 15.7826 12.0581 15.6537L12.0581 0.981102C12.0581 0.720898 12.1574 0.471351 12.334 0.287358C12.5107 0.103366 12.7503 0 13.0001 0C13.25 0 13.4896 0.103366 13.6663 0.287358C13.8429 0.471351 13.9422 0.720898 13.9422 0.981102L13.9422 15.6537C13.9422 15.9139 13.8429 16.1634 13.6663 16.3474C13.4896 16.5314 13.25 16.6348 13.0001 16.6348Z"
            fill="black"
          />
          <path
            d="M12.9998 17.0757C12.6832 17.0762 12.3697 17.0116 12.0771 16.8855C11.7846 16.7594 11.5188 16.5744 11.2951 16.341L6.20744 11.0423C6.03085 10.8584 5.93164 10.6089 5.93164 10.3488C5.93164 10.0887 6.03085 9.83931 6.20744 9.6554C6.38402 9.47149 6.62353 9.36816 6.87326 9.36816C7.12299 9.36816 7.3625 9.47149 7.53909 9.6554L12.6268 14.9541C12.6758 15.0052 12.7339 15.0456 12.7979 15.0732C12.862 15.1009 12.9306 15.1151 12.9998 15.1151C13.0691 15.1151 13.1377 15.1009 13.2017 15.0732C13.2657 15.0456 13.3239 15.0052 13.3729 14.9541L18.4606 9.6554C18.6382 9.47663 18.8761 9.37767 19.1231 9.37983C19.3701 9.38199 19.6064 9.48511 19.7812 9.66696C19.9559 9.84881 20.055 10.0949 20.0572 10.3521C20.0594 10.6093 19.9645 10.8572 19.793 11.0423L14.7045 16.341C14.4808 16.5743 14.2151 16.7593 13.9225 16.8854C13.63 17.0114 13.3164 17.0761 12.9998 17.0757Z"
            fill="black"
          />
          <path
            d="M23.5025 26.0001L2.49751 26.0001C1.83537 25.9992 1.20058 25.7249 0.732384 25.2373C0.264183 24.7497 0.000797754 24.0886 0 23.399L0 16.5407C0 16.2805 0.0992492 16.0309 0.275914 15.8469C0.452579 15.6629 0.692187 15.5596 0.942029 15.5596C1.19187 15.5596 1.43148 15.6629 1.60814 15.8469C1.78481 16.0309 1.88406 16.2805 1.88406 16.5407L1.88406 23.399C1.88426 23.5684 1.94895 23.7307 2.06395 23.8505C2.17895 23.9703 2.33487 24.0377 2.49751 24.0379L23.5025 24.0379C23.6651 24.0377 23.821 23.9703 23.936 23.8505C24.051 23.7307 24.1157 23.5684 24.1159 23.399V16.5407C24.1159 16.2805 24.2152 16.0309 24.3919 15.8469C24.5685 15.6629 24.8081 15.5596 25.058 15.5596C25.3078 15.5596 25.5474 15.6629 25.7241 15.8469C25.9008 16.0309 26 16.2805 26 16.5407V23.399C25.9992 24.0886 25.7358 24.7497 25.2676 25.2373C24.7994 25.7249 24.1646 25.9992 23.5025 26.0001Z"
            fill="black"
          />
        </svg>

        <div className="text-wrapper">
          <h2>{text[language].title}</h2>
          <h3>{text[language].unit}</h3>
        </div>
        <div className="years-wrapper">
          <YearDropdown years={years} year={year} setYear={setYear} />
          <Download />
        </div>
      </div>
      <ResponsiveContainer height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" tickLine={false} />
          <YAxis tickLine={false} />
          <Tooltip content={CustomTooltip} />
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <Bar
            dataKey={text[language].value}
            fill="#30B0C7" // Adjust color as needed
            name={text[language].value}
            minPointSize={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart_2;
