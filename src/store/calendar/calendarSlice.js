import { createSlice } from "@reduxjs/toolkit";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "cumpleaños",
//   notes: "cumpleaños 2",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Rafael",
//   },
// };

const initialState = {
  // checking, not-authenticated, authenticated
  isLoadingEvents: true,
  events: [
    // tempEvent
  ],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onActiveDate: (state, action) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      //state.events = state.events.filter((event) => event._id !== state.activeEvent._id);
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = payload;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onActiveDate,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onNotActiveWhenCloseModal,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;

export default calendarSlice.reducer;
