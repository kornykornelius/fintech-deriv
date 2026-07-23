import { ArrowDown, ArrowRight, ArrowUp, Plus } from "lucide-react";
import { Avatar, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatRM, type Recipient, type Transaction } from "@/lib/data";

interface DashboardScreenProps {
  balance: number;
  recipients: Recipient[];
  transactions: Transaction[];
  onSendMoney: () => void;
  onSelectRecipient: (recipient: Recipient) => void;
}

export function DashboardScreen({
  balance,
  recipients,
  transactions,
  onSendMoney,
  onSelectRecipient,
}: DashboardScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Balance card */}
      <section className="rounded-lg bg-success p-6 text-inverse-foreground">
        <p className="text-body font-medium text-inverse-foreground/90">
          Available Balance
        </p>
        <p className="mt-2 text-h1 tracking-tight">{formatRM(balance)}</p>
        <span className="mt-4 inline-flex rounded-md bg-success-subtle px-3 py-1 text-body font-medium text-success-strong">
          +12.5% this month
        </span>
      </section>

      {/* Primary action */}
      <Button size="lg" className="w-full justify-between" onClick={onSendMoney}>
        Send money
        <ArrowRight className="h-5 w-5" />
      </Button>

      {/* Favourite recipients */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-h4">Favorite recipients</h2>
          <button type="button" className="text-body font-medium text-primary">
            See all
          </button>
        </div>
        <div className="flex gap-4">
          {recipients.map((recipient) => (
            <button
              key={recipient.id}
              type="button"
              className="flex w-14 flex-col items-center gap-2"
              onClick={() => onSelectRecipient(recipient)}
            >
              <Avatar initials={recipient.initials} size="lg" />
              <span className="w-full truncate text-body text-foreground">
                {recipient.name}
              </span>
            </button>
          ))}
          <button
            type="button"
            aria-label="Add recipient"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-primary text-primary transition-colors hover:bg-primary-subtle"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Recent transactions */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-h4">Recent transactions</h2>
          <button type="button" className="text-body font-medium text-primary">
            See all
          </button>
        </div>
        <ul>
          {transactions.map((transaction) => {
            const isOut = transaction.direction === "out";
            return (
              <li
                key={transaction.id}
                className="flex items-center gap-3 border-b border-border py-4"
              >
                {isOut ? (
                  <ArrowUp className="h-5 w-5 shrink-0 text-error" />
                ) : (
                  <ArrowDown className="h-5 w-5 shrink-0 text-foreground" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-h4">{transaction.name}</p>
                  <p className="text-body text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p
                    className={cn(
                      "text-h4",
                      isOut ? "text-error" : "text-foreground",
                    )}
                  >
                    {isOut ? "-" : "+"}
                    {formatRM(transaction.amount)}
                  </p>
                  <Badge variant={transaction.status === "pending" ? "error" : "neutral"}>
                    {transaction.status === "pending" ? "Pending" : "Completed"}
                  </Badge>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
