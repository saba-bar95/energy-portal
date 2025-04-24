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
      "api_object_items_tj",
      "api_object_items_ktoe",
      "api_object_items",
    ],
    name: "objects",
  };

  return <TablesContainer info={info} />;
};

export default ElectricityAndThermalEnergy;
