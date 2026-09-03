"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, ChevronUp } from "lucide-react";
import { dogSuites, catSuites, allSuites } from "@/data/suites";
import { enrichment, kitchen } from "@/data/addons";
import {
  availabilityFor,
  minNightsFor,
  nearestAvailable,
  scarcityLabel,
  PEAK_SURCHARGE,
  QUIET_WING_SURCHARGE,
} from "@/lib/availability";
import { quote as buildQuote, money, reference } from "@/lib/pricing";
import { addDays, formatRange, nightsBetween, toISO } from "@/lib/dates";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { TextField, TextArea, CheckField, SelectField } from "@/components/ui/Field";
import { Img } from "@/components/ui/Img";
import { Calendar } from "./Calendar";
import { SummaryBody } from "./SummaryRail";
import { cn } from "@/lib/cn";

const STEPS = ["Guest", "Dates", "Room", "Extras", "Details"] as const;
const KEY = "api:planner";

type State = {
  species: "dog" | "cat";
  animals: number;
  from: string;
  to: string;
  suite: string;
  addOns: string[];
  menu: string[];
  quietWing: boolean;
  shuttle: boolean;
};

const EMPTY: State = {
  species: "dog", animals: 1, from: "", to: "", suite: "", addOns: [], menu: [], quietWing: false, shuttle: false,
};

