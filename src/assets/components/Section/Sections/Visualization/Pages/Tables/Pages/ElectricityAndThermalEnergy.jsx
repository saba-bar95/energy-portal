import TablesContainer from "../TablesContainer/TablesContainer";

const ElectricityAndThermalEnergy = () => {
  const info = {
    text: {
      ge: {
        header: "ელექტროენერგიის და თბოენერგიის მიწოდება და მოხმარება",
      },
      en: {
        header: "Supply and Consumption of Electricity and Heat",
      },
    },
    sourceTables: [
      "electricity_and_heat_tj",
      "electricity_and_heat_ktoe",
      "electricity_and_heat_unit",
    ],
    name: "electricityHeat",
  };

  return <TablesContainer info={info} />;
};

export default ElectricityAndThermalEnergy;
