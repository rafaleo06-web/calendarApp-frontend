import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api/calendarApi";
import { checking, onErrorRegister, onLogin, onLogout, onRegister } from "../store/auth/authSlice";
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(checking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("incorrect credentials "));
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      dispatch(checking());
      const { data } = await calendarApi.post("/auth/new", { name, email, password });
      localStorage.setItem("token", data.token);
      dispatch(onRegister({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onErrorRegister(error.response.data?.msg || "---"));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());
    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return { status, user, errorMessage, startLogin, startRegister, checkAuthToken, startLogout };
};
