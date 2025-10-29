import backEndUrl from "./backEndUrl";

const fetchMainDataIndicators = async (id) => {
  try {
    const response = await fetch(`${backEndUrl}/api/mainNrgIndicators/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null; // Return null or some default value in case of error
  }
};

export default fetchMainDataIndicators;
