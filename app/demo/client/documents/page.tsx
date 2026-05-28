"use client";

import { useMemo } from "react";
import { usePortalClient } from "@/lib/client-portal";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Button } from "@/components/ui/button";
import { formatRelative } from "@/lib/format";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function ClientDocumentsPage() {
  const { clientId, client } = usePortalClient();
  const allDocuments = useDemoStore((s) => s.documents);

  const docs = useMemo(
    () => allDocuments.filter((d) => d.clientId === clientId),
    [allDocuments, clientId]
  );

  if (!client) return null;

  return (
    <>
      <PageHeader
        title="Documents"
        description="Files shared with you by your team"
      />
      <div className="space-y-2">
        {docs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No documents yet.</p>
        ) : (
          docs.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between rounded-lg border bg-card p-4 text-sm"
            >
              <div>
                <p className="font-medium">{d.name}</p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {d.type} · Uploaded {formatRelative(d.uploadedAt)}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => toast.info("Download started (demo)")}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
