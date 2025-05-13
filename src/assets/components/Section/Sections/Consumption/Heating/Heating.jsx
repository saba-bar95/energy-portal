import { useEffect, useState, useMemo } from "react";
import fetchData from "../../../../../../../fetchData";
import Chart from "./Chart";
import firstChartIcon from "/src/assets/images/sections/consumption/1-chart-icon.svg";
import secondChartIcon from "/src/assets/images/sections/consumption/2-chart-icon.svg";

const Heating = () => {
  const [chartData, setChartData] = useState([null, null]);
  const [loading, setLoading] = useState(true); // New loading state

  const chartsConfig = useMemo(
    () => [
      {
        householdID: 99,
        title_ge:
          "შინამეურნეობების საცხოვრისის განაწილება გათბობის ძირითადი ტიპების მიხედვით",
        title_en: "Distribution of households by main type of heating system",
        icon: firstChartIcon,
        color: ["#3498DB", "#6CD68C", "#ED4C5C"],
      },
      {
        householdID: 100,
        title_ge:
          "შინამეურნეობების წილი გათბობის ინდივიდუალურ საშუალებებში გამოყენებული ენერგორესურსების მიხედვით",
        title_en:
          "Share of households by energy commodities used for individual heating facilities",
        icon: secondChartIcon,
        color: ["#556EB0", "#6FAEA9", "#FF9F0A"],
      },
    ],
    []
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Set loading to true before fetching data
      const dataPromises = chartsConfig.map(async (chart) => {
        const respData = await fetchData(chart.householdID);
        return respData.filter((el) => el.name_ge !== "სულ");
      });
      const results = await Promise.all(dataPromises);
      setChartData(results);
      setLoading(false); // Set loading to false after data is fetched
    };

    getData();
  }, [chartsConfig]);

  return (
    <div className="heating-container">
      {loading ? ( // Render loading container if loading is true
        <div className="loading-container">
          <p style={{ fontSize: "20px" }}>Loading...</p>{" "}
          {/* You can customize this loading message or add a spinner */}
        </div>
      ) : (
        chartData.map(
          (data, index) =>
            data && (
              <Chart
                key={chartsConfig[index].householdID}
                data={{ ...chartsConfig[index], data }}
              />
            )
        )
      )}
    </div>
  );
};

export default Heating;
