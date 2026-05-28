import { format, formatDistanceToNow, isToday, isTomorrow, parseISO } from "date-fns";

export function formatDate(dateStr: string): string {
  const d = parseISO(dateStr);
  if (isToday(d)) return `Today, ${format(d, "h:mm a")}`;
  if (isTomorrow(d)) return `Tomorrow, ${format(d, "h:mm a")}`;
  return format(d, "MMM d, h:mm a");
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d, yyyy");
}

export function formatRelative(dateStr: string): string {
  return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
