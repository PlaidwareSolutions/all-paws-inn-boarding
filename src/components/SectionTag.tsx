/** Small numbered wayfinding marker for the top of a section. */
export default function SectionTag({
  n,
  name,
  tone = 'dark',
  className = '',
}: {
  n: string
  name: string
  tone?: 'dark' | 'light' | 'flame'
  className?: string
}) {
  const numCol = tone === 'flame' ? 'text-ink' : 'text-flame'
  const line = tone === 'dark' ? 'bg-ink/25' : tone === 'flame' ? 'bg-ink/30' : 'bg-bone/30'
  const nameCol = tone === 'dark' ? 'text-ink/72' : tone === 'flame' ? 'text-bone/88' : 'text-bone/75'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`font-sans text-[0.72rem] font-semibold tracking-[0.12em] ${numCol}`}>{n}</span>
      <span className={`h-px w-8 ${line}`} />
      <span className={`font-sans text-[0.66rem] uppercase tracking-[0.3em] ${nameCol}`}>{name}</span>
    </div>
  )
}
