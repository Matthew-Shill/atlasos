"use client";

import Link from "next/link";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";

export default function AutomationsPage() {
  const automations = useDemoStore((s) => s.automations);
  const toggle = useDemoStore((s) => s.toggleAutomation);

  return (
    <>
      <PageHeader
        title="Automations"
        description="Workflows that run your business on autopilot"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {automations.map((a) => (
          <Card key={a.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{a.name}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              </div>
              <Switch checked={a.active} onCheckedChange={() => toggle(a.id)} />
            </CardHeader>
            <CardContent>
              <p className="text-xs font-medium text-muted-foreground">WHEN</p>
              <p className="text-sm mb-3">{a.trigger}</p>
              {a.condition && (
                <>
                  <p className="text-xs font-medium text-muted-foreground">IF</p>
                  <p className="text-sm mb-3">{a.condition}</p>
                </>
              )}
              <p className="text-xs font-medium text-muted-foreground">THEN</p>
              <ul className="text-sm space-y-1 mb-4">
                {a.actions.map((action) => (
                  <li key={action.id}>• {action.label}</li>
                ))}
              </ul>
              <div className="flex items-center gap-2">
                <Badge variant={a.active ? "default" : "secondary"}>
                  {a.active ? "Active" : "Inactive"}
                </Badge>
                <ButtonLink href={`/demo/owner/automations/${a.id}`} size="sm" variant="outline">
                  Edit & test
                </ButtonLink>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
