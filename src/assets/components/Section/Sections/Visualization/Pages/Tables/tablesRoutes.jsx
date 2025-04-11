import { Navigate } from "react-router-dom";
import ElectricityAndThermalEnergy from "./Pages/ElectricityAndThermalEnergy";
import NaturalGas from "./Pages/NaturalGas";
import Coal from "./Pages/Coal";
import OilAndPetroleumProducts from "./Pages/OilAndOilProducts";
import BiofuelsAndWaste from "./Pages/BiofuelsAndWaste";

const tableRoutes = [
  { path: "", element: <Navigate to="electricityandthermalenergy" /> },
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
