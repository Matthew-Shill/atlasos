"use client";

import { create } from "zustand";
import {
  activityEvents,
  appointments,
  automationRuns,
  automations,
  businessSettings,
  clientNotes,
  clients,
  documents,
  guidedSteps,
  intakeSubmissions,
  invoices,
  messageThreads,
  messages,
  onboardingItems,
  SARAH_CLIENT_ID,
  SARAH_INTAKE_ID,
  tasks,
  teamMembers,
} from "@/lib/data/seed";
import type {
  ActivityEvent,
  Appointment,
  AppointmentStatus,
  AutomationRun,
  Client,
  ClientFilter,
  ClientNote,
  ClientStatus,
  GuidedStep,
  IntakeSubmission,
  Invoice,
  Message,
  MessageThread,
  OnboardingItem,
  Task,
  UserRole,
} from "@/lib/types";

interface BookAppointmentPayload {
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  teamMemberId: string;
  teamMemberName: string;
  duration: number;
}

interface DemoState {
  role: UserRole;
  currentClientId: string;
  clients: Client[];
  appointments: Appointment[];
  messageThreads: MessageThread[];
  messages: Message[];
  invoices: Invoice[];
  tasks: Task[];
  automations: typeof automations;
  automationRuns: AutomationRun[];
  intakeSubmissions: IntakeSubmission[];
  clientNotes: ClientNote[];
  documents: typeof documents;
  activityEvents: ActivityEvent[];
  onboardingItems: OnboardingItem[];
  guidedSteps: GuidedStep[];
  guidedBannerDismissed: boolean;
  settings: typeof businessSettings;
  clientSearch: string;
  clientFilter: ClientFilter;
  lastAutomationTest: AutomationRun | null;

  setRole: (role: UserRole) => void;
  setCurrentClientId: (id: string) => void;
  setClientSearch: (q: string) => void;
  setClientFilter: (f: ClientFilter) => void;
  dismissGuidedBanner: () => void;

  getClient: (id: string) => Client | undefined;
  getFilteredClients: () => Client[];
  getDashboardStats: () => {
    monthlyRevenue: number;
    activeClients: number;
    upcomingThisWeek: number;
    unreadMessages: number;
    openTasks: number;
    leadConversion: number;
  };
  getTodaySchedule: () => Appointment[];
  getClientTimeline: (clientId: string) => ActivityEvent[];
  getThreadMessages: (threadId: string) => Message[];

  sendMessage: (
    threadId: string,
    body: string,
    senderName?: string,
    senderId?: string
  ) => void;
  markThreadRead: (threadId: string) => void;
  ensureClientThread: (clientId: string, subject?: string) => string | null;
  markThreadResolved: (threadId: string) => void;
  completeTask: (taskId: string) => void;
  reassignTask: (taskId: string, memberId: string, memberName: string) => void;
  toggleAutomation: (id: string) => void;
  runAutomationTest: (id: string) => AutomationRun;
  bookAppointment: (payload: BookAppointmentPayload) => Appointment;
  convertIntakeToClient: (intakeId: string) => Client | null;
  updateClientStatus: (clientId: string, status: ClientStatus) => void;
  markAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addNote: (clientId: string, content: string, authorName?: string) => void;
  toggleOnboardingItem: (itemId: string) => void;
  createInvoiceForClient: (clientId: string) => Invoice;
  sendInvoiceReminder: (invoiceId: string) => void;
  updateIntakeStatus: (id: string, status: IntakeSubmission["status"]) => void;
  assignIntake: (id: string, memberId: string) => void;
  updateSettings: (partial: Partial<typeof businessSettings>) => void;
  completeGuidedStep: (stepId: string) => void;
}

function uniqueId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function addActivity(
  events: ActivityEvent[],
  event: Omit<ActivityEvent, "id" | "createdAt">
): ActivityEvent[] {
  return [
    {
      ...event,
      id: uniqueId("act"),
      createdAt: new Date().toISOString(),
    },
    ...events,
  ];
}

