import type { Client } from "@/lib/types";

/** Demo team member (Jordan Lee) for /demo/team views */
export const DEMO_TEAM_MEMBER_ID = "tm-2";

export function getClientsForTeamMember(
  clients: Client[],
  memberId: string = DEMO_TEAM_MEMBER_ID
) {
  return clients.filter((c) => c.assignedTeamMemberId === memberId);
}

export function getAssignedClientIds(
  clients: Client[],
  memberId: string = DEMO_TEAM_MEMBER_ID
) {
  return getClientsForTeamMember(clients, memberId).map((c) => c.id);
}
