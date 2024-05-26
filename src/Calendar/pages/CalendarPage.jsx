import { Calendar } from "react-big-calendar";
import { localizer } from "../helpers/calendarLocalizar";
import { getMessagesEs } from "../helpers/getMessages";

import { Navbar } from "../components/Navbar";
import { CalendarEvent } from "../components/CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

// const events = [
//   {
//     title: "cumpleaños",
//     notes: "cumpleaños 2",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//       _id: "123",
//       name: "Fernando",
//     },
//   },
// ];

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  //todo: getItem is obtain THE VALUE of key 'lastView'
  //todo: if key 'lastView' return value 'null' then asigned 'week'
  const [lastView, setlastView] = useState(localStorage.getItem("lastView") || "week");

  const eventStyleGetter = (event) => {
    const isMyEvent = user.uid === event.user?._id || user.uid === event.user?.uid;
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      color: "white",
      borderRadius: "0px",
      opacity: 0.9,
      border: "none",
    };
    return { style };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    setlastView(localStorage.setItem("lastView", event));
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal></CalendarModal>
      <FabAddNew></FabAddNew>
      <FabDelete></FabDelete>
    </>
  );
};
