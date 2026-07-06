import Image from 'next/image'
import type { HomepageContent, Media } from '@/payload-types'

type Props = {
  upcomingEvents: HomepageContent['upcomingEvents']
}

export function EventsSection({ upcomingEvents }: Props) {
  const events = upcomingEvents?.events || []

  if (events.length === 0) return null

  return (
    <section className="bg-maroon py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold text-temple-gold">
          {upcomingEvents?.heading || 'Upcoming Events'}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => {
            const image = event.image as Media | undefined
            return (
              <div
                key={i}
                className="overflow-hidden rounded-lg bg-cream shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                {image?.url && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={image.url}
                      alt={image.alt || event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-maroon">{event.title}</h3>
                  {event.date && (
                    <p className="mt-1 text-sm font-medium text-saffron-dark">
                      {new Date(event.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                  {event.description && (
                    <p className="mt-2 text-sm text-zinc-600">{event.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
