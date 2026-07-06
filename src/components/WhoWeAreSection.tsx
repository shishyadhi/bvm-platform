import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { HomepageContent, Media, Organization } from '@/payload-types'

type Props = {
  whoWeAre: HomepageContent['whoWeAre']
  organization: Organization
}

export function WhoWeAreSection({ whoWeAre, organization }: Props) {
  const image = whoWeAre?.image as Media | undefined

  return (
    <section className="bg-cream py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-maroon">
            {whoWeAre?.heading || 'Who We Are'}
          </h2>
          <div className="mt-4 text-saffron-dark">
            <span className="text-sm font-semibold uppercase tracking-wide">
              {organization.studentsBenefitted
                ? `${organization.studentsBenefitted}+ students benefitted`
                : organization.tagline}
            </span>
          </div>
          {whoWeAre?.description && (
            <div className="prose prose-zinc mt-4 max-w-none text-zinc-700">
              <RichText data={whoWeAre.description} />
            </div>
          )}
        </div>
        {image?.url && (
          <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-saffron shadow-lg">
            <Image src={image.url} alt={image.alt || 'Who we are'} fill className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
