import { ArrowRight, ChevronLeft } from "lucide-react";
import { Avatar, Button, Input } from "@/components/ui";
import type { Recipient } from "@/lib/data";

interface SendMoneyScreenProps {
  recipient: Recipient;
  amount: string;
  note: string;
  canReview: boolean;
  onAmountChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onBack: () => void;
  onCancel: () => void;
  onReview: () => void;
}

export function SendMoneyScreen({
  recipient,
  amount,
  note,
  canReview,
  onAmountChange,
  onNoteChange,
  onBack,
  onCancel,
  onReview,
}: SendMoneyScreenProps) {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="-ml-1 flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface-subtle"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-h3">Send money</h1>
      </header>

      {/* Recipient */}
      <div className="flex items-center gap-3 rounded-md bg-surface-subtle p-3">
        <Avatar initials={recipient.initials} variant="dark" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-h4">{recipient.name}</p>
          <p className="truncate text-body text-muted-foreground">
            {recipient.email}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-body font-medium text-primary"
        >
          Cancel
        </button>
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="amount" className="text-body-sm text-muted-foreground">
          Amount
        </label>
        <Input
          id="amount"
          inputMode="decimal"
          value={amount}
          onChange={(event) => onAmountChange(event.target.value)}
          className="h-12 bg-surface-subtle border-transparent text-h3 font-bold"
        />
      </div>

      {/* Note */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="note" className="text-body-sm text-muted-foreground">
          What&rsquo;s it for? <span className="text-muted-foreground">(optional)</span>
        </label>
        <Input
          id="note"
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Add a note"
          className="bg-surface-subtle border-transparent"
        />
      </div>

      <Button
        size="lg"
        className="w-full justify-between"
        disabled={!canReview}
        onClick={onReview}
      >
        Review
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
