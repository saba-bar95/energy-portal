import { Navigate } from "react-router-dom";
import Electricity from "./Pages/Electricty/Electricity";
import NaturalGas from "./Pages/NaturalGas/NaturalGas";
import Coal from "./Pages/Coal/Coal";
import OilProducts from "./Pages/OilProducts/OilProducts";

// import OilProducts from "../Visualization/Pages/Resources/Pages/OilProducts/OilProducts";

const statisticsRoutes = [
  { index: true, element: <Navigate to="electricity" replace /> }, // ✅ Redirect only when no sub-route is provided
  { path: "electricity", element: <Electricity /> },
  { path: "naturalgas", element: <NaturalGas /> },
  { path: "coal", element: <Coal /> },
  { path: "oilproducts", element: <OilProducts /> },
];

export default statisticsRoutes;
