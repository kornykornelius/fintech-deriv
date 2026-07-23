import type { Metadata } from "next";
import { ArrowRight, Plus, Search, Send } from "lucide-react";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Button, type ButtonVariant } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Design System — Fintech Deriv",
  description: "Design tokens and component states",
};

type ColorToken = { name: string; cssVar: string; hex: string };

const colorGroups: { title: string; tokens: ColorToken[] }[] = [
  {
    title: "Primary",
    tokens: [
      { name: "primary", cssVar: "--primary", hex: "#2563EB" },
      { name: "primary-hover", cssVar: "--primary-hover", hex: "#1D4ED8" },
      { name: "primary-subtle", cssVar: "--primary-subtle", hex: "#EFF6FF" },
      { name: "primary-foreground", cssVar: "--primary-foreground", hex: "#FFFFFF" },
    ],
  },
  {
    title: "Secondary",
    tokens: [
      { name: "secondary", cssVar: "--secondary", hex: "#F1F5F9" },
      { name: "secondary-hover", cssVar: "--secondary-hover", hex: "#E2E8F0" },
      { name: "secondary-foreground", cssVar: "--secondary-foreground", hex: "#475569" },
    ],
  },
  {
    title: "Background & surface",
    tokens: [
      { name: "background", cssVar: "--background", hex: "#FFFFFF" },
      { name: "surface", cssVar: "--surface", hex: "#FFFFFF" },
      { name: "surface-subtle", cssVar: "--surface-subtle", hex: "#F1F5F9" },
    ],
  },
  {
    title: "Text",
    tokens: [
      { name: "foreground", cssVar: "--foreground", hex: "#0F172A" },
      { name: "muted-foreground", cssVar: "--muted-foreground", hex: "#64748B" },
      { name: "inverse-foreground", cssVar: "--inverse-foreground", hex: "#FFFFFF" },
    ],
  },
  {
    title: "Border",
    tokens: [
      { name: "border", cssVar: "--border", hex: "#E2E8F0" },
      { name: "border-strong", cssVar: "--border-strong", hex: "#CBD5E1" },
      { name: "ring", cssVar: "--ring", hex: "#2563EB" },
    ],
  },
  {
    title: "Success",
    tokens: [
      { name: "success", cssVar: "--success", hex: "#16A34A" },
      { name: "success-strong", cssVar: "--success-strong", hex: "#15803D" },
      { name: "success-subtle", cssVar: "--success-subtle", hex: "#F0FDF4" },
    ],
  },
  {
    title: "Warning",
    tokens: [
      { name: "warning", cssVar: "--warning", hex: "#D97706" },
      { name: "warning-strong", cssVar: "--warning-strong", hex: "#B45309" },
      { name: "warning-subtle", cssVar: "--warning-subtle", hex: "#FFFBEB" },
    ],
  },
  {
    title: "Error",
    tokens: [
      { name: "error", cssVar: "--error", hex: "#DC2626" },
      { name: "error-strong", cssVar: "--error-strong", hex: "#B91C1C" },
      { name: "error-subtle", cssVar: "--error-subtle", hex: "#FEF2F2" },
    ],
  },
];

const typeScale = [
  { utility: "text-h1", sample: "Heading 1", spec: "32 / 40 · Bold 700" },
  { utility: "text-h2", sample: "Heading 2", spec: "24 / 32 · Semi Bold 600" },
  { utility: "text-h3", sample: "Heading 3", spec: "20 / 28 · Semi Bold 600" },
  { utility: "text-h4", sample: "Heading 4", spec: "16 / 24 · Semi Bold 600" },
  { utility: "text-body", sample: "Body — the quick brown fox jumps over the lazy dog.", spec: "14 / 20 · Regular 400" },
  { utility: "text-body-sm", sample: "Body small — the quick brown fox jumps over the lazy dog.", spec: "12 / 16 · Regular 400" },
  { utility: "text-body-sm font-medium", sample: "Label small — the quick brown fox.", spec: "12 / 16 · Medium 500" },
];

const radii = [
  { utility: "rounded-sm", cssVar: "--radius-sm", value: "2px" },
  { utility: "rounded-md", cssVar: "--radius-md", value: "4px (kit default)" },
  { utility: "rounded-lg", cssVar: "--radius-lg", value: "8px" },
];

const shadows = [
  { utility: "shadow-sm", cssVar: "--shadow-sm" },
  { utility: "shadow-md", cssVar: "--shadow-md" },
  { utility: "shadow-lg", cssVar: "--shadow-lg" },
];

/* Hover/focus can't be forced from server-rendered markup, so the state
   columns re-apply each variant's hover/focus classes statically. */
const buttonStates: {
  variant: ButtonVariant;
  hover: string;
  focus: string;
}[] = [
  { variant: "primary", hover: "bg-primary-hover", focus: "ring-2 ring-ring/50 ring-offset-2" },
  { variant: "secondary", hover: "bg-secondary-hover", focus: "ring-2 ring-ring/50 ring-offset-2" },
  { variant: "outline", hover: "bg-primary-subtle", focus: "ring-2 ring-ring/50 ring-offset-2" },
  { variant: "ghost", hover: "bg-primary-subtle", focus: "ring-2 ring-ring/50 ring-offset-2" },
  { variant: "destructive", hover: "bg-error-strong", focus: "ring-2 ring-ring/50 ring-offset-2" },
];

