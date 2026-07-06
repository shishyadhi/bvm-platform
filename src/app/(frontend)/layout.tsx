import React from 'react'
import './globals.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  description: 'A digital sanctuary for Advaita Vedanta teachings.',
  title: 'Brahma Vidya Mandir',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })

  const [nav, settings] = await Promise.all([
    (payload.findGlobal as any)({ slug: 'site-navigation' }).catch(() => null),
    (payload.findGlobal as any)({ slug: 'site-settings' }).catch(() => null),
  ])

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navigation
          brandName={nav?.brandName}
          navLinks={nav?.navLinks}
          ctaText={nav?.ctaText}
          ctaLink={nav?.ctaLink}
        />
        <main>{children}</main>
        <Footer
          siteName={settings?.siteName}
          tagline={settings?.tagline}
          footerColumns={settings?.footerColumns}
          footerEmail={settings?.footerEmail}
          copyrightText={settings?.copyrightText}
        />
      </body>
    </html>
  )
}
