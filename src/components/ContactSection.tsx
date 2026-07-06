import type { HomepageContent, Organization } from '@/payload-types'

type Props = {
  contact: HomepageContent['contact']
  organization: Organization
}

export function ContactSection({ contact, organization }: Props) {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-3xl font-bold text-maroon">
          {contact?.heading || 'Get In Touch'}
        </h2>
        {contact?.message && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600">{contact.message}</p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {organization.phone && (
            <div className="rounded-lg border border-saffron/30 bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-saffron-dark">
                Phone
              </p>
              <a href={`tel:${organization.phone}`} className="mt-2 block text-maroon">
                {organization.phone}
              </a>
            </div>
          )}
          {organization.email && (
            <div className="rounded-lg border border-saffron/30 bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-saffron-dark">
                Email
              </p>
              <a href={`mailto:${organization.email}`} className="mt-2 block text-maroon">
                {organization.email}
              </a>
            </div>
          )}
          {organization.whatsappNumber && (
            <div className="rounded-lg border border-saffron/30 bg-white p-5 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-saffron-dark">
                WhatsApp
              </p>
              <a
                href={`https://wa.me/${organization.whatsappNumber.replace(/[^0-9]/g, '')}`}
                className="mt-2 block text-maroon"
              >
                {organization.whatsappNumber}
              </a>
            </div>
          )}
        </div>

        {organization.address && (
          <p className="mt-8 text-center text-sm text-zinc-500">{organization.address}</p>
        )}

        {contact?.showMap && contact?.mapEmbedUrl && (
          <div className="mt-10 overflow-hidden rounded-lg border-4 border-saffron shadow-md">
            <iframe
              src={contact.mapEmbedUrl}
              className="h-80 w-full"
              loading="lazy"
              title="Location map"
            />
          </div>
        )}
      </div>
    </section>
  )
}
