import { ArrowRight, ChevronLeft } from "lucide-react";
import { Avatar, Button } from "@/components/ui";
import { formatRM, type Recipient } from "@/lib/data";

interface ReviewScreenProps {
  recipient: Recipient;
  amount: number;
  note: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function ReviewScreen({
  recipient,
  amount,
  note,
  onBack,
  onConfirm,
}: ReviewScreenProps) {
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
        <h1 className="text-h3">Review Transaction</h1>
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
      </div>

      {/* Amount */}
      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-muted-foreground">You send</p>
        <p className="text-h1 tracking-tight">{formatRM(amount)}</p>
      </div>

      {/* Note */}
      {note.trim() !== "" && (
        <div className="flex flex-col gap-1">
          <p className="text-body-sm text-muted-foreground">
            What&rsquo;s it for?
          </p>
          <p className="text-body text-foreground">{note}</p>
        </div>
      )}

      <Button size="lg" className="w-full justify-between" onClick={onConfirm}>
        Confirm and send
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
