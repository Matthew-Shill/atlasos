"use client";

import { use } from "react";
import Link from "next/link";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import { toast } from "sonner";

export default function AutomationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const automation = useDemoStore((s) => s.automations.find((a) => a.id === id));
  const toggle = useDemoStore((s) => s.toggleAutomation);
  const runTest = useDemoStore((s) => s.runAutomationTest);
  const lastTest = useDemoStore((s) => s.lastAutomationTest);

  if (!automation) {
    return <p>Automation not found</p>;
  }

  return (
    <>
      <PageHeader
        title={automation.name}
        description="Visual workflow builder"
        actions={
          <ButtonLink href="/demo/owner/automations" variant="outline">
            Back
          </ButtonLink>
        }
      />

      <div className="mb-4 flex items-center gap-3">
        <Switch checked={automation.active} onCheckedChange={() => toggle(id)} />
        <span className="text-sm">{automation.active ? "Active" : "Inactive"}</span>
      </div>

      <div className="max-w-md space-y-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-primary mb-1">WHEN</p>
            <p className="font-medium">{automation.trigger}</p>
          </CardContent>
        </Card>
        {automation.condition && (
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-primary mb-1">IF</p>
              <p className="font-medium">{automation.condition}</p>
            </CardContent>
          </Card>
        )}
        {automation.actions.map((action) => (
          <Card key={action.id}>
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-primary mb-1">THEN</p>
              <p className="font-medium">{action.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        className="mt-6"
        onClick={() => {
          const run = runTest(id);
          toast.success("Automation test completed");
        }}
      >
        Run test
      </Button>

      {lastTest && lastTest.automationId === id && (
        <Card className="mt-6 max-w-md">
          <CardContent className="p-4">
            <p className="font-semibold mb-3">Test completed:</p>
            <ul className="space-y-2">
              {lastTest.steps.map((step, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-atlas-success" />
                  {step.label}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}
