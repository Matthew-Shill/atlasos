import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Calendar,
  CreditCard,
  FileInput,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Workflow,
  CheckSquare,
  User,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const ownerNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/demo/owner", label: "Dashboard", icon: LayoutDashboard },
      { href: "/demo/owner/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Clients & scheduling",
    items: [
      { href: "/demo/owner/clients", label: "Clients", icon: Users },
      { href: "/demo/owner/calendar", label: "Calendar", icon: Calendar },
      { href: "/demo/owner/messages", label: "Messages", icon: MessageSquare },
      { href: "/demo/owner/intake", label: "Intake forms", icon: FileInput },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/demo/owner/automations", label: "Automations", icon: Workflow },
      { href: "/demo/owner/billing", label: "Billing", icon: CreditCard },
      { href: "/demo/owner/tasks", label: "Tasks", icon: CheckSquare },
    ],
  },
  {
    label: "Settings",
    items: [{ href: "/demo/owner/settings", label: "Settings", icon: Settings }],
  },
];

export const teamNavGroups: NavGroup[] = [
  {
    label: "Today",
    items: [
      { href: "/demo/team", label: "Dashboard", icon: LayoutDashboard },
      { href: "/demo/team/calendar", label: "Calendar", icon: Calendar },
    ],
  },
  {
    label: "Work",
    items: [
      { href: "/demo/team/clients", label: "My clients", icon: Users },
      { href: "/demo/team/messages", label: "Messages", icon: MessageSquare },
      { href: "/demo/team/tasks", label: "Tasks", icon: CheckSquare },
    ],
  },
];

export const clientNavGroups: NavGroup[] = [
  {
    label: "Portal",
    items: [
      { href: "/demo/client", label: "Home", icon: LayoutDashboard },
      { href: "/demo/client/appointments", label: "Appointments", icon: Calendar },
      { href: "/demo/client/messages", label: "Messages", icon: MessageSquare },
      { href: "/demo/client/documents", label: "Documents", icon: FileText },
      { href: "/demo/client/payments", label: "Payments", icon: CreditCard },
      { href: "/demo/client/profile", label: "Profile", icon: User },
    ],
  },
];
