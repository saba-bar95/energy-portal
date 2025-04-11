import TablesContainer from "../TablesContainer/TablesContainer";

const ElectricityAndThermalEnergy = () => {
  const info = {
    text: {
      ge: {
        header: "ცხრილის სახელი",
      },
      en: {
        header: "Table name",
      },
    },
  };

  return <TablesContainer info={info} />;
};

export default ElectricityAndThermalEnergy;
