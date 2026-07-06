import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'
import { notFound } from 'next/navigation'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const result = await (payload.find as any)({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const page = result.docs?.[0]
  if (!page) notFound()

  return <BlockRenderer blocks={page.layout} />
}
