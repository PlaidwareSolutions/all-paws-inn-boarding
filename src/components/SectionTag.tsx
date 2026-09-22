/** Small wayfinding label for the top of a section — the section's name, nothing else.
    It carried a number and a connecting hairline until the numbering came out; the label
    now takes the accent colour the number used to hold. */
export default function SectionTag({
  name,
  tone = 'dark',
  className = '',
}: {
  name: string
  tone?: 'dark' | 'light' | 'flame'
  className?: string
}) {
  const nameCol = tone === 'dark' ? 'text-teal' : tone === 'flame' ? 'text-bone/88' : 'text-bone/75'
  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-sans text-[clamp(0.74rem,1vw,0.88rem)] font-semibold uppercase tracking-[0.28em] ${nameCol}`}>
        {name}
      </span>
    </div>
  )
}
