import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Organizations } from './collections/Organizations'
import { HomepageContent } from './collections/HomepageContent'
import { Pages } from './collections/Pages'
import { Classes } from './collections/Classes'
import { ParamparaMembers } from './collections/ParamparaMembers'
import { Testimonials } from './collections/Testimonials'
import { Publications } from './collections/Publications'
import { SiteNavigation } from './globals/SiteNavigation'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Organizations,
    HomepageContent,
    Pages,
    Classes,
    ParamparaMembers,
    Testimonials,
    Publications,
  ],
  globals: [
    SiteNavigation,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
})
