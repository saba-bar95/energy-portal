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
      "api_object_items_tj",
      "api_object_items_ktoe",
      "api_object_items",
    ],
    name: "objects",
  };

  return <TablesContainer info={info} />;
};

export default Coal;
