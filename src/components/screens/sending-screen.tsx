"use client";

import { useEffect, useState } from "react";
import { Check, Loader } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatRM, type Recipient } from "@/lib/data";

const STEPS = [
  "Verifying recipient details",
  "Confirming funds",
  "Transferring money...",
];

/** Time (ms) each step stays in its loading state before completing. */
const STEP_DURATION = 900;

interface SendingScreenProps {
  recipient: Recipient;
  amount: number;
  onDone: () => void;
}

export function SendingScreen({ recipient, amount, onDone }: SendingScreenProps) {
  // Number of completed steps: 0..STEPS.length
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (completed < STEPS.length) {
      const timer = setTimeout(() => setCompleted(completed + 1), STEP_DURATION);
      return () => clearTimeout(timer);
    }
    // All steps done — brief pause, then move to success.
    const timer = setTimeout(onDone, 400);
    return () => clearTimeout(timer);
  }, [completed, onDone]);

  return (
    <div className="flex flex-col items-center gap-6 pt-10 text-center">
      <Loader className="h-10 w-10 animate-spin text-foreground" aria-hidden />

      <div className="flex flex-col gap-1">
        <p className="text-body font-semibold">Sending</p>
        <p className="text-h3">
          {formatRM(amount)} to {recipient.name}
        </p>
      </div>

      <ul className="flex flex-col gap-3" aria-label="Transfer progress">
        {STEPS.map((step, index) => {
          const isDone = index < completed;
          const isActive = index === completed;
          return (
            <li
              key={step}
              className={cn(
                "flex items-center justify-center gap-2 text-body font-semibold transition-all duration-300",
                isDone && "text-success",
                isActive && "text-muted-foreground",
                !isDone && !isActive && "opacity-40 text-muted-foreground",
              )}
            >
              {isDone ? (
                <Check className="h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <Loader
                  className={cn("h-4 w-4 shrink-0", isActive && "animate-spin")}
                  aria-hidden
                />
              )}
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
