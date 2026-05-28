"use client";

import { TasksTable } from "@/components/demo/tasks-table";
import { DEMO_TEAM_MEMBER_ID } from "@/lib/demo-team";

export default function TeamTasksPage() {
  return (
    <TasksTable
      assignedToId={DEMO_TEAM_MEMBER_ID}
      clientBasePath="/demo/team/clients"
      allowReassign={false}
      description="Your assigned to-dos and follow-ups"
    />
  );
}
