import { Navigate } from "react-router-dom";
import ElectricityAndThermalEnergy from "./Pages/ElectricityAndThermalEnergy/ElectricityAndThermalEnergy";
import NaturalGas from "./Pages/NaturalGas/NaturalGas";
import Coal from "./Pages/Coal/Coal";
import OilAndPetroleumProducts from "./Pages/OilAndOilProducts/OilAndOilProducts";
import BiofuelsAndWaste from "./Pages/BiofuelsAndWaste/BiofuelsAndWaste";

const resourcesRoutes = [
  { path: "", element: <Navigate to="electricityandthermalenergy" replace /> },
  {
    path: "electricityandthermalenergy",
    element: <ElectricityAndThermalEnergy />,
  },
  { path: "naturalgas", element: <NaturalGas /> },
  { path: "coal", element: <Coal /> },
  { path: "oilandoilproducts", element: <OilAndPetroleumProducts /> },
  { path: "biofuelandwaste", element: <BiofuelsAndWaste /> },
];

export default resourcesRoutes;
