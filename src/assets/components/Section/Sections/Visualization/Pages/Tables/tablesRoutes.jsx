import ElectricityAndThermalEnergy from "./Pages/ElectricityAndThermalEnergy";
import NaturalGas from "./Pages/NaturalGas";
import Coal from "./Pages/Coal";
import OilAndPetroleumProducts from "./Pages/OilAndOilProducts";
import BiofuelsAndWaste from "./Pages/BiofuelsAndWaste";
import { Navigate } from "react-router-dom";

const tableRoutes = [
  {
    index: true,
    element: <Navigate to="electricityandthermalenergy" replace />,
  },
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
