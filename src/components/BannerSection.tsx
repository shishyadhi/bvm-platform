import Image from 'next/image'
import type { HomepageContent, Media, Organization } from '@/payload-types'

type Props = {
  banner: HomepageContent['banner']
  organization: Organization
}

export function BannerSection({ banner, organization }: Props) {
  const bg = banner?.backgroundImage as Media | undefined

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-maroon via-maroon-dark to-maroon text-cream">
      {bg?.url && (
        <Image
          src={bg.url}
          alt={bg.alt || organization.name}
          fill
          priority
          className="object-cover opacity-30"
        />
      )}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-temple-gold sm:text-5xl">
          {banner?.heading || organization.name}
        </h1>
        {banner?.subheading && (
          <p className="mt-4 text-lg text-cream/90 sm:text-xl">{banner.subheading}</p>
        )}
        {banner?.ctaText && banner?.ctaLink && (
          <a
            href={banner.ctaLink}
            className="mt-8 inline-block rounded-full bg-saffron px-8 py-3 font-semibold text-maroon-dark shadow-lg transition hover:bg-saffron-dark hover:text-cream"
          >
            {banner.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
