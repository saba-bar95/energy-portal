import TablesContainer from "../TablesContainer/TablesContainer";

const BiofuelsAndWaste = () => {
  const info = {
    text: {
      ge: {
        header: "ცხრილის სახელი",
      },
      en: {
        header: "Table name",
      },
    },
    sourceTables: ["biofuel_unit_tj", "biofuel_unit_ktoe", "biofuel_unit"],
    name: "biofuel",
  };

  return <TablesContainer info={info} />;
};

export default BiofuelsAndWaste;
