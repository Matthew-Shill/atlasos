export type UserRole = "owner" | "client" | "team";

export type ClientStatus =
  | "Lead"
  | "Trial"
  | "Active"
  | "Past Due"
  | "Paused"
  | "Archived";

export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Reschedule requested"
  | "Completed"
  | "Canceled"
  | "No-show";

export type InvoiceStatus =
  | "Paid"
  | "Open"
  | "Past Due"
  | "Failed"
  | "Refunded";

export type TaskStatus = "To do" | "In progress" | "Waiting" | "Done";

export type TaskPriority = "Low" | "Medium" | "High";

export type IntakeStatus = "new" | "reviewed" | "converted" | "archived";

export type MessageLabel =
  | "New lead"
  | "Active client"
  | "Billing issue"
  | "Scheduling"
  | "Needs reply";

export type ConversationType = "client" | "internal" | "system";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Business {
  id: string;
  name: string;
  website: string;
  timezone: string;
  contactEmail: string;
  logo?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  service: string;
  assignedTeamMemberId: string;
  nextAppointment?: string;
  balance: number;
  totalRevenue: number;
  lastActivity: string;
  plan?: string;
  createdAt: string;
}

export interface ClientNote {
  id: string;
  clientId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  pinned?: boolean;
}

export interface Document {
  id: string;
  clientId: string;
  name: string;
  type: string;
  uploadedAt: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  duration: number;
  teamMemberId: string;
  teamMemberName: string;
  status: AppointmentStatus;
  location?: string;
  notes?: string;
  paymentStatus?: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  body: string;
  createdAt: string;
  isInternal?: boolean;
}

export interface MessageThread {
  id: string;
  clientId?: string;
  clientName: string;
  subject: string;
  label?: MessageLabel;
  type: ConversationType;
  unread: number;
  lastMessage: string;
  lastMessageAt: string;
  resolved?: boolean;
  assignedToId?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  lineItems: { description: string; amount: number }[];
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  clientId?: string;
  clientName?: string;
  assignedToId: string;
  assignedToName: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface AutomationAction {
  id: string;
  type: string;
  label: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  condition?: string;
  actions: AutomationAction[];
  active: boolean;
}

export interface AutomationRun {
  id: string;
  automationId: string;
  steps: { label: string; success: boolean }[];
  ranAt: string;
}

export interface IntakeSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  budget?: string;
  notes?: string;
  status: IntakeStatus;
  submittedAt: string;
  assignedToId?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface ActivityEvent {
  id: string;
  clientId?: string;
  clientName?: string;
  type: string;
  description: string;
  createdAt: string;
}

export interface OnboardingItem {
  id: string;
  clientId: string;
  label: string;
  completed: boolean;
}

export interface BusinessSettings {
  business: Business;
  notifications: {
    emailReminders: boolean;
    smsReminders: boolean;
    internalAlerts: boolean;
  };
  integrations: {
    id: string;
    name: string;
    status: "connected" | "disconnected" | "coming_soon";
  }[];
}

export interface GuidedStep {
  id: string;
  label: string;
  href: string;
  completed: boolean;
}

export type ClientFilter =
  | "all"
  | "leads"
  | "active"
  | "past_due"
  | "follow_up"
  | "recent";
