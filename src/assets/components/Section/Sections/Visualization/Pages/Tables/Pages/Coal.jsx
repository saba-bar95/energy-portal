import TablesContainer from "../TablesContainer/TablesContainer";

const Coal = () => {
  const info = {
    text: {
      ge: {
        header: "ცხრილის სახელი",
      },
      en: {
        header: "Table name",
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

export default Coal;
