import TablesContainer from "../TablesContainer/TablesContainer";

const OilAndOilProducts = () => {
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

export default OilAndOilProducts;
