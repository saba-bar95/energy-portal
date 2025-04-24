const SankeyData = {
  nodes: [
    { name_en: "Production", name_ge: "წარმოება" },
    { name_en: "Imports", name_ge: "იმპორტი" },
    {
      name_en: "Electricity and heat",
      name_ge: "ელექტროენერგია და თბოენერგია",
    },
    { name_en: "Natural gas", name_ge: "ბუნებრივი გაზი" },
    { name_en: "Coal", name_ge: "ქვანახშირი" },
    { name_en: "Oil and Oil products", name_ge: "ნავთობი და ნავთობპროდუქტები" },
    { name_en: "Biofuel and waste", name_ge: "ბიოსაწვავი და ნარჩენები" },
    { name_en: "Exports", name_ge: "ექსპორტი" },
    {
      name_en: "International Marine Bunkers",
      name_ge: "საერთაშორისო საზღვაო ბუნკერები",
    },
    {
      name_en: "International aviation bunkers",
      name_ge: "საერთაშორისო საჰაერო ბუნკერები",
    },
    { name_en: "Stock Changes", name_ge: "მარაგების ცვლილება" },
    { name_en: "Industry", name_ge: "მრეწველობა" },
    { name_en: "Construction", name_ge: "მშენებლობა" },
    { name_en: "Transport", name_ge: "ტრანსპორტი" },
    {
      name_en: "Commercial and public services",
      name_ge: "კერძო და სახელმწიფო მომსახურება",
    },
    { name_en: "Residential", name_ge: "შინამეურნეობები" },
    {
      name_en: "Agriculture, forestry and fishing",
      name_ge: "სოფლის, სატყეო და თევზის მეურნეობა",
    },
    { name_en: "Other", name_ge: "სხვა" },
  ],
  links: [
    // Links from Left column → Middle column
    { source: 0, target: 2, value: 880.3 }, // Production → Electricity and heat
    { source: 0, target: 3, value: 4.4 }, // Production → Natural gas
    { source: 0, target: 4, value: 168.0 }, // Production → Coal
    { source: 0, target: 5, value: 0.0 }, // Production → Oil and Oil products
    { source: 0, target: 6, value: 481.1 }, // Production → Biofuel and waste
    { source: 1, target: 2, value: 41.6 }, // Imports → Electricity
    { source: 1, target: 3, value: 1645.4 }, // Imports → Natural gas
    { source: 1, target: 4, value: 156.1 }, // Imports → Coal
    { source: 1, target: 5, value: 1096.2 }, // Imports → Oil and oil products

    // Links from Middle column → Right column
    { source: 2, target: 7, value: 38.7 }, // Electricity and heat → Exports
    { source: 4, target: 7, value: 1.8 }, // Coal → Exports
    { source: 5, target: 7, value: 70.3 }, // Oil and Oil products → Exports
    { source: 6, target: 7, value: 0.1 }, // Biofuel and waste → Exports
    { source: 5, target: 9, value: 87.3 }, // Oil and Oil products → International aviation bunkers
    { source: 5, target: 10, value: 3.1 }, // Oil and Oil products → Stock Changes
    { source: 4, target: 10, value: -6.7 }, // Coal → Stock Changes
    { source: 6, target: 10, value: 0.0 }, // Biofuel and waste → Stock Changes
    { source: 2, target: 11, value: 192.6 }, // Electricity and heat → Industry
    { source: 3, target: 11, value: 279.2 }, // Natural gas → Industry
    { source: 4, target: 11, value: 314.3 }, // Coal → Industry
    { source: 5, target: 11, value: 19.2 }, // Oil and Oil products → Industry
    { source: 6, target: 11, value: 0.2 }, // Biofuel and waste → Industry
    { source: 2, target: 12, value: 7.5 }, // Electricity and heat → Construction
    { source: 3, target: 12, value: 6.7 }, // Natural gas → Construction
    { source: 5, target: 12, value: 126.7 }, // Oil and Oil products → Construction
    { source: 2, target: 13, value: 24.2 }, // Electricity and heat → Transport
    { source: 3, target: 13, value: 288.5 }, // Natural gas → Transport
    { source: 5, target: 13, value: 814.9 }, // Oil and Oil products → Transport
    { source: 2, target: 14, value: 229.2 }, // Electricity and heat → Commercial and public services
    { source: 3, target: 14, value: 108.9 }, // Natural gas → Commercial and public services
    { source: 4, target: 14, value: 0.4 }, // Coal → Commercial and public services
    { source: 5, target: 14, value: 4.6 }, // Oil and Oil products → Commercial and public services
    { source: 6, target: 14, value: 8.0 }, // Biofuel and waste → Commercial and public services
    { source: 2, target: 15, value: 199.3 }, // Electricity and heat → Residential
    { source: 3, target: 15, value: 471.3 }, // Natural gas → Residential
    { source: 4, target: 15, value: 0.4 }, // Coal → Residential
    { source: 5, target: 15, value: 15.5 }, // Oil and Oil products → Residential
    { source: 6, target: 15, value: 472.9 }, // Biofuel and waste → Residential
    { source: 2, target: 16, value: 3.0 }, // Electricity and heat → Agriculture, forestry and fishing
    { source: 3, target: 16, value: 1.4 }, // Natural gas → Agriculture, forestry and fishing
    { source: 5, target: 16, value: 9.3 }, // Oil and Oil products → Agriculture, forestry and fishing
    { source: 2, target: 17, value: 138.0 }, // Electricity and heat → Other
  ],
};

export default SankeyData;
