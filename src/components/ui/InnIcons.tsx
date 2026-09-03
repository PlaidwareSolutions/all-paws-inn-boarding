/**
 * Drawn for this project rather than pulled from a set — same 1.4 stroke and
 * square caps as the arch mark, so the timeline reads as one hand.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

export type InnIconName =
  | "sunrise" | "bowl" | "play" | "rest" | "nose" | "walk" | "moon"
  // Cat day
  | "sun" | "feather" | "brush";

export function InnIcon({ name, className }: { name: InnIconName; className?: string }) {
  const paths: Record<InnIconName, React.ReactNode> = {
    sunrise: (
      <>
        <path d="M3 18h18" />
        <path d="M7.5 18a4.5 4.5 0 0 1 9 0" />
        <path d="M12 4v3M5.6 7.1l2 2M18.4 7.1l-2 2" />
      </>
    ),
    bowl: (
      <>
        <path d="M3.5 11h17c0 4.4-3.8 7.5-8.5 7.5S3.5 15.4 3.5 11Z" />
        <path d="M8 8c0-1.5 1-2.5 1-2.5M12 7.5c0-2 1.2-3 1.2-3M16 8c0-1.2.8-2 .8-2" />
      </>
    ),
    play: (
      <>
        <circle cx="12" cy="13.5" r="4" />
        <circle cx="5.5" cy="7.5" r="2" />
        <circle cx="11" cy="5.5" r="2" />
        <circle cx="17" cy="6.5" r="2" />
        <circle cx="20.5" cy="11.5" r="1.8" />
      </>
    ),
    rest: (
      <>
        <path d="M3 17v-4.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2V17" />
        <path d="M3 17h18M6.5 10.5V8.5a1.5 1.5 0 0 1 1.5-1.5h8a1.5 1.5 0 0 1 1.5 1.5v2" />
      </>
    ),
    nose: (
      <>
        <path d="M12 15.5a3.5 3.5 0 0 0 3.5-3.5c0-2-1.6-3-3.5-3s-3.5 1-3.5 3a3.5 3.5 0 0 0 3.5 3.5Z" />
        <path d="M10.6 12.2h2.8M12 9v-.5" />
        <path d="M5 6.5 3 5M19 6.5 21 5M4.5 17.5 3 19M19.5 17.5 21 19" />
      </>
    ),
    walk: (
      <>
        <path d="M4 20l3.5-6 2.5 2 2-4" />
        <path d="M12 12l3 3.5V20" />
        <circle cx="15.5" cy="5.5" r="2" />
        <path d="M14 8l-2 3.5" />
        <path d="M20 20v-4l-2-3" />
      </>
    ),
    moon: (
      <>
        <path d="M19 14.5A8 8 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" />
        <path d="M17 4v3M15.5 5.5h3" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21" />
        <path d="M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
      </>
    ),
    feather: (
      <>
        <path d="M19 5c0 6-4.5 10.5-10.5 10.5H5.5L19 5Z" />
        <path d="M4 20l6.5-6.5" />
        <path d="M13.5 7.5 11 13M16 9l-2 4.5" />
      </>
    ),
    brush: (
      <>
        <path d="M6.5 13.5h11a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-11a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1Z" />
        <path d="M8 13.5V17M11 13.5V18M14 13.5V17M17 13.5V18" />
        <path d="M9.5 7V4.5" />
      </>
    ),
  };

  return (
    <svg {...base} className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}
