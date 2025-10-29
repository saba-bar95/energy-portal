import backEndUrl from "./backEndUrl";

const fetchDataWithMonthes = async (year, id) => {
  try {
    const response = await fetch(`${backEndUrl}/api/monthes/${year}/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const rawData = await response.json();

    return rawData;
  } catch (error) {
    console.log("Fetch error:", error);
    return []; // Return an empty array in case of error
  }
};

export default fetchDataWithMonthes;