export function Planner() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "", vaccines: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  /* Seed from the hero's date bar, then fall back to a saved draft. */
  /* eslint-disable react-hooks/set-state-in-effect -- initialises from a client-only
     source (browser storage, or today's date) that does not exist during SSR. Doing it
     after mount is precisely what keeps the server and client markup identical. */
  useEffect(() => {
    const today = toISO(new Date());
    const qFrom = params.get("from");
    const qTo = params.get("to");
    const qSpecies = params.get("species");
    const qSuite = params.get("suite");

    let next: State = { ...EMPTY, from: addDays(today, 14), to: addDays(today, 18) };
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) next = { ...next, ...(JSON.parse(raw) as Partial<State>) };
    } catch { /* ignore */ }

    if (qFrom) next.from = qFrom;
    if (qTo) next.to = qTo;
    if (qSpecies === "dog" || qSpecies === "cat") next.species = qSpecies;
    if (qSuite) { next.suite = qSuite; const f = allSuites.find((x) => x.slug === qSuite); if (f) next.species = f.species; }
    if (next.from < today) { next.from = addDays(today, 14); next.to = addDays(today, 18); }

    setS(next);
    setHydrated(true);
    if (qSuite) setStep(3);
    else if (qFrom) setStep(2);
  }, [params]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
  }, [s, hydrated]);

  const suites = s.species === "dog" ? dogSuites : catSuites;
  const chosen = allSuites.find((x) => x.slug === s.suite) ?? null;
  const minStay = useMemo(() => (s.from && s.to ? minNightsFor(s.from, s.to) : null), [s.from, s.to]);

  const allBooked = useMemo(
    () => s.from && s.to && suites.length > 0
      && suites.every((suite) => !availabilityFor(suite, s.from, s.to).available),
    [suites, s.from, s.to],
  );
  const alternative = useMemo(
    () => (allBooked ? nearestAvailable(s.species, s.from, s.to) : null),
    [allBooked, s.species, s.from, s.to],
  );

  const quote = useMemo(() => {
    if (!chosen || !s.from || !s.to) {
      return { nights: nightsBetween(s.from, s.to), peakNights: 0, lines: [], total: 0, perNight: 0 };
    }
    const q = buildQuote({
      suite: chosen, from: s.from, to: s.to, animals: s.animals,
      addOnSlugs: s.addOns, menuNames: s.menu,
    });
    if (s.quietWing) {
      const n = q.nights;
      q.lines.push({
        label: "The Quiet Wing",
        detail: `${n} nights at ${money(QUIET_WING_SURCHARGE)} — staffing, at cost`,
        amount: QUIET_WING_SURCHARGE * n,
        kind: "addon",
      });
    }
    if (s.shuttle) {
      q.lines.push({ label: "The Airport Run", detail: "Return, IAH or Hobby", amount: 190, kind: "addon" });
    }
    const total = q.lines.reduce((a, l) => a + l.amount, 0);
    return { ...q, total, perNight: q.nights > 0 ? Math.round(total / q.nights) : 0 };
  }, [chosen, s]);

  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));
  const toggle = (k: "addOns" | "menu", v: string) =>
    setS((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const canAdvance = (i: number) => {
    if (i === 1) return !!s.from && !!s.to && nightsBetween(s.from, s.to) > 0;
    if (i === 2) return !!s.suite;
    return true;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!contact.name.trim()) err.name = "Please add your name.";
    if (!contact.email.trim()) err.email = "We need an email to confirm the room.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) err.email = "That email does not look right.";
    if (!contact.phone.trim()) err.phone = "A phone number, in case we need to reach you.";
    if (!contact.vaccines) err.vaccines = "We need this confirmed before we can hold a room.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setRef(reference());
    try { window.localStorage.removeItem(KEY); } catch { /* ignore */ }
  };

  if (!hydrated) {
    return <Container width="wide" className="py-24"><p className="text-muted">Loading the planner…</p></Container>;
  }

  if (ref) {
    return (
      <Container width="narrow" className="py-16 lg:py-24">
        <span className="inline-flex size-12 items-center justify-center rounded-sm bg-success/12 text-success">
          <Check size={22} aria-hidden />
        </span>
        <h1 className="mt-7 text-(length:--text-display-3)">
          Thank you — that request is with us.
        </h1>
        <p className="mt-6 max-w-[52ch] text-(length:--text-lead) leading-[1.6] text-slate">
          Somebody will read it and reply to {contact.email} within {site.confirmWindow} during
          lobby hours. Nothing is charged until we have confirmed the room and you have said yes.
        </p>
        <dl className="mt-10 border-t border-[var(--hairline)]">
          {[
            ["Reference", ref],
            ["Room", chosen?.name ?? "—"],
            ["Dates", s.from && s.to ? formatRange(s.from, s.to) : "—"],
            ["Nights", String(quote.nights)],
            ["Total", money(quote.total)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-[var(--hairline)] py-3.5">
              <dt className="text-[0.875rem] text-muted">{k}</dt>
              <dd className="font-mono text-[0.875rem] tabular text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/new-guests">What to bring</Button>
          <Button href="/" variant="secondary">Back to the inn</Button>
        </div>
        <p className="mt-10 rounded-sm bg-parchment p-5 text-[0.8125rem] leading-relaxed text-muted">
          This is a demonstration website. No reservation was made, no email was sent and nothing
          was charged.
        </p>
      </Container>
    );
  }

  return (
    <Container width="wide" className="pb-40 pt-8 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div>
          {/* Step rail */}
          <ol className="flex overflow-hidden rounded-sm border border-[var(--hairline)]">
            {STEPS.map((label, i) => {
              const reachable = i <= step || (i === step + 1 && canAdvance(step));
              return (
                <li key={label} className="flex-1">
                  <button
                    type="button"
                    disabled={!reachable}
                    onClick={() => setStep(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 border-r border-[var(--hairline)] px-2 py-3.5 font-mono text-[0.625rem] uppercase tracking-[0.1em] transition-colors last:border-r-0",
                      i === step ? "bg-moss text-bone" : i < step ? "text-slate hover:bg-parchment" : "text-muted",
                      !reachable && "cursor-not-allowed opacity-50",
                    )}
                  >
                    <span className={i === step ? "text-sage" : "text-muted"}>0{i + 1}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="mt-10">
            {step === 0 ? (
              <section aria-labelledby="s0">
                <h2 id="s0" className="text-(length:--text-display-3)">Who is staying?</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {(["dog", "cat"] as const).map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => { set("species", sp); set("suite", ""); }}
                      aria-pressed={s.species === sp}
                      className={cn(
                        "flex items-center gap-4 border p-5 text-left transition-colors",
                        s.species === sp ? "border-moss bg-parchment" : "border-[var(--hairline-strong)] hover:border-ink",
                      )}
                    >
                      <span className="frame size-20 shrink-0">
                        <Img
                          asset={sp === "dog" ? dogSuites[0]!.portrait : catSuites[0]!.portrait}
                          alt=""
                          sizes="80px"
                        />
                      </span>
                      <span>
                        <span className="block font-display text-[1.375rem] leading-none">
                          {sp === "dog" ? "A dog" : "A cat"}
                        </span>
                        <span className="mt-2 block text-[0.8125rem] leading-snug text-muted">
                          {sp === "dog" ? "The Lodge — 22 rooms" : "The Cattery — 15 rooms, no dogs"}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 max-w-[16rem]">
                  <SelectField
                    label="How many, from the same household"
                    hint="Animals from one home share a room where the room allows it."
                    value={String(s.animals)}
                    onChange={(e) => set("animals", Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </SelectField>
                </div>

                <div className="mt-6 max-w-[46rem] border-t border-[var(--hairline)] pt-6">
                  <CheckField
                    label={s.species === "dog" ? "My dog may need the Quiet Wing" : "My cat may need the Quiet Wing"}
                    description={
                      s.species === "dog"
                        ? `Reactive, fearful, senior or medically fragile. We place them in the Quiet Wing rather than the Lodge, with one assigned caregiver and no group play. Adds ${money(QUIET_WING_SURCHARGE)} a night, which is what the staffing costs.`
                        : `Cats who do not travel well, have never boarded well, or are old or medically fragile. We place them in the Quiet Wing rather than the Cattery, with one assigned caregiver and nothing asked of them. Adds ${money(QUIET_WING_SURCHARGE)} a night.`
                    }
                    checked={s.quietWing}
                    onChange={(e) => set("quietWing", e.target.checked)}
                  />
                </div>
              </section>
            ) : null}

            {step === 1 ? (
              <section aria-labelledby="s1">
                <h2 id="s1" className="text-(length:--text-display-3)">When?</h2>
                <p className="mt-4 max-w-[50ch] text-slate">
                  Availability below is live. Peak nights carry a published {money(PEAK_SURCHARGE)} surcharge —
                  they are marked, never a surprise at the end.
                </p>
                <div className="mt-8">
                  <Calendar
                    from={s.from}
                    to={s.to}
                    suites={suites}
                    onChange={(f, t) => setS((p) => ({ ...p, from: f, to: t }))}
                  />
                </div>
              </section>
            ) : null}

            {step === 2 ? (
              <section aria-labelledby="s2">
                <h2 id="s2" className="text-(length:--text-display-3)">Which room?</h2>
                <p className="mt-4 text-slate">
                  {formatRange(s.from, s.to)} · {quote.nights} {quote.nights === 1 ? "night" : "nights"}
                </p>
                {allBooked ? (
                  <div className="mt-8 border border-warning/40 bg-warning/[0.06] p-6">
                    <p className="font-display text-(length:--text-title-1)">
                      Everything is taken over those dates.
                    </p>
                    <p className="mt-3 max-w-[52ch] leading-[1.65] text-slate">
                      {alternative
                        ? "The nearest dates with a room free are below. We also keep a real waiting list and work it in order — roughly one request in five is filled by a cancellation."
                        : "We keep a real waiting list and work it in order. Ring the front desk and we will put you on it."}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {alternative ? (
                        <Button
                          onClick={() => setS((p) => ({ ...p, from: alternative.from, to: alternative.to }))}
                        >
                          Try {formatRange(alternative.from, alternative.to)}
                        </Button>
                      ) : null}
                      <Button variant="secondary" onClick={() => setStep(1)}>
                        Pick different dates
                      </Button>
                      <Button variant="ghost" href={site.phoneHref}>
                        Call {site.phone}
                      </Button>
                    </div>
                  </div>
                ) : null}

                <ul className="mt-8 space-y-4">
                  {suites.map((suite) => {
                    const av = availabilityFor(suite, s.from, s.to);
                    const label = scarcityLabel(av.remaining, suite.count);
                    const sub = buildQuote({ suite, from: s.from, to: s.to, animals: s.animals });
                    const tooMany = s.animals > (suite.spec.sharing.match(/\d+/) ? Number(suite.spec.sharing.match(/\d+/)![0]) : 1)
                      && !/up to (two|three|four)/i.test(suite.spec.sharing);
                    const disabled = !av.available;
                    return (
                      <li key={suite.slug}>
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => { set("suite", suite.slug); setStep(3); }}
                          aria-pressed={s.suite === suite.slug}
                          className={cn(
                            "flex w-full gap-5 border p-4 text-left transition-colors sm:p-5",
                            s.suite === suite.slug ? "border-moss bg-parchment" : "border-[var(--hairline-strong)]",
                            disabled ? "cursor-not-allowed opacity-55" : "hover:border-ink",
                          )}
                        >
                          <span className="frame hidden size-28 shrink-0 sm:block">
                            <Img asset={suite.portrait} alt="" sizes="112px" />
                          </span>
                          <span className="flex-1">
                            <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                              <span className="font-display text-(length:--text-title-1) leading-none">
                                {suite.name}
                              </span>
                              <Pill tone={disabled ? "warn" : label.tone}>{label.text}</Pill>
                            </span>
                            <span className="mt-2.5 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                              {suite.spec.dimensions} · {suite.spec.sharing}
                            </span>
                            <span className="mt-2.5 block max-w-[52ch] text-[0.875rem] leading-snug text-slate">
                              {suite.blurb}
                            </span>
                            <span className="mt-3.5 flex items-baseline gap-2">
                              <span className="font-mono text-[1.0625rem] tabular text-ink">
                                {money(sub.total)}
                              </span>
                              <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                                total · {money(suite.rate)} a night
                              </span>
                            </span>
                            {tooMany ? (
                              <span className="mt-2 block text-[0.75rem] text-warning">
                                This room takes one animal — choose a larger room for {s.animals}.
                              </span>
                            ) : null}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            {step === 3 ? (
              <section aria-labelledby="s3" className="space-y-12">
                <div>
                  <h2 id="s3" className="text-(length:--text-display-3)">Anything else?</h2>
                  <p className="mt-4 max-w-[52ch] text-slate">
                    All optional. Their own food and all medication are already included, and a stay
                    with none of this added is not a lesser stay.
                  </p>
                </div>

                <div>
                  <p className="eyebrow border-b border-[var(--hairline)] pb-4">Enrichment</p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {enrichment
                      .filter((e) => e.species === "both" || e.species === s.species)
                      .map((e) => {
                        const on = s.addOns.includes(e.slug);
                        return (
                          <li key={e.slug}>
                            <button
                              type="button"
                              onClick={() => toggle("addOns", e.slug)}
                              aria-pressed={on}
                              className={cn(
                                "flex h-full w-full flex-col border p-4 text-left transition-colors",
                                on ? "border-moss bg-parchment" : "border-[var(--hairline-strong)] hover:border-ink",
                              )}
                            >
                              <span className="flex w-full items-baseline justify-between gap-3">
                                <span className="font-display text-[1.125rem] leading-snug">{e.name}</span>
                                <span className="shrink-0 font-mono text-[0.8125rem] tabular text-ink">
                                  {money(e.price)}
                                </span>
                              </span>
                              <span className="mt-2 text-[0.8125rem] leading-snug text-muted">
                                {e.description}
                              </span>
                              <span className="mt-2.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                                {e.unit}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <div>
                  <p className="eyebrow border-b border-[var(--hairline)] pb-4">From the kitchen</p>
                  <p className="mt-4 text-[0.875rem] text-muted">
                    Their own food is already included at no charge. These are extras, per day.
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {kitchen
                      .filter((k) => (s.species === "cat" ? k.title === "The cat menu" : k.title === "The kitchen"))
                      .flatMap((k) => k.items)
                      .filter((i) => i.price !== null)
                      .map((item) => {
                        const on = s.menu.includes(item.name);
                        return (
                          <li key={item.name}>
                            <button
                              type="button"
                              onClick={() => toggle("menu", item.name)}
                              aria-pressed={on}
                              className={cn(
                                "flex w-full items-center justify-between gap-3 border px-4 py-3 text-left transition-colors",
                                on ? "border-moss bg-parchment" : "border-[var(--hairline-strong)] hover:border-ink",
                              )}
                            >
                              <span className="text-[0.9375rem] leading-snug">{item.name}</span>
                              <span className="shrink-0 font-mono text-[0.8125rem] tabular text-ink">
                                {money(item.price!)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <div className="border-t border-[var(--hairline)] pt-8">
                  <CheckField
                    label="Add the Airport Run, return"
                    description="Collected from your door and taken to IAH or Hobby, timed to your flight — $95 each way, per journey rather than per animal."
                    checked={s.shuttle}
                    onChange={(e) => set("shuttle", e.target.checked)}
                  />
                </div>
              </section>
            ) : null}

            {step === 4 ? (
              <section aria-labelledby="s4">
                <h2 id="s4" className="text-(length:--text-display-3)">Who shall we reply to?</h2>
                <p className="mt-4 max-w-[52ch] text-slate">
                  This is a request, not a booking. Nothing is charged now — we confirm the room
                  first, and take one night as a deposit only once you have said yes.
                </p>
                <form noValidate onSubmit={submit} className="mt-9">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextField label="Your name" value={contact.name} required autoComplete="name"
                      error={errors.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                    <TextField label="Email" type="email" value={contact.email} required autoComplete="email"
                      error={errors.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                    <TextField label="Phone" type="tel" value={contact.phone} required autoComplete="tel"
                      error={errors.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                    <TextArea className="sm:col-span-2" optional label="Anything we should know"
                      hint="Medication, food, habits, what they are like when they are unsettled."
                      value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} />
                  </div>
                  <div className="mt-6 border-t border-[var(--hairline)] pt-6">
                    <CheckField
                      label={<>Vaccinations are current and I can send records</>}
                      description="Dogs: rabies, DHPP, Bordetella within six months. Cats: rabies and FVRCP. We check at booking, not at the door."
                      checked={contact.vaccines}
                      onChange={(e) => setContact({ ...contact, vaccines: e.target.checked })}
                    />
                    <p aria-live="polite">
                      {errors.vaccines ? (
                        <span className="mt-2 block text-[0.8125rem] text-danger">{errors.vaccines}</span>
                      ) : null}
                    </p>
                  </div>
                  <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={sending}>
                    {sending ? "Sending…" : `Request this stay — ${money(quote.total)}`}
                  </Button>
                  <p className="mt-4 text-[0.8125rem] text-muted">
                    By sending this you agree to our{" "}
                    <Link href="/policies" className="link-underline text-slate">policies</Link>.
                  </p>
                </form>
              </section>
            ) : null}
          </div>

          {step < 4 ? (
            <div className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--hairline)] pt-8">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>
              ) : <span />}
              <Button onClick={() => setStep(step + 1)} disabled={!canAdvance(step)} size="lg">
                Continue <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          ) : null}
        </div>

        {/* Desktop rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] border border-[var(--hairline-strong)] bg-bone p-6">
            <SummaryBody quote={quote} suite={chosen} from={s.from} to={s.to} minStay={minStay} />
          </div>
        </aside>
      </div>

      {/* Mobile summary sheet */}
      {step < 4 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--hairline)] bg-bone shadow-lift lg:hidden">
          {sheet ? (
            <div className="max-h-[62svh] overflow-y-auto p-5">
              <SummaryBody quote={quote} suite={chosen} from={s.from} to={s.to} minStay={minStay} />
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-3 p-3">
            <button
              type="button"
              onClick={() => setSheet(!sheet)}
              aria-expanded={sheet}
              className="flex flex-1 items-center gap-2 px-2 text-left"
            >
              <ChevronUp size={16} aria-hidden className={cn("transition-transform", sheet && "rotate-180")} />
              <span>
                <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-muted">
                  {quote.nights > 0 ? `${quote.nights} nights` : "Your stay"}
                </span>
                <span className="block font-display text-[1.25rem] leading-none tabular">
                  {money(quote.total)}
                </span>
              </span>
            </button>
            <Button onClick={() => { setSheet(false); setStep(step + 1); }} disabled={!canAdvance(step)}>
              Continue
            </Button>
          </div>
        </div>
      ) : null}
    </Container>
  );
}
