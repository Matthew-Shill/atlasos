import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AppointmentStatus, ClientStatus, InvoiceStatus, TaskStatus } from "@/lib/types";

const clientColors: Record<ClientStatus, string> = {
  Lead: "bg-blue-50 text-blue-700 border-blue-200",
  Trial: "bg-purple-50 text-purple-700 border-purple-200",
  Active: "bg-green-50 text-green-700 border-green-200",
  "Past Due": "bg-amber-50 text-amber-700 border-amber-200",
  Paused: "bg-slate-50 text-slate-600 border-slate-200",
  Archived: "bg-slate-50 text-slate-500 border-slate-200",
};

const invoiceColors: Record<InvoiceStatus, string> = {
  Paid: "bg-green-50 text-green-700 border-green-200",
  Open: "bg-blue-50 text-blue-700 border-blue-200",
  "Past Due": "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-red-50 text-red-700 border-red-200",
  Refunded: "bg-slate-50 text-slate-600 border-slate-200",
};

const aptColors: Record<AppointmentStatus, string> = {
  Confirmed: "bg-green-50 text-green-700 border-green-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  "Reschedule requested": "bg-orange-50 text-orange-700 border-orange-200",
  Completed: "bg-slate-50 text-slate-600 border-slate-200",
  Canceled: "bg-red-50 text-red-700 border-red-200",
  "No-show": "bg-red-50 text-red-700 border-red-200",
};

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", clientColors[status])}>
      {status}
    </Badge>
  );
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", invoiceColors[status])}>
      {status}
    </Badge>
  );
}

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", aptColors[status])}>
      {status}
    </Badge>
  );
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const colors: Record<TaskStatus, string> = {
    "To do": "bg-slate-50 text-slate-700 border-slate-200",
    "In progress": "bg-blue-50 text-blue-700 border-blue-200",
    Waiting: "bg-amber-50 text-amber-700 border-amber-200",
    Done: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <Badge variant="outline" className={cn("font-medium", colors[status])}>
      {status}
    </Badge>
  );
}
