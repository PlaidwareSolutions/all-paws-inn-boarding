import { Instagram, Facebook } from 'lucide-react'
import { socials, type Social } from '../data'

function Mark({ id }: { id: Social['id'] }) {
  return id === 'instagram' ? <Instagram size={16} /> : <Facebook size={16} />
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
            className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-bone"
          >
            <Mark id={s.id} />
          </a>
      ))}
    </div>
  )
}
