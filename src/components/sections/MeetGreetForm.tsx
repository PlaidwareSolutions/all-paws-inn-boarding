"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { TextField, SelectField, TextArea, CheckField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { reference } from "@/lib/pricing";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<string, string>>;

/** Frontend simulation: validates properly, then shows the state a real
    submission would produce. Nothing leaves the browser. */
export function MeetGreetForm() {
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    animal: "dog",
    name: "",
    breed: "",
    age: "",
    concerns: "",
    quiet: false,
    when: "weekday-morning",
    owner: "",
    email: "",
    phone: "",
  });

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (!form.name.trim()) e.name = "We need something to call them.";
    }
    if (s === 2) {
      if (!form.owner.trim()) e.owner = "Please add your name.";
      if (!form.email.trim()) e.email = "We need an email to confirm the time.";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "That email does not look right.";
      if (!form.phone.trim()) e.phone = "A phone number, in case we need to move the time.";
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => s + 1);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(2);
    setErrors(e);
    if (Object.keys(e).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setRef(reference());
  };

  if (ref) {
    return (
      <div className="border border-[var(--hairline-strong)] bg-bone p-8">
        <span className="inline-flex size-11 items-center justify-center rounded-sm bg-success/12 text-success">
          <Check size={20} aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-(length:--text-title-1)">
          That is booked in, {form.owner.split(" ")[0]}.
        </h3>
        <p className="mt-4 max-w-[46ch] leading-[1.7] text-slate">
          We will email {form.email} within {site.confirmWindow} with two or three times that suit,
          and you pick one. Nothing is charged for a meet and greet.
        </p>
        <dl className="mt-7 border-t border-[var(--hairline)] pt-5 text-[0.875rem]">
          <div className="flex justify-between gap-4 py-1.5">
            <dt className="text-muted">Reference</dt>
            <dd className="font-mono tabular text-ink">{ref}</dd>
          </div>
          <div className="flex justify-between gap-4 py-1.5">
            <dt className="text-muted">Guest</dt>
            <dd className="text-ink">
              {form.name}
              {form.breed ? `, ${form.breed}` : ""}
            </dd>
          </div>
          {form.quiet ? (
            <div className="flex justify-between gap-4 py-1.5">
              <dt className="text-muted">Flagged</dt>
              <dd className="text-ink">Quiet Wing — longer visit</dd>
            </div>
          ) : null}
        </dl>
        <p className="mt-7 rounded-sm bg-parchment p-4 text-[0.8125rem] leading-relaxed text-muted">
          This is a demonstration site — no booking was made and nothing was sent.
        </p>
      </div>
    );
  }

  const steps = ["The animal", "The visit", "You"];

  return (
    <form noValidate onSubmit={submit} className="border border-[var(--hairline-strong)] bg-bone">
      <ol className="flex border-b border-[var(--hairline)]">
        {steps.map((s, i) => (
          <li key={s} className="flex-1">
            <div
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 border-r border-[var(--hairline)] px-4 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] last:border-r-0",
                i === step ? "bg-moss text-bone" : i < step ? "text-slate" : "text-muted",
              )}
            >
              <span className={cn(i === step ? "text-sage" : "text-muted")}>0{i + 1}</span>
              <span className="hidden sm:inline">{s}</span>
            </div>
          </li>
        ))}
      </ol>

      <div className="p-6 sm:p-8">
        {step === 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Dog or cat"
              value={form.animal}
              onChange={(e) => set("animal", e.target.value)}
              required
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </SelectField>
            <TextField
              label="Their name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
              required
            />
            <TextField
              optional
              label="Breed, or best guess"
              value={form.breed}
              onChange={(e) => set("breed", e.target.value)}
            />
            <TextField
              optional
              label="Age"
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
              placeholder="e.g. 4"
            />
            <TextArea
              className="sm:col-span-2"
              optional
              label="Anything we should know"
              hint="Reactivity, medication, past boarding that went badly, a bite history. This is the useful box — nothing here rules you out on its own."
              value={form.concerns}
              onChange={(e) => set("concerns", e.target.value)}
            />
            <CheckField
              className="sm:col-span-2"
              label="I think they may need the Quiet Wing"
              description="We will book ninety minutes rather than forty, and Theo will run it."
              checked={form.quiet}
              onChange={(e) => set("quiet", e.target.checked)}
            />
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-5">
            <SelectField
              label="When suits you"
              hint="We will come back with two or three specific times inside this window."
              value={form.when}
              onChange={(e) => set("when", e.target.value)}
            >
              <option value="weekday-morning">Weekday morning</option>
              <option value="weekday-afternoon">Weekday afternoon</option>
              <option value="saturday">Saturday</option>
              <option value="flexible">Whenever you have space</option>
            </SelectField>
            <div className="rounded-sm bg-parchment p-5">
              <p className="eyebrow">What happens on the day</p>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] leading-snug text-slate">
                <li>You see every room your animal could stay in, including the empty ones.</li>
                <li>Dogs spend fifteen minutes with a small group while you watch from outside.</li>
                <li>We go through food, medication and anything you are worried about.</li>
                <li>Nothing is charged, and there is no expectation that you book afterwards.</li>
              </ul>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Your name"
              value={form.owner}
              onChange={(e) => set("owner", e.target.value)}
              error={errors.owner}
              autoComplete="name"
              required
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              error={errors.email}
              autoComplete="email"
              required
            />
            <TextField
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              error={errors.phone}
              autoComplete="tel"
              required
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--hairline)] px-6 py-5 sm:px-8">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span className="text-[0.8125rem] text-muted">Free · about 40 minutes</span>
        )}
        {step < 2 ? (
          <Button type="button" onClick={next}>
            Continue <ArrowRight size={16} aria-hidden />
          </Button>
        ) : (
          <Button type="submit" disabled={sending}>
            {sending ? "Sending…" : "Request a meet & greet"}
          </Button>
        )}
      </div>
    </form>
  );
}
