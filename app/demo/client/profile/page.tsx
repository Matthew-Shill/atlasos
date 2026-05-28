"use client";

import { usePortalClient } from "@/lib/client-portal";
import { PageHeader } from "@/components/demo/page-header";
import { CompanyLogo } from "@/components/demo/company-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ClientProfilePage() {
  const { clientId, client } = usePortalClient();

  if (!client) return null;

  return (
    <>
      <PageHeader title="Profile" description="Your account details" />

      <Card className="max-w-lg">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <CompanyLogo clientId={clientId} name={client.name} size={64} />
            <div>
              <p className="font-semibold">{client.name}</p>
              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input defaultValue={client.name} className="mt-1" />
            </div>
            <div>
              <Label>Email</Label>
              <Input defaultValue={client.email} type="email" className="mt-1" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input defaultValue={client.phone} type="tel" className="mt-1" />
            </div>
          </div>
          <Button onClick={() => toast.success("Profile saved (demo)")}>
            Save changes
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
