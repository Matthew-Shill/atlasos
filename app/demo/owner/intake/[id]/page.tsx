"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teamMembers } from "@/lib/data/seed";
import { toast } from "sonner";

export default function IntakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const intake = useDemoStore((s) => s.intakeSubmissions.find((i) => i.id === id));
  const convert = useDemoStore((s) => s.convertIntakeToClient);
  const assign = useDemoStore((s) => s.assignIntake);
  const updateStatus = useDemoStore((s) => s.updateIntakeStatus);
  const allClients = useDemoStore((s) => s.clients);

  if (!intake) return <p>Submission not found</p>;

  const convertedClient = allClients.find((c) => c.email === intake.email);

  return (
    <>
      <PageHeader
        title={intake.name}
        description={`${intake.service} inquiry`}
        actions={
          <>
            {intake.status !== "converted" && (
              <Button
                onClick={() => {
                  const client = convert(id);
                  if (client) {
                    toast.success(`${intake.name} converted to client`);
                    router.push(`/demo/owner/clients/${client.id}`);
                  }
                }}
              >
                Convert to client
              </Button>
            )}
            {intake.status === "converted" && convertedClient && (
              <ButtonLink href={`/demo/owner/clients/${convertedClient.id}`}>
                View client profile
              </ButtonLink>
            )}
            <ButtonLink href="/demo/owner/intake" variant="outline">
              Back
            </ButtonLink>
          </>
        }
      />
      <Card className="max-w-xl">
        <CardContent className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-muted-foreground">Email</span>
            <span>{intake.email}</span>
            <span className="text-muted-foreground">Phone</span>
            <span>{intake.phone}</span>
            <span className="text-muted-foreground">Budget</span>
            <span>{intake.budget ?? "—"}</span>
            <span className="text-muted-foreground">Preferred date</span>
            <span>{intake.preferredDate ?? "—"}</span>
          </div>
          {intake.notes && (
            <div>
              <p className="text-muted-foreground mb-1">Notes</p>
              <p>{intake.notes}</p>
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <Select
              value={intake.assignedToId ?? ""}
              onValueChange={(v) => v && assign(id, v)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Assign team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                updateStatus(id, "reviewed");
                toast.success("Marked as reviewed");
              }}
            >
              Mark reviewed
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