export const useDemoStore = create<DemoState>((set, get) => ({
  role: "owner",
  currentClientId: "client-marcus",
  clients: [...clients],
  appointments: [...appointments],
  messageThreads: [...messageThreads],
  messages: [...messages],
  invoices: [...invoices],
  tasks: [...tasks],
  automations: automations.map((a) => ({ ...a })),
  automationRuns: [...automationRuns],
  intakeSubmissions: [...intakeSubmissions],
  clientNotes: [...clientNotes],
  documents: [...documents],
  activityEvents: [...activityEvents],
  onboardingItems: [...onboardingItems],
  guidedSteps: guidedSteps.map((s) => ({ ...s })),
  guidedBannerDismissed: false,
  settings: { ...businessSettings, business: { ...businessSettings.business } },
  clientSearch: "",
  clientFilter: "all",
  lastAutomationTest: null,

  setRole: (role) => set({ role }),
  setCurrentClientId: (id) => set({ currentClientId: id }),
  setClientSearch: (q) => set({ clientSearch: q }),
  setClientFilter: (f) => set({ clientFilter: f }),
  dismissGuidedBanner: () => set({ guidedBannerDismissed: true }),

  getClient: (id) => get().clients.find((c) => c.id === id),

  getFilteredClients: () => {
    const { clients: list, clientSearch, clientFilter } = get();
    let filtered = list;
    const q = clientSearch.toLowerCase();
    if (q) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.service.toLowerCase().includes(q) ||
          c.status.toLowerCase().includes(q)
      );
    }
    switch (clientFilter) {
      case "leads":
        filtered = filtered.filter((c) => c.status === "Lead");
        break;
      case "active":
        filtered = filtered.filter((c) => c.status === "Active" || c.status === "Trial");
        break;
      case "past_due":
        filtered = filtered.filter((c) => c.status === "Past Due");
        break;
      case "follow_up":
        filtered = filtered.filter((c) => c.balance > 0 || c.status === "Lead");
        break;
      case "recent":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).slice(0, 8);
        break;
    }
    return filtered;
  },

  getDashboardStats: () => {
    const state = get();
    const weekEnd = new Date();
    weekEnd.setDate(weekEnd.getDate() + 7);
    const upcoming = state.appointments.filter((a) => {
      const d = new Date(a.date);
      return d >= new Date() && d <= weekEnd && a.status !== "Canceled" && a.status !== "Completed";
    });
    return {
      monthlyRevenue: 18420,
      activeClients: state.clients.filter((c) => c.status === "Active" || c.status === "Trial").length,
      upcomingThisWeek: upcoming.length,
      unreadMessages: state.messageThreads.reduce((s, t) => s + t.unread, 0),
      openTasks: state.tasks.filter((t) => t.status !== "Done").length,
      leadConversion: 38,
    };
  },

  getTodaySchedule: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return get()
      .appointments.filter((a) => {
        const d = new Date(a.date);
        return d >= today && d < tomorrow && a.status !== "Canceled";
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  getClientTimeline: (clientId) =>
    get().activityEvents.filter((e) => e.clientId === clientId),

  getThreadMessages: (threadId) =>
    get()
      .messages.filter((m) => m.threadId === threadId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),

  sendMessage: (threadId, body, senderName = "Alex Rivera", senderId = "tm-1") => {
    const targetThread = get().messageThreads.find((t) => t.id === threadId);
    if (!targetThread) return;
    const msg: Message = {
      id: uniqueId("msg"),
      threadId,
      senderId,
      senderName,
      body,
      createdAt: new Date().toISOString(),
    };
    const fromStaff = senderId.startsWith("tm");
    set((state) => ({
      messages: [...state.messages, msg],
      messageThreads: state.messageThreads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              lastMessage: body,
              lastMessageAt: msg.createdAt,
              unread: fromStaff ? 0 : t.unread + 1,
            }
          : t
      ),
    }));
    if (
      targetThread.clientId === SARAH_CLIENT_ID &&
      fromStaff &&
      body.trim().length > 0
    ) {
      get().completeGuidedStep("g5");
    }
  },

  markThreadRead: (threadId) => {
    set((state) => ({
      messageThreads: state.messageThreads.map((t) =>
        t.id === threadId ? { ...t, unread: 0 } : t
      ),
    }));
  },

  ensureClientThread: (clientId, subject = "Welcome — next steps") => {
    const existing = get().messageThreads.find((t) => t.clientId === clientId);
    if (existing) return existing.id;
    const client = get().getClient(clientId);
    if (!client) return null;

    const now = new Date().toISOString();
    const threadId = uniqueId("thread");
    const starterMessage: Message = {
      id: uniqueId("msg"),
      threadId,
      senderId: "tm-1",
      senderName: "Alex Rivera",
      body: `Welcome to Northline Studio, ${client.name.split(" ")[0]}! Happy to have you here.`,
      createdAt: now,
    };

    set((state) => ({
      messageThreads: [
        ...state.messageThreads,
        {
          id: threadId,
          clientId,
          clientName: client.name,
          subject,
          label: "Active client",
          type: "client",
          unread: 0,
          lastMessage: starterMessage.body,
          lastMessageAt: now,
          assignedToId: client.assignedTeamMemberId,
        },
      ],
      messages: [...state.messages, starterMessage],
    }));

    return threadId;
  },

  markThreadResolved: (threadId) => {
    set((state) => ({
      messageThreads: state.messageThreads.map((t) =>
        t.id === threadId ? { ...t, resolved: true, unread: 0 } : t
      ),
    }));
  },

  completeTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: "Done" as const } : t
      ),
    }));
  },

  reassignTask: (taskId, memberId, memberName) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, assignedToId: memberId, assignedToName: memberName }
          : t
      ),
    }));
  },

  toggleAutomation: (id) => {
    set((state) => ({
      automations: state.automations.map((a) =>
        a.id === id ? { ...a, active: !a.active } : a
      ),
    }));
  },

  runAutomationTest: (id) => {
    const auto = get().automations.find((a) => a.id === id);
    const steps = auto
      ? auto.actions.map((action) => ({
          label: action.label,
          success: true,
        }))
      : [{ label: "Test step", success: true }];
    const run: AutomationRun = {
      id: `run-${Date.now()}`,
      automationId: id,
      steps: [
        { label: "Intake form received", success: true },
        ...steps,
      ],
      ranAt: new Date().toISOString(),
    };
    set((state) => ({
      lastAutomationTest: run,
      automationRuns: [run, ...state.automationRuns],
      activityEvents: addActivity(state.activityEvents, {
        type: "automation",
        description: `Automation test ran: ${auto?.name ?? id}`,
      }),
    }));
    if (id === "auto-1") {
      get().completeGuidedStep("g6");
    }
    return run;
  },

  bookAppointment: (payload) => {
    const apt: Appointment = {
      id: `apt-${Date.now()}`,
      ...payload,
      status: "Confirmed",
      location: "Zoom — meet.northline/new",
      paymentStatus: "Pending",
    };
    set((state) => ({
      appointments: [...state.appointments, apt],
      clients: state.clients.map((c) =>
        c.id === payload.clientId
          ? { ...c, nextAppointment: payload.date, lastActivity: new Date().toISOString() }
          : c
      ),
      activityEvents: addActivity(state.activityEvents, {
        clientId: payload.clientId,
        clientName: payload.clientName,
        type: "booking",
        description: `${payload.clientName} booked ${payload.service}`,
      }),
    }));
    get().completeGuidedStep("g3");
    return apt;
  },

  convertIntakeToClient: (intakeId) => {
    const intake = get().intakeSubmissions.find((i) => i.id === intakeId);
    if (!intake || intake.status === "converted") return null;

    const isSarah = intakeId === SARAH_INTAKE_ID;
    const clientId = isSarah ? SARAH_CLIENT_ID : uniqueId("client");
    const newClient: Client = {
      id: clientId,
      name: intake.name,
      email: intake.email,
      phone: intake.phone,
      status: "Lead",
      service: intake.service,
      assignedTeamMemberId: intake.assignedToId ?? "tm-2",
      balance: 0,
      totalRevenue: 0,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      plan: "Consultation",
    };

    const sarahOnboarding: OnboardingItem[] = [
      { id: `ob-s1`, clientId, label: "Create account", completed: true },
      { id: `ob-s2`, clientId, label: "Complete intake form", completed: true },
      { id: `ob-s3`, clientId, label: "Upload required document", completed: false },
      { id: `ob-s4`, clientId, label: "Confirm first appointment", completed: false },
      { id: `ob-s5`, clientId, label: "Add payment method", completed: false },
    ];

    const threadId = uniqueId("thread");
    const welcomeMessage = "Welcome to Northline Studio! We're excited to work with you.";
    const newThread: MessageThread = {
      id: threadId,
      clientId,
      clientName: intake.name,
      subject: "Welcome — next steps",
      label: "Active client",
      type: "client",
      unread: 0,
      lastMessage: welcomeMessage,
      lastMessageAt: new Date().toISOString(),
      assignedToId: "tm-2",
    };
    const welcomeMsg: Message = {
      id: uniqueId("msg"),
      threadId,
      senderId: "tm-1",
      senderName: "Alex Rivera",
      body: welcomeMessage,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      clients: [...state.clients, newClient],
      currentClientId: clientId,
      intakeSubmissions: state.intakeSubmissions.map((i) =>
        i.id === intakeId ? { ...i, status: "converted" as const } : i
      ),
      onboardingItems: [...state.onboardingItems, ...sarahOnboarding],
      messageThreads: [...state.messageThreads, newThread],
      messages: [...state.messages, welcomeMsg],
      activityEvents: addActivity(state.activityEvents, {
        clientId,
        clientName: intake.name,
        type: "client",
        description: `${intake.name} converted from intake to client`,
      }),
    }));

    get().completeGuidedStep("g2");
    if (isSarah) {
      get().runAutomationTest("auto-1");
    }
    return newClient;
  },

  updateClientStatus: (clientId, status) => {
    set((state) => ({
      clients: state.clients.map((c) =>
        c.id === clientId ? { ...c, status } : c
      ),
    }));
  },

  markAppointmentStatus: (id, status) => {
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    }));
  },

  addNote: (clientId, content, authorName = "Alex Rivera") => {
    const note: ClientNote = {
      id: uniqueId("note"),
      clientId,
      authorId: "tm-1",
      authorName,
      content,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ clientNotes: [note, ...state.clientNotes] }));
  },

  toggleOnboardingItem: (itemId) => {
    set((state) => ({
      onboardingItems: state.onboardingItems.map((i) =>
        i.id === itemId ? { ...i, completed: !i.completed } : i
      ),
    }));
  },

  createInvoiceForClient: (clientId) => {
    const client = get().getClient(clientId);
    if (!client) throw new Error("Client not found");
    const inv: Invoice = {
      id: uniqueId("inv"),
      number: `INV-${1047 + get().invoices.length}`,
      clientId,
      clientName: client.name,
      amount: 250,
      status: "Open",
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      lineItems: [{ description: client.service, amount: 250 }],
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      invoices: [inv, ...state.invoices],
      clients: state.clients.map((c) =>
        c.id === clientId ? { ...c, balance: c.balance + inv.amount } : c
      ),
      activityEvents: addActivity(state.activityEvents, {
        clientId,
        clientName: client.name,
        type: "billing",
        description: `Invoice ${inv.number} created for ${client.name}`,
      }),
    }));
    return inv;
  },

  sendInvoiceReminder: () => {
    /* toast handled in UI */
  },

  updateIntakeStatus: (id, status) => {
    set((state) => ({
      intakeSubmissions: state.intakeSubmissions.map((i) =>
        i.id === id ? { ...i, status } : i
      ),
    }));
    if (id === SARAH_INTAKE_ID && status === "reviewed") {
      get().completeGuidedStep("g1");
    }
  },

  assignIntake: (id, memberId) => {
    set((state) => ({
      intakeSubmissions: state.intakeSubmissions.map((i) =>
        i.id === id ? { ...i, assignedToId: memberId } : i
      ),
    }));
  },

  updateSettings: (partial) => {
    set((state) => ({
      settings: { ...state.settings, ...partial },
    }));
  },

  completeGuidedStep: (stepId) => {
    set((state) => ({
      guidedSteps: state.guidedSteps.map((s) =>
        s.id === stepId ? { ...s, completed: true } : s
      ),
    }));
  },
}));

export { teamMembers, services } from "@/lib/data/seed";
