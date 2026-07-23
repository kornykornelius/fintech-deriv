"use client";

import { useCallback, useState } from "react";
import {
  DashboardScreen,
  ReviewScreen,
  SendMoneyScreen,
  SendingScreen,
  SuccessScreen,
} from "@/components/screens";
import {
  INITIAL_BALANCE,
  initialTransactions,
  parseAmount,
  recipients,
  type Recipient,
  type Transaction,
} from "@/lib/data";

type Screen = "dashboard" | "send" | "review" | "sending" | "success";

const DEFAULT_AMOUNT = "100.00";
const DEFAULT_NOTE = "Rent split";

function generateTransactionId(): string {
  return `TXN-${Math.floor(10_000_000 + Math.random() * 90_000_000)}`;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  // Current transfer
  const [recipient, setRecipient] = useState<Recipient>(recipients[0]);
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [note, setNote] = useState(DEFAULT_NOTE);
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  const amountValue = parseAmount(amount);
  const canReview = amountValue > 0 && amountValue <= balance;

  const startSend = (selected: Recipient = recipients[0]) => {
    setRecipient(selected);
    setScreen("send");
  };

  const confirmAndSend = () => {
    setTransactionId(generateTransactionId());
    setTransactionDate(
      new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    );
    setScreen("sending");
  };

  const handleSendingDone = useCallback(() => {
    setScreen("success");
  }, []);

  const returnHome = () => {
    setBalance((current) => current - amountValue);
    setTransactions((current) => [
      {
        id: transactionId,
        name: recipient.name,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        amount: amountValue,
        direction: "out",
        status: "completed",
      },
      ...current,
    ]);
    setAmount(DEFAULT_AMOUNT);
    setNote(DEFAULT_NOTE);
    setScreen("dashboard");
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 py-6">
      {/* Keyed wrapper re-runs the entrance animation on each screen change */}
      <div key={screen} className="animate-screen-in">
        {screen === "dashboard" && (
          <DashboardScreen
            balance={balance}
            recipients={recipients}
            transactions={transactions}
            onSendMoney={() => startSend()}
            onSelectRecipient={startSend}
          />
        )}

        {screen === "send" && (
          <SendMoneyScreen
            recipient={recipient}
            amount={amount}
            note={note}
            canReview={canReview}
            onAmountChange={setAmount}
            onNoteChange={setNote}
            onBack={() => setScreen("dashboard")}
            onCancel={() => setScreen("dashboard")}
            onReview={() => setScreen("review")}
          />
        )}

        {screen === "review" && (
          <ReviewScreen
            recipient={recipient}
            amount={amountValue}
            note={note}
            onBack={() => setScreen("send")}
            onConfirm={confirmAndSend}
          />
        )}

        {screen === "sending" && (
          <SendingScreen
            recipient={recipient}
            amount={amountValue}
            onDone={handleSendingDone}
          />
        )}

        {screen === "success" && (
          <SuccessScreen
            recipient={recipient}
            amount={amountValue}
            transactionId={transactionId}
            transactionDate={transactionDate}
            onReturnHome={returnHome}
          />
        )}
      </div>
    </main>
  );
}
