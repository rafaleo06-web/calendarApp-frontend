import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CalendarRoutes } from "../Calendar/routes/CalendarRoutes";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const status = "not-authenticated";
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Loading...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<AuthRoutes></AuthRoutes>}></Route>
          <Route path="/*" element={<Navigate to={"/auth/login"}></Navigate>}></Route>
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarRoutes></CalendarRoutes>}></Route>
          <Route path="/*" element={<Navigate to={"/"}></Navigate>}></Route>
        </>
      )}
    </Routes>
  );
};
