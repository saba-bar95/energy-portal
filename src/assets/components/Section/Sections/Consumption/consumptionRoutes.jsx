import { Navigate } from "react-router-dom";
import Heating from "./Heating/Heating";
import Conditioning from "./Conditioning/Conditioning";
import HotWater from "./HotWater/HotWater";
import Cooking from "./Cooking/Cooking";
import EnergyConsumption from "./EnergyConsumption/EnergyConsumption";

const consumptionRoutes = [
  { path: "", element: <Navigate to="heating" /> }, // Default to heating
  { path: "heating", element: <Heating /> },
  { path: "air-conditioning", element: <Conditioning /> },
  { path: "water-heating", element: <HotWater /> },
  { path: "cooking", element: <Cooking /> },
  { path: "energy-consumption", element: <EnergyConsumption /> },
];

export default consumptionRoutes;
