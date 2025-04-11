import TablesContainer from "../TablesContainer/TablesContainer";

const NaturalGas = () => {
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

export default NaturalGas;
