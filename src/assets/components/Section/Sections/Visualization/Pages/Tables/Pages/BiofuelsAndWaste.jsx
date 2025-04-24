import TablesContainer from "../TablesContainer/TablesContainer";

const BiofuelsAndWaste = () => {
  const info = {
    text: {
      ge: {
        header: "ბიოსაწვავის და ნარჩენების მიწოდება და მოხმარება",
      },
      en: {
        header: "Supply and Consumption of Biofuel and Waste",
      },
    },
    sourceTables: ["biofuel_unit_tj", "biofuel_unit_ktoe", "biofuel_unit"],
    name: "biofuel",
  };

  return <TablesContainer info={info} />;
};

export default BiofuelsAndWaste;
