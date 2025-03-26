import { useEffect, useMemo, useState } from "react";
import fetchDataWithCodes from "../../../../../../../../../../fetchDataWithCodes";

const Chart_2 = () => {
  const years = useMemo(
    () => [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    []
  );

  const [data, setData] = useState([]);

  const chartID = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchDataWithCodes(chartID);

        setData(rawData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <>{data.length > 1 && <div className="main-chart"></div>}</>;
};

export default Chart_2;
