import TablesContainer from "../TablesContainer/TablesContainer";

const Coal = () => {
  const info = {
    text: {
      ge: {
        header: "ქვანახშირის მიწოდება და მოხმარება",
      },
      en: {
        header: "Supply and Consumption of Coal",
      },
    },
    sourceTables: [
      "oil_and_oil_products_tj",
      "oil_and_oil_products_ktoe",
      "oil_and_oil_products_unit",
    ],
    name: "oil",
  };

  return <TablesContainer info={info} />;
};

export default Coal;
