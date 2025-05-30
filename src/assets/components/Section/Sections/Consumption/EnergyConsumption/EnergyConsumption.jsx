import { useEffect, useState, useMemo } from "react";
import fetchData from "../../../../../../../fetchData";
import Chart from "./Chart";
import firstChartIcon from "/src/assets/images/sections/consumption/1-chart-icon.svg";

const HotWater = () => {
  const [chartData, setChartData] = useState(null); // Changed to single value instead of array
  const [loading, setLoading] = useState(true);

  const chartConfig = useMemo(
    () => ({
      householdID: 106,
      title_ge:
        "შინამეურნეობების მიერ საყოფაცხოვრებო საჭიროებისათვის მოხმარებული ენერგორესურსები",
      title_en: "Energy commodities consumed for household needs",
      icon: firstChartIcon,
      color: ["#3498DB", "#6CD68C", "#ED4C5C"],
      measurement_ge: "ათასი ტონა ნავთობის ექვივალენტი",
      measurement_en: "Ton of oil equivalent",
    }),
    []
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const respData = await fetchData(chartConfig.householdID);
      const filteredData = respData.filter((el) => el.name_ge !== "სულ");
      setChartData(filteredData);
      setLoading(false);
    };

    getData();
  }, [chartConfig]);

  return (
    <div className="container-ss">
      <div className="heating-container">
        {loading ? (
          <div className="loading-container">
            <p style={{ fontSize: "20px" }}>Loading...</p>
          </div>
        ) : (
          chartData && (
            <Chart
              key={chartConfig.householdID}
              data={{ ...chartConfig, data: chartData }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default HotWater;
