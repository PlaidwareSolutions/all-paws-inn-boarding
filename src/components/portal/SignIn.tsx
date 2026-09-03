"use client";

import { useState } from "react";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function SignIn({ onSignIn }: { onSignIn: () => void }) {
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    onSignIn();
  };

  return (
    <Container width="narrow" className="py-16 lg:py-28">
      <div className="mx-auto max-w-[26rem]">
        <p className="eyebrow">Guest portal</p>
        <h1 className="mt-5 text-(length:--text-display-3)">Welcome back.</h1>
        <p className="mt-5 leading-[1.65] text-slate">
          Your stays, your animals&rsquo; records, the daily notes and the cameras.
        </p>

        <form onSubmit={submit} className="mt-10 grid gap-5">
          <TextField label="Email" type="email" autoComplete="email" defaultValue="dana@example.com" required />
          <TextField label="Password" type="password" autoComplete="current-password" defaultValue="demo-password" required />
          <Button type="submit" size="lg" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-8 rounded-sm bg-parchment p-4 text-[0.8125rem] leading-relaxed text-muted">
          <span className="text-slate">This is a demonstration.</span> Any email and password will
          sign you in to a sample account — nothing is sent or stored anywhere but this browser.
        </p>
      </div>
    </Container>
  );
}
