import ElectricityAndThermalEnergy from "./Pages/ElectricityAndThermalEnergy";
import NaturalGas from "./Pages/NaturalGas";
import Coal from "./Pages/Coal";
import OilAndPetroleumProducts from "./Pages/OilAndOilProducts";
import BiofuelsAndWaste from "./Pages/BiofuelsAndWaste";

const tableRoutes = [
  { index: true, element: <ElectricityAndThermalEnergy /> },
  {
    path: "electricityandthermalenergy",
    element: <ElectricityAndThermalEnergy />,
  },
  { path: "naturalgas", element: <NaturalGas /> },
  { path: "coal", element: <Coal /> },
  { path: "oilandoilproducts", element: <OilAndPetroleumProducts /> },
  { path: "biofuelandwaste", element: <BiofuelsAndWaste /> },
];

export default tableRoutes;
