import { Navigate } from "react-router-dom";
import Electricity from "./Pages/Electricty/Electricity";
import NaturalGas from "./Pages/NaturalGas/NaturalGas";
import Coal from "./Pages/Coal/Coal";
import OilProducts from "./Pages/OilProducts/OilProducts";

// import OilProducts from "../Visualization/Pages/Resources/Pages/OilProducts/OilProducts";

const statisticsRoutes = [
  { path: "", element: <Navigate to="electricity" /> }, // Default to heating
  { path: "electricity", element: <Electricity /> },
  { path: "naturalgas", element: <NaturalGas /> },
  { path: "coal", element: <Coal /> },
  { path: "oilproducts", element: <OilProducts /> },
];

export default statisticsRoutes;
