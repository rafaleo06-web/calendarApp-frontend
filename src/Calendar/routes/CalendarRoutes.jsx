import { Route, Routes } from "react-router-dom";
import { CalendarPage } from "../pages/CalendarPage";

export const CalendarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage></CalendarPage>}></Route>
    </Routes>
  );
};
