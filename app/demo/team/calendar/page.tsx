"use client";

import { CalendarView } from "@/components/demo/calendar-view";
import { DEMO_TEAM_MEMBER_ID } from "@/lib/demo-team";

export default function TeamCalendarPage() {
  return (
    <CalendarView
      teamMemberId={DEMO_TEAM_MEMBER_ID}
      allowBooking={false}
      description="Your appointments and schedule"
    />
  );
}