const badgeVariants: BadgeVariant[] = ["neutral", "primary", "success", "warning", "error"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 border-b border-border pb-2">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ token }: { token: ColorToken }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-10 shrink-0 rounded-md border border-border"
        style={{ backgroundColor: `var(${token.cssVar})` }}
      />
      <div className="min-w-0">
        <p className="text-body font-medium">{token.name}</p>
        <p className="text-body-sm text-muted-foreground">
          {token.cssVar} · {token.hex}
        </p>
      </div>
    </div>
  );
}

function StateLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-body-sm font-medium text-muted-foreground">{children}</p>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1">Design system</h1>
        <p className="text-body text-muted-foreground">
          Tokens and components sourced from the Deriv UI kit. Colors, type,
          radius and shadows are CSS variables in{" "}
          <code className="rounded-sm bg-surface-subtle px-1 py-0.5 text-body-sm">
            globals.css
          </code>
          , exposed as Tailwind utilities.
        </p>
      </header>

      <Section title="Colors">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {colorGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-h4">{group.title}</h3>
              {group.tokens.map((token) => (
                <Swatch key={token.name} token={token} />
              ))}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col divide-y divide-border">
          {typeScale.map((row) => (
            <div
              key={row.utility}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <p className={row.utility}>{row.sample}</p>
              <p className="shrink-0 text-body-sm text-muted-foreground">
                {row.utility} · {row.spec}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Border radius">
        <div className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <div key={r.utility} className="flex flex-col items-center gap-2">
              <div className={`size-20 border border-border bg-surface-subtle ${r.utility}`} />
              <p className="text-body-sm font-medium">{r.utility}</p>
              <p className="text-body-sm text-muted-foreground">
                {r.cssVar} · {r.value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="flex flex-wrap gap-8">
          {shadows.map((s) => (
            <div key={s.utility} className="flex flex-col items-center gap-3">
              <div className={`size-24 rounded-md bg-surface ${s.utility}`} />
              <p className="text-body-sm font-medium">{s.utility}</p>
              <p className="text-body-sm text-muted-foreground">{s.cssVar}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <p className="text-body-sm text-muted-foreground">
          Hover and focus columns are simulated by re-applying the state
          classes; the buttons themselves respond to real hover, keyboard focus
          and disabled.
        </p>
        <div className="overflow-x-auto">
          <div className="grid min-w-[560px] grid-cols-[6rem_repeat(4,1fr)] items-center gap-x-4 gap-y-3">
            <div />
            <StateLabel>Default</StateLabel>
            <StateLabel>Hover</StateLabel>
            <StateLabel>Focus</StateLabel>
            <StateLabel>Disabled</StateLabel>
            {buttonStates.map(({ variant, hover, focus }) => (
              <div key={variant} className="contents">
                <p className="text-body font-medium">{variant}</p>
                <div><Button variant={variant}>Button</Button></div>
                <div><Button variant={variant} className={hover}>Button</Button></div>
                <div><Button variant={variant} className={focus}>Button</Button></div>
                <div><Button variant={variant} disabled>Button</Button></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button>
            Send money
            <ArrowRight size={16} />
          </Button>
          <Button variant="secondary">
            <Plus size={16} />
            Add recipient
          </Button>
        </div>
      </Section>

      <Section title="Input">
        <div className="grid max-w-md gap-4">
          <div className="flex flex-col gap-1.5">
            <StateLabel>Default</StateLabel>
            <Input placeholder="Recipient name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <StateLabel>Focus (simulated)</StateLabel>
            <Input
              placeholder="Recipient name"
              className="border-primary ring-2 ring-ring/25"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <StateLabel>Invalid</StateLabel>
            <Input invalid defaultValue="RM -50.00" />
            <p className="text-body-sm text-error">Amount must be positive.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <StateLabel>Disabled</StateLabel>
            <Input disabled placeholder="Unavailable" />
          </div>
        </div>
      </Section>

      <Section title="Card">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Available balance</CardTitle>
              <CardDescription>Updated a few seconds ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-h1">RM 1,590.00</p>
              <Badge variant="success" className="mt-2">
                +12.5% this month
              </Badge>
            </CardContent>
            <CardFooter>
              <Button>
                Send money
                <Send size={16} />
              </Button>
              <Button variant="outline">Top up</Button>
            </CardFooter>
          </Card>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Find a recipient</CardTitle>
              <CardDescription>Search by name or account number</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input placeholder="e.g. Alex Rivera" />
              <Button variant="secondary" aria-label="Search">
                <Search size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Badge">
        <div className="flex flex-wrap items-center gap-3">
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
          <Badge variant="neutral">Completed</Badge>
          <Badge variant="error">Pending</Badge>
          <Badge variant="success">+12.5% this month</Badge>
        </div>
      </Section>
    </main>
  );
}
