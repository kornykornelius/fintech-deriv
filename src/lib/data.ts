export interface Recipient {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  direction: "in" | "out";
  status: "completed" | "pending";
}

export const recipients: Recipient[] = [
  { id: "r1", name: "Alex Rivera", email: "alexrivera@gmail.com", initials: "AR" },
  { id: "r2", name: "Jordan Tan", email: "jordantan@gmail.com", initials: "JT" },
  { id: "r3", name: "Marcus Chen", email: "marcuschen@gmail.com", initials: "MC" },
  { id: "r4", name: "Marcus Cole", email: "marcuscole@gmail.com", initials: "MC" },
];

export const initialTransactions: Transaction[] = [
  { id: "t1", name: "Alex Rivera", date: "Jul 21", amount: 100, direction: "out", status: "completed" },
  { id: "t2", name: "Lucas Ng", date: "Jul 20", amount: 50, direction: "in", status: "completed" },
  { id: "t3", name: "Jordan Tan", date: "Jul 20", amount: 100, direction: "out", status: "completed" },
  { id: "t4", name: "Marcus Chen", date: "Jul 17", amount: 100, direction: "out", status: "pending" },
  { id: "t5", name: "Sofia Reyes", date: "Jul 1", amount: 50, direction: "in", status: "completed" },
];

export const INITIAL_BALANCE = 1590;

export function formatRM(amount: number): string {
  return `RM ${amount.toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function parseAmount(value: string): number {
  const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}
