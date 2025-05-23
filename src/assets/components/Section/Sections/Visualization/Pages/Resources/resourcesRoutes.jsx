import { Navigate } from "react-router-dom";
import ElectricityAndThermalEnergy from "./Pages/ElectricityAndThermalEnergy/ElectricityAndThermalEnergy";
import NaturalGas from "./Pages/NaturalGas/NaturalGas";
import Coal from "./Pages/Coal/Coal";
import OilAndPetroleumProducts from "./Pages/OilAndPetroleumProducts/OilAndPetroleumProducts";
import BiofuelsAndWaste from "./Pages/BiofuelsAndWaste/BiofuelsAndWaste";

const resourcesRoutes = [
  { path: "", element: <Navigate to="electricityandthermalenergy" /> },
  {
    path: "electricityandthermalenergy",
    element: <ElectricityAndThermalEnergy />,
  },
  { path: "naturalgas", element: <NaturalGas /> },
  { path: "coal", element: <Coal /> },
  { path: "oilandpetroleumproducts", element: <OilAndPetroleumProducts /> },
  { path: "biofuelandwaste", element: <BiofuelsAndWaste /> },
];

export default resourcesRoutes;
