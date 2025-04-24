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
      "api_object_items_tj",
      "api_object_items_ktoe",
      "api_object_items",
    ],
    name: "objects",
  };

  return <TablesContainer info={info} />;
};

export default OilAndOilProducts;
