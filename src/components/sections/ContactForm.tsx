"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { TextField, TextArea, SelectField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [f, setF] = useState({ name: "", email: "", topic: "booking", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!f.name.trim()) err.name = "Please add your name.";
    if (!f.email.trim()) err.email = "We need somewhere to reply.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) err.email = "That email does not look right.";
    if (!f.message.trim()) err.message = "Tell us what you need and we will answer it.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 850));
    setBusy(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-[var(--hairline-strong)] bg-bone p-8">
        <span className="inline-flex size-11 items-center justify-center rounded-sm bg-success/12 text-success">
          <Check size={20} aria-hidden />
        </span>
        <h3 className="mt-6 font-display text-(length:--text-title-1)">Thank you.</h3>
        <p className="mt-4 max-w-[44ch] leading-[1.7] text-slate">
          We will reply to {f.email} within {site.confirmWindow} during lobby hours. If it is
          urgent, ring {site.phone} — somebody who works with the animals answers it.
        </p>
        <p className="mt-6 rounded-sm bg-parchment p-4 text-[0.8125rem] leading-relaxed text-muted">
          This is a demonstration site — no message was sent.
        </p>
      </div>
    );
  }

  // noValidate: run our own validation so the styled, aria-live error messages
  // actually appear, instead of the browser's native bubbles.
  return (
    <form noValidate onSubmit={submit} className="grid gap-5 border border-[var(--hairline-strong)] bg-bone p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Your name" required autoComplete="name" value={f.name}
          error={errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <TextField label="Email" type="email" required autoComplete="email" value={f.email}
          error={errors.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </div>
      <SelectField label="What is it about" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
        <option value="booking">A booking or dates</option>
        <option value="visit">Coming to look around</option>
        <option value="quiet">An anxious or reactive animal</option>
        <option value="medical">Medication or a medical need</option>
        <option value="shuttle">The shuttle</option>
        <option value="other">Something else</option>
      </SelectField>
      <TextArea label="Message" required value={f.message} error={errors.message}
        onChange={(e) => setF({ ...f, message: e.target.value })} />
      <Button type="submit" size="lg" disabled={busy} className="justify-self-start">
        {busy ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
