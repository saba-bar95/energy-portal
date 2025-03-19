// fetchData.js
const fetchDataWithCodes = async (id) => {
  try {
    const response = await fetch(
      `http://192.168.1.27:3000/api/resourceswithcodes/${id}`
    );

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

export default fetchDataWithCodes;
