import { Instagram, Facebook } from 'lucide-react'
import { socials, type Social } from '../data'

/** lucide ships no TikTok glyph, so this one is drawn here to match the others' weight. */
function TikTok({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.9 2h-3.1v13.4a2.4 2.4 0 1 1-2-2.4v-3.1a5.5 5.5 0 1 0 5.1 5.5V9.1a6.7 6.7 0 0 0 3.9 1.2V7.2a3.8 3.8 0 0 1-3.9-3.7V2Z" />
    </svg>
  )
}

/* a switch rather than a lookup map: lucide types `size` as string | number, which
   doesn't unify with the local glyph's own props */
function Mark({ id }: { id: Social['id'] }) {
  if (id === 'instagram') return <Instagram size={16} />
  if (id === 'facebook') return <Facebook size={16} />
  return <TikTok size={16} />
}

/** The row of social marks — same hairline circle treatment as the rest of the footer. */
export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socials.map(s => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`All Paws Inn on ${s.label} — ${s.handle}`}
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-bone"
          >
            <Mark id={s.id} />
          </a>
      ))}
    </div>
  )
}
