import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await (payload.find as any)({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const page = result.docs?.[0]
  if (!page) return {}
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const result = await (payload.find as any)({ collection: 'pages', limit: 100 })
  return result.docs
    .filter((p: any) => p.slug !== 'home')
    .map((p: any) => ({ slug: p.slug }))
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await (payload.find as any)({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs?.[0]
  if (!page) notFound()

  return <BlockRenderer blocks={page.layout} />
}
