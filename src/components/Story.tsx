import { story } from '../data'
import { Words, ClipImage, Reveal } from './primitives'
import SectionTag from './SectionTag'

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-h" className="bg-paper">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* image */}
        <ClipImage
          src={story.image}
          alt={story.imageAlt}
          className="h-[58vh] w-full md:h-full md:min-h-[92vh]"
        />

        {/* copy */}
        <div className="flex flex-col justify-center gutter py-20 md:py-28">
          <SectionTag name="Our story" className="mb-8" />
          <h2 id="story-h" className="d-2 font-serif text-ink">
            <Words lines={story.heading} italicLine={1} accentLine={1} />
          </h2>

          <div className="mt-8 max-w-md space-y-5">
            {story.body.map((p, i) => (
              <Reveal
                as="p"
                key={i}
                delay={i * 0.06}
                className="font-sans text-[1.04rem] leading-[1.8] text-ink-70"
              >
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 border-l-2 border-teal pl-5">
            <p className="font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] italic leading-snug text-ink">
              {story.pull}
            </p>
            <p className="mt-4 font-sans text-[0.66rem] uppercase tracking-[0.24em] text-ink/68">
              {story.signature}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
