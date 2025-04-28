import TablesContainer from "../TablesContainer/TablesContainer";

const OilAndOilProducts = () => {
  const info = {
    text: {
      ge: {
        header: "ნავთობის და ნავთობპროდუქტების მიწოდება და მოხმარება",
      },
      en: {
        header: "Supply and Consumption of Oil and Petroleum Products",
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

export default OilAndOilProducts;
