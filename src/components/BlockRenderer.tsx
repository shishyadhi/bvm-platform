import React from 'react'
import { HeroBlock } from './blocks/HeroBlock'
import { AboutBlock } from './blocks/AboutBlock'
import { ParamparaBlock } from './blocks/ParamparaBlock'
import { AcharyaBlock } from './blocks/AcharyaBlock'
import { ClassScheduleBlock } from './blocks/ClassScheduleBlock'
import { ClassListingBlock } from './blocks/ClassListingBlock'
import { MilestonesTimelineBlock } from './blocks/MilestonesTimelineBlock'
import { LocationsBlock } from './blocks/LocationsBlock'
import { ContactFormBlock } from './blocks/ContactFormBlock'
import { QuoteDividerBlock } from './blocks/QuoteDividerBlock'
import { VideoBlock } from './blocks/VideoBlock'
import { ReelsBlock } from './blocks/ReelsBlock'
import { TestimonialsBlock } from './blocks/TestimonialsBlock'
import { LineageDisplayBlock } from './blocks/LineageDisplayBlock'
import { TeamBlock } from './blocks/TeamBlock'
import { CtaBannerBlock } from './blocks/CtaBannerBlock'
import { PublicationsListingBlock } from './blocks/PublicationsListingBlock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={i} {...block} />
          case 'about':
            return <AboutBlock key={i} {...block} />
          case 'parampara':
            return <ParamparaBlock key={i} {...block} />
          case 'acharya':
            return <AcharyaBlock key={i} {...block} />
          case 'classSchedule':
            return <ClassScheduleBlock key={i} {...block} />
          case 'classListing':
            return <ClassListingBlock key={i} {...block} />
          case 'milestonesTimeline':
            return <MilestonesTimelineBlock key={i} {...block} />
          case 'locations':
            return <LocationsBlock key={i} {...block} />
          case 'contactForm':
            return <ContactFormBlock key={i} {...block} />
          case 'quoteDivider':
            return <QuoteDividerBlock key={i} {...block} />
          case 'video':
            return <VideoBlock key={i} {...block} />
          case 'reels':
            return <ReelsBlock key={i} {...block} />
          case 'testimonials':
            return <TestimonialsBlock key={i} {...block} />
          case 'lineageDisplay':
            return <LineageDisplayBlock key={i} {...block} />
          case 'team':
            return <TeamBlock key={i} {...block} />
          case 'ctaBanner':
            return <CtaBannerBlock key={i} {...block} />
          case 'publicationsListing':
            return <PublicationsListingBlock key={i} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
