import { Check, Receipt } from "lucide-react";
import { Button } from "@/components/ui";
import { formatRM, type Recipient } from "@/lib/data";

interface SuccessScreenProps {
  recipient: Recipient;
  amount: number;
  transactionId: string;
  transactionDate: string;
  onReturnHome: () => void;
}

export function SuccessScreen({
  recipient,
  amount,
  transactionId,
  transactionDate,
  onReturnHome,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col gap-5 pt-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-20 w-20 animate-scale-in items-center justify-center rounded-full border-4 border-success text-success">
          <Check className="h-10 w-10" strokeWidth={3} aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body font-semibold">Transaction sent</p>
          <p className="text-h3">
            {formatRM(amount)} to {recipient.name}
          </p>
        </div>
      </div>

      <hr className="border-border" />

      <dl className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <dt className="text-body-sm text-muted-foreground">Transaction date</dt>
          <dd className="text-h4">{transactionDate}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-body-sm text-muted-foreground">Transaction ID</dt>
          <dd className="text-h4">{transactionId}</dd>
        </div>
      </dl>

      <hr className="border-border" />

      <div className="flex flex-col gap-3">
        <Button
          variant="secondary"
          size="lg"
          className="w-full justify-between border border-border-strong bg-surface text-foreground hover:bg-surface-subtle"
        >
          View receipt
          <Receipt className="h-5 w-5" />
        </Button>
        <Button size="lg" className="w-full" onClick={onReturnHome}>
          Return to home
        </Button>
      </div>
    </div>
  );
}
