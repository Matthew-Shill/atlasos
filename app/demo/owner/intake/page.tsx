"use client";

import Link from "next/link";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRelative } from "@/lib/format";

export default function IntakePage() {
  const submissions = useDemoStore((s) => s.intakeSubmissions);

  return (
    <>
      <PageHeader title="Intake forms" description="New inquiries and submissions" />
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.service}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatRelative(s.submittedAt)}</TableCell>
                <TableCell>
                  <Link
                    href={`/demo/owner/intake/${s.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
