import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendar/calendarSlice";
import uiSlice from "./ui/uiSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    ui: uiSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
