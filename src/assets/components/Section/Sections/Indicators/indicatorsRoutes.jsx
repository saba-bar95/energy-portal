import { Navigate } from "react-router-dom";
import ProductionAndConsumption from "./Pages/Production&Consumption/Production&Consumption";
import Prices from "./Pages/Prices/Prices";
import SDGIndicators from "./Pages/SDGIndicators/SDGIndicators";
import FlowsDiagram from "./Pages/FlowsDiagram/FlowsDiagram";
import Map from "./Pages/Map/Map";

const indicatorsRoutes = [
  { index: true, element: <Navigate to="production&consumption" replace /> }, // ✅ Redirects
  { path: "production&consumption", element: <ProductionAndConsumption /> },
  { path: "prices", element: <Prices /> },
  { path: "sdg-indicators", element: <SDGIndicators /> },
  { path: "flowsdiagram", element: <FlowsDiagram /> },
  { path: "map", element: <Map /> },
];

export default indicatorsRoutes;
