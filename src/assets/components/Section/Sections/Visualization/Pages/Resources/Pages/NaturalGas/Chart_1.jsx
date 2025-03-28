/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import { useParams } from "react-router-dom";
import Download from "../../../../../../../Download/Download";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_1 = () => {
  const { language } = useParams();
  const [data, setData] = useState([]);
  const chartID = 7;
  const chartName = 2;

  const text = {
    ka: {
      title: "ბუნებრივი გაზის წარმოება",
      unit: "ათასი ტნე",
    },
    en: {
      title: "Natural gas production",
      unit: "ktoe",
    },
  };

  const years = useMemo(
    () => [
      "y_2013",
      "y_2014",
      "y_2015",
      "y_2016",
      "y_2017",
      "y_2018",
      "y_2019",
      "y_2020",
      "y_2021",
      "y_2022",
      "y_2023",
    ],
    []
  );

  useEffect(() => {
    // Transform the raw data into Recharts-compatible format
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);
        const filteredData = rawData.filter(
          (item) => item.name === chartName && item.chart_id === chartID
        );

        const transformedData = years.map((year) => ({
          year: year.replace("y_", ""), // Remove "y_" prefix for cleaner display
          value: filteredData[0][year],
          georgian: filteredData[0].name_ge,
          english: filteredData[0].name_en, // English name as key
        }));

        setData(transformedData);
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchData();
  }, [years]);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const rectWidth = width; // Width of the rectangle
    const rectHeight = 25; // Height of the rectangle

    return (
      <g>
        <rect
          x={x} // Positioning the rectangle to the right of the bar
          y={y - rectHeight - 5} // Position the rectangle above the bar
          width={rectWidth}
          height={rectHeight}
          fill="#EFEFEF" // Rectangle color
          rx={5} // Rounded corners
        />
        <text
          x={x + width / 2} // Center the text inside the rectangle
          y={y - rectHeight / 2 - 5} // Center vertically within the rectangle
          fill="#1E1E1E" // Text color
          textAnchor="middle"
          dominantBaseline="middle">
          {value.toFixed(1)}
        </text>
      </g>
    );
  };

  return (
    <>
      {data.length > 0 && (
        <div className="main-chart" style={{ flex: 1 }}>
          <div className="header-container">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.6512 5.44186H6.34886C4.84933 5.44186 3.62793 4.22047 3.62793 2.72093C3.62793 1.2214 4.84933 0 6.34886 0H19.6512C21.1507 0 22.3721 1.2214 22.3721 2.72093C22.3721 4.22047 21.1507 5.44186 19.6512 5.44186ZM6.34886 1.81395C5.85305 1.81395 5.44188 2.22512 5.44188 2.72093C5.44188 3.21674 5.85305 3.62791 6.34886 3.62791H19.6512C20.147 3.62791 20.5582 3.21674 20.5582 2.72093C20.5582 2.22512 20.147 1.81395 19.6512 1.81395H6.34886Z"
                fill="black"
              />
              <path
                d="M16.0233 12.6977H9.97679C8.47725 12.6977 7.25586 11.4763 7.25586 9.97679C7.25586 8.47725 8.47725 7.25586 9.97679 7.25586H16.0233C17.5228 7.25586 18.7442 8.47725 18.7442 9.97679C18.7442 11.4763 17.5228 12.6977 16.0233 12.6977ZM9.97679 9.06981C9.48098 9.06981 9.06981 9.48098 9.06981 9.97679C9.06981 10.4726 9.48098 10.8838 9.97679 10.8838H16.0233C16.5191 10.8838 16.9303 10.4726 16.9303 9.97679C16.9303 9.48098 16.5191 9.06981 16.0233 9.06981H9.97679Z"
                fill="black"
              />
              <path
                d="M22.0699 25.9999H19.0466C18.5508 25.9999 18.1396 25.5888 18.1396 25.0929V14.2092C18.1396 13.7134 18.5508 13.3022 19.0466 13.3022H22.0699C22.5657 13.3022 22.9769 13.7134 22.9769 14.2092V25.0929C22.9769 25.5888 22.5657 25.9999 22.0699 25.9999ZM19.9536 24.186H21.1629V15.1162H19.9536V24.186Z"
                fill="black"
              />
              <path
                d="M25.0933 24.186H22.0701C21.5742 24.186 21.1631 23.7748 21.1631 23.279C21.1631 22.7832 21.5742 22.372 22.0701 22.372H24.1863V16.9302H22.0701C21.5742 16.9302 21.1631 16.519 21.1631 16.0232C21.1631 15.5274 21.5742 15.1162 22.0701 15.1162H25.0933C25.5891 15.1162 26.0003 15.5274 26.0003 16.0232V23.279C26.0003 23.7748 25.5891 24.186 25.0933 24.186Z"
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
                d="M15.419 9.06979H10.5818C10.086 9.06979 9.6748 8.65863 9.6748 8.16281V4.53491C9.6748 4.03909 10.086 3.62793 10.5818 3.62793H15.419C15.9148 3.62793 16.326 4.03909 16.326 4.53491V8.16281C16.326 8.65863 15.9148 9.06979 15.419 9.06979ZM11.4888 7.25584H14.512V5.44188H11.4888V7.25584Z"
                fill="black"
              />
            </svg>

            <div className="text-wrapper">
              <h2>{text[language].title}</h2>
              <h3>{text[language].unit}</h3>
            </div>
            <Download />
          </div>
          <ResponsiveContainer height={380}>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}>
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
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <Bar dataKey="value" fill="#3498DB">
                <LabelList dataKey="value" content={renderCustomizedLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart_1;
