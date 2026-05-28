"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppointmentStatusBadge } from "@/components/demo/status-badge";
import { formatDate } from "@/lib/format";
import { useDemoStore } from "@/lib/store/demo-store";
import type { Appointment } from "@/lib/types";
import { toast } from "sonner";

export function AppointmentDetailDialog({
  appointment,
  open,
  onOpenChange,
}: {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const markStatus = useDemoStore((s) => s.markAppointmentStatus);

  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {appointment.service}
            <AppointmentStatusBadge status={appointment.status} />
          </DialogTitle>
        </DialogHeader>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Client</dt>
            <dd className="font-medium">{appointment.clientName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">When</dt>
            <dd className="font-medium">{formatDate(appointment.date)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Staff</dt>
            <dd>{appointment.teamMemberName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Location</dt>
            <dd>{appointment.location ?? "TBD"}</dd>
          </div>
          {appointment.notes && (
            <div>
              <dt className="text-muted-foreground">Notes</dt>
              <dd>{appointment.notes}</dd>
            </div>
          )}
          {appointment.paymentStatus && (
            <div>
              <dt className="text-muted-foreground">Payment</dt>
              <dd>{appointment.paymentStatus}</dd>
            </div>
          )}
        </dl>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            size="sm"
            onClick={() => {
              markStatus(appointment.id, "Completed");
              toast.success("Marked complete");
              onOpenChange(false);
            }}
          >
            Mark complete
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              markStatus(appointment.id, "Reschedule requested");
              toast.info("Reschedule requested");
            }}
          >
            Reschedule
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              markStatus(appointment.id, "Canceled");
              toast.info("Appointment canceled");
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
