import TablesContainer from "../TablesContainer/TablesContainer";

const NaturalGas = () => {
  const info = {
    text: {
      ge: {
        header: "ბუნებრივი გაზის მიწოდება და მოხმარება",
      },
      en: {
        header: "Supply and Consumption of Natural Gas",
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

export default NaturalGas;
