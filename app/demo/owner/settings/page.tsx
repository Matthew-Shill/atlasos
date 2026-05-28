"use client";

import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { services, teamMembers } from "@/lib/data/seed";
import { toast } from "sonner";

export default function SettingsPage() {
  const settings = useDemoStore((s) => s.settings);
  const updateSettings = useDemoStore((s) => s.updateSettings);

  return (
    <>
      <PageHeader title="Settings" description="Business configuration" />
      <Tabs defaultValue="business">
        <TabsList>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="mt-4">
          <Card className="max-w-lg">
            <CardContent className="p-6 space-y-4">
              <div>
                <Label>Business name</Label>
                <Input
                  defaultValue={settings.business.name}
                  onBlur={(e) =>
                    updateSettings({
                      business: { ...settings.business, name: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input defaultValue={settings.business.website} />
              </div>
              <div>
                <Label>Timezone</Label>
                <Input defaultValue={settings.business.timezone} />
              </div>
              <div>
                <Label>Contact email</Label>
                <Input defaultValue={settings.business.contactEmail} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4 space-y-2">
          {teamMembers.map((m) => (
            <Card key={m.id}>
              <CardContent className="flex justify-between p-4">
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.email}</p>
                </div>
                <Badge variant="outline">{m.role}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="services" className="mt-4 space-y-2">
          {services.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex justify-between p-4 text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="text-muted-foreground">
                  {s.duration} min · ${s.price}
                </span>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="max-w-lg">
            <CardContent className="p-6 space-y-4">
              {(
                [
                  ["emailReminders", "Email reminders"],
                  ["smsReminders", "SMS reminders"],
                  ["internalAlerts", "Internal alerts"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <Switch
                    checked={settings.notifications[key]}
                    onCheckedChange={(checked) => {
                      updateSettings({
                        notifications: {
                          ...settings.notifications,
                          [key]: checked,
                        },
                      });
                      toast.success("Settings saved");
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4 grid gap-3 sm:grid-cols-2">
          {settings.integrations.map((int) => (
            <Card key={int.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between items-center">
                  {int.name}
                  <Badge
                    variant={
                      int.status === "connected"
                        ? "default"
                        : int.status === "coming_soon"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {int.status === "connected"
                      ? "Connected"
                      : int.status === "coming_soon"
                        ? "Coming soon"
                        : "Not connected"}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
}
