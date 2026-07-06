import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { AboutBlock } from '../blocks/AboutBlock'
import { ParamparaBlock } from '../blocks/ParamparaBlock'
import { AcharyaBlock } from '../blocks/AcharyaBlock'
import { ClassScheduleBlock } from '../blocks/ClassScheduleBlock'
import { MilestonesTimelineBlock } from '../blocks/MilestonesTimelineBlock'
import { LocationsBlock } from '../blocks/LocationsBlock'
import { ContactFormBlock } from '../blocks/ContactFormBlock'
import { QuoteDividerBlock } from '../blocks/QuoteDividerBlock'
import { VideoBlock } from '../blocks/VideoBlock'
import { ReelsBlock } from '../blocks/ReelsBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { LineageDisplayBlock } from '../blocks/LineageDisplayBlock'
import { ClassListingBlock } from '../blocks/ClassListingBlock'
import { TeamBlock } from '../blocks/TeamBlock'
import { CtaBannerBlock } from '../blocks/CtaBannerBlock'
import { PublicationsListingBlock } from '../blocks/PublicationsListingBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path slug, e.g. "home", "about", "classes", "parampara", "acharya-ji", "initiatives", "contact", "publications"',
      },
    },
    {
      name: 'seoTitle',
      type: 'text',
      label: 'SEO Title',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'SEO Description',
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Sections',
      blocks: [
        HeroBlock,
        AboutBlock,
        ParamparaBlock,
        AcharyaBlock,
        ClassScheduleBlock,
        ClassListingBlock,
        MilestonesTimelineBlock,
        LocationsBlock,
        ContactFormBlock,
        QuoteDividerBlock,
        VideoBlock,
        ReelsBlock,
        TestimonialsBlock,
        LineageDisplayBlock,
        TeamBlock,
        CtaBannerBlock,
        PublicationsListingBlock,
      ],
    },
  ],
}
