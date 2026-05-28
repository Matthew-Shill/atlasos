"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useDemoStore } from "@/lib/store/demo-store";
import { teamMembers } from "@/lib/data/seed";
import { PageHeader } from "@/components/demo/page-header";
import { TaskStatusBadge } from "@/components/demo/status-badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateShort } from "@/lib/format";
import { toast } from "sonner";

export function TasksTable({
  assignedToId,
  clientBasePath = "/demo/owner/clients",
  allowReassign = true,
  description = "Team to-dos and follow-ups",
}: {
  assignedToId?: string;
  clientBasePath?: string;
  allowReassign?: boolean;
  description?: string;
}) {
  const allTasks = useDemoStore((s) => s.tasks);
  const complete = useDemoStore((s) => s.completeTask);
  const reassign = useDemoStore((s) => s.reassignTask);

  const tasks = useMemo(
    () =>
      assignedToId
        ? allTasks.filter((t) => t.assignedToId === assignedToId)
        : allTasks,
    [allTasks, assignedToId]
  );

  return (
    <>
      <PageHeader title="Tasks" description={description} />
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Client</TableHead>
              {allowReassign && <TableHead>Assigned</TableHead>}
              <TableHead>Due</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={allowReassign ? 7 : 6}
                  className="text-center text-muted-foreground"
                >
                  No tasks assigned.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell>
                    {t.clientId ? (
                      <Link
                        href={`${clientBasePath}/${t.clientId}`}
                        className="text-primary hover:underline"
                      >
                        {t.clientName}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  {allowReassign && (
                    <TableCell>
                      <Select
                        value={t.assignedToId}
                        onValueChange={(v) => {
                          if (!v) return;
                          const m = teamMembers.find((x) => x.id === v);
                          if (m) reassign(t.id, m.id, m.name);
                        }}
                      >
                        <SelectTrigger className="h-8 w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                  <TableCell>{formatDateShort(t.dueDate)}</TableCell>
                  <TableCell>{t.priority}</TableCell>
                  <TableCell>
                    <TaskStatusBadge status={t.status} />
                  </TableCell>
                  <TableCell>
                    {t.status !== "Done" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          complete(t.id);
                          toast.success("Task completed");
                        }}
                      >
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
