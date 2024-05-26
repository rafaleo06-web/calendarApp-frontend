import { useDispatch, useSelector } from "react-redux";
import {
  onActiveDate,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api/calendarApi";
import { convertEventsToDateEvents } from "../Calendar/helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onActiveDate(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      //todo: UPDATE EVENT
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent(calendarEvent));
        return;
      }
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ id: data.eventSave.id, ...calendarEvent, user }));
    } catch (error) {
      Swal.fire("error al guardar", error.response.data.msg);
    }
  };

  const startDeleteEvent = async () => {
    await calendarApi.delete(`/events/${activeEvent.id}`);
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const eventsFilterUserCurrent = data.events.filter((event) => event.user._id === user.uid);
      const events = convertEventsToDateEvents(eventsFilterUserCurrent);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    hasEventSelected: !!activeEvent,
    startLoadingEvents,
  };
};
