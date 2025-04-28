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
    sourceTables: ["natural_gas_tj", "natural_gas_ktoe", "natural_gas_unit"],
    name: "naturalGas",
  };

  return <TablesContainer info={info} />;
};

export default NaturalGas;
