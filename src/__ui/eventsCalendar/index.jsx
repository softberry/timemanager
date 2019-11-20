import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import "./calendar.scss"; // webpack must be configured to do this

function EventsCalender() {
  return <FullCalendar defaultView="timeGridDay" plugins={[timeGridPlugin]} />;
}

export default EventsCalender;
