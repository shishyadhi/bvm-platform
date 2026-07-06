/**
 * PATCH /api/seed/patch
 * Corrects content that drifted from the Claude Design export, and backfills
 * new structures (Publications, Team, footer columns, nav) into an already-seeded DB.
 * Safe to call multiple times — each call overwrites with the same correct data.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET() {
  const payload = await getPayload({ config })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findPage = async (slug: string): Promise<any> => {
    const result = await (payload.find as any)({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
    return result.docs?.[0]
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const upsertPage = async (data: Record<string, any>) => {
    const existing = await findPage(data.slug)
    if (existing) {
      await (payload.update as any)({ collection: 'pages', id: existing.id, data })
    } else {
      await (payload.create as any)({ collection: 'pages', data })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateMember = (id: string, data: Record<string, any>) =>
    (payload.update as any)({ collection: 'parampara-members', id, data })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateGlobal = (slug: string, data: Record<string, any>) =>
    (payload.updateGlobal as any)({ slug, data })

  const patched: string[] = []

  // ── NAV & FOOTER — add Publications link, restructure footer to columns ──
  await updateGlobal('site-navigation', {
    navLinks: [
      { label: 'Classes', href: '/classes' },
      { label: 'Parampara', href: '/parampara' },
      { label: 'Acharya-ji', href: '/acharya-ji' },
      { label: 'About Us', href: '/about' },
      { label: 'Initiatives', href: '/initiatives' },
      { label: 'Publications', href: '/publications' },
    ],
  })
  await updateGlobal('site-settings', {
    footerColumns: [
      { heading: 'Explore', links: [{ label: 'Classes', href: '/classes' }, { label: 'Parampara', href: '/parampara' }, { label: 'Acharya-ji', href: '/acharya-ji' }] },
      { heading: 'Initiatives', links: [{ label: 'All Initiatives', href: '/initiatives' }, { label: 'Pooja', href: '/initiatives#pooja' }, { label: 'Camps', href: '/initiatives#camps' }, { label: 'BVM Yuva Kendra', href: '/initiatives#yuva' }] },
      { heading: 'Connect', links: [{ label: 'About Us', href: '/about' }, { label: 'Publications', href: '/publications' }, { label: 'Contact Us', href: '/contact' }] },
    ],
  })
  patched.push('Nav + Footer globals')

  // ── HOME — fix Guru Parampara lineage (was Gandhi/Vinoba, now Shankaracharya line) ─
  await upsertPage({
    title: 'Home',
    slug: 'home',
    seoTitle: 'Brahma Vidya Mandir | Advaita Vedanta Sanctuary',
    seoDescription: 'A digital sanctuary for Advaita Vedanta teachings, following the Guru Parampara from Adi Shankara to the present lineage of teachers.',
    layout: [
      {
        blockType: 'hero',
        label: 'Welcome to the Sanctuary of Wisdom',
        heading: 'Brahma Vidya Mandir',
        sanskritQuote: 'दुर्लभं त्रयमेवैतद्देवानुग्रहहेतुकम् । मनुष्यत्वं मुमुक्षुत्वं महापुरुषसंश्रयः ॥',
        quoteSource: '— Vivekachudamani',
        quoteTranslation: '"These three things are very difficult to obtain and are due only to the grace of God: a human birth, a longing for liberation, and the protection of a great soul."',
        ctaText: 'Explore the Path',
        ctaLink: '#about',
      },
      {
        blockType: 'about',
        label: 'Our Foundation',
        heading: 'Advaita Vedanta & Collective Living',
        paragraphs: [
          { text: 'Brahma Vidya Mandir is an ashram established in 1959 by Vinoba Bhave, the spiritual successor to Mahatma Gandhi. Nestled in the heart of the village of Paunar, it stands as a testament to the synthesis of spirituality and labor.' },
          { text: 'The ashram is unique in its commitment to collective leadership, primarily managed and nurtured by a group of dedicated women (Sadhikas). Our mission is to live the principles of Brahma-Vidya—the supreme knowledge of the Self—while being firmly rooted in social service and self-sufficiency.' },
        ],
        ctaText: 'Discover Our Philosophy',
        ctaLink: '/about',
        imagePosition: 'right',
      },
      {
        blockType: 'parampara',
        label: 'The Holy Lineage',
        heading: 'Our Guru Parampara',
        nodes: [
          { name: 'Adi Shankara', role: 'The Reviver of Advaita', icon: 'temple_hindu' },
          { name: 'Swami Dayandha Saraswathi', role: 'The Pillar of Truth and Non-Violence', icon: 'self_improvement' },
          { name: 'Swami Paramarthananda', role: 'The Spiritual Successor and Founder', icon: 'psychology' },
          { name: 'Swami Brahmayogananda', role: 'The Living Lineage', icon: 'groups' },
        ],
      },
      {
        blockType: 'acharya',
        label: 'Guided Wisdom',
        name: 'Acharya Shri Rangaji',
        paragraphs: [
          { text: 'With profound devotion and intellectual clarity, Acharya Shri Rangaji guides seekers through the intricate paths of the Upanishads and the Bhagavad Gita. His teaching style is characterized by "Sahajata"—a natural ease that makes the most complex Vedic concepts accessible to the modern mind.' },
          { text: "A lifelong practitioner of Advaita, Acharya-ji emphasizes the practical application of Vichara (enquiry) in daily life, ensuring that spiritual wisdom doesn't remain mere theory but becomes a lived experience of peace." },
        ],
        linkText: "Read Acharya-ji's Reflections",
        linkUrl: '/acharya-ji',
        portraitPosition: 'left',
      },
      {
        blockType: 'classSchedule',
        label: 'Dinacharya',
        heading: 'Class Schedule',
        sideQuote: '"Regular study (Svadhyaya) is the foundation of spiritual steadfastness."',
        scheduleItems: [
          { category: 'Weekend Discourse', title: 'Upanishad Vahini', day: 'Sunday', time: '7:00 - 9:00 AM', location: 'Main Meditation Hall', locationIcon: 'location_on' },
          { category: 'Foundational Study', title: 'Bhagavad Gita Vichara', day: 'Friday', time: '6:00 - 7:30 PM', location: 'Online & In-person', locationIcon: 'video_library' },
          { category: 'Satsang', title: 'Collective Meditation', day: 'Saturday', time: '5:30 - 7:00 PM', location: 'Quiet Reflection', locationIcon: 'spatial_audio_off' },
        ],
        calendarLinkText: 'Download the full monthly calendar',
        calendarLinkUrl: '/classes',
      },
    ],
  })
  patched.push('Home page (lineage fix)')

  // ── ABOUT US — add 5 missing milestones + new Team block ─────────────────
  await upsertPage({
    title: 'About Us',
    slug: 'about',
    seoTitle: 'About Us — Brahma Vidya Mandir',
    seoDescription: 'Tracing the sacred journey of Brahma Vidya Mandir since 1959.',
    layout: [
      {
        blockType: 'hero',
        heading: 'Our Sacred Journey',
        quoteTranslation: 'Tracing the path of devotion and wisdom since our founding. A testament to the enduring light of the Vedic tradition, grounded in Aparigraha and silent contemplation.',
      },
      {
        blockType: 'milestonesTimeline',
        milestones: [
          { year: '1959', title: 'The Foundation at Paunar', description: 'The seed of Brahma Vidya Mandir is planted, establishing a sanctuary dedicated to the pursuit of ultimate truth through disciplined practice and renunciation. The initial core group of seekers gathers.', images: [] },
          { year: '1980', title: 'Expansion of Teachings', description: 'The ashram broadens its reach, formally organizing the lineage teachings. The daily schedule (Dinacharya) becomes a formalized structure, guiding seekers in harmonizing action and contemplation.', images: [] },
          { year: '1993', title: 'First Residential Camp', description: 'BVM conducts its first formal residential study camp at Paunar, welcoming seekers from across Maharashtra for an immersive week of Upanishad study, chanting, and silent contemplation under open skies.', images: [] },
          { year: '2002', title: 'Bhagavad Gita Parampara', description: "A dedicated year-long Bhagavad Gita course is established — the first of its kind at BVM. Acharya-ji's verse-by-verse exposition draws students from Chennai, Coimbatore and beyond, cementing BVM's role as a centre of serious textual study.", images: [] },
          { year: '2010', title: 'BVM Yuva Kendra Founded', description: 'Recognising the hunger for Vedanta among younger generations, the Yuva Kendra is established — a wing that offers introductory Vedanta in accessible language, weekly satsangs, and online study circles for students and young professionals.', images: [] },
          { year: '2017', title: 'Publications & Seva', description: "BVM releases its first printed publication — a study guide to Tattva Bodha — offered free of charge as a seva. The gesture echoes the ashram's founding principle of Aparigraha: wisdom freely given, never sold.", images: [] },
          { year: '2024', title: '65 Years of Unbroken Light', description: 'Brahma Vidya Mandir completes 65 years of continuous teaching. The flame first kindled at Paunar now burns in the hearts of thousands — in Chennai, Coimbatore, and wherever sincere seekers turn inward to ask the one eternal question: Who am I?', images: [] },
        ],
      },
      {
        blockType: 'team',
        label: 'The People',
        heading: 'Our Team',
        description: 'A student-led initiative — sevaks and volunteers working together, hand in hand with our Acharyas, to carry the wisdom of the shastras into every home.',
        members: [
          { name: 'Acharya Shri Rangaji', role: 'Head Teacher', bio: "The guiding light of BVM's teaching tradition, leading discourses on the Upanishads, Bhagavad Gita, and Brahmasutras with clarity and warmth." },
          { name: 'Swami Paramarthananda', role: 'Senior Teacher', bio: 'A senior teacher in the Vedanta tradition, offering rigorous textual study alongside compassionate guidance for serious students.' },
          { name: 'Swami Brahmayogananda', role: 'Resident Teacher', bio: 'Resident teacher at BVM, sustaining the daily rhythm of study and practice for the local Sangha.' },
          { name: 'Swami Dayananda Saraswati', role: 'Founding Inspiration', bio: "The founding inspiration behind BVM's approach to traditional Vedanta teaching, whose legacy continues to shape the ashram's pedagogy." },
          { name: 'Seva Coordinator', role: 'Publications & Outreach', bio: "Coordinates BVM's publications and community outreach, ensuring the teachings reach seekers well beyond the ashram walls." },
        ],
      },
    ],
  })
  patched.push('About Us page (milestones + team)')

  // ── ACHARYA-JI — new hero, 3rd bio paragraph, new quote, reel topics, CTA ─
  await upsertPage({
    title: 'Acharya-ji',
    slug: 'acharya-ji',
    seoTitle: 'Acharya Shri Rangaji — Brahma Vidya Mandir',
    seoDescription: 'The living heart of Brahma Vidya Mandir — a teacher whose clarity and devotion illuminate the path of Advaita Vedanta for seekers of every background.',
    layout: [
      { blockType: 'hero', label: 'Guided Wisdom', heading: 'Acharya-ji', quoteTranslation: 'The living heart of Brahma Vidya Mandir — a teacher whose clarity and devotion illuminate the path of Advaita Vedanta for seekers of every background.' },
      {
        blockType: 'acharya',
        label: 'Spiritual Guide & Student',
        name: 'Acharya Shri Rangaji',
        roleTitle: 'Vedanta Acharya · Brahma Vidya Mandir',
        paragraphs: [
          { text: 'Dedicated to the profound teachings of Advaita Vedanta, Acharya-ji serves as a humble conduit for the ancient wisdom of the Upanishads, Bhagavad Gita, and Brahmasutras.' },
          { text: 'With decades of rigorous study and deep contemplation, his approach bridges traditional scriptural analysis with the practical realities of modern life, offering clarity and peace to seekers from all walks of life.' },
          { text: 'Trained in the Shankaracharya tradition and carrying forward the lineage of Swami Paramarthananda, Acharya-ji has been teaching at BVM for over two decades — offering weekly discourses, residential camps, and personal guidance to students across India.' },
        ],
        portraitPosition: 'left',
      },
      { blockType: 'quoteDivider', quote: 'The goal of Vedanta is not the accumulation of knowledge but the dissolution of ignorance. When the seeker truly understands ‘I am Brahman’, nothing more remains to be done.', attribution: '— Acharya Shri Rangaji' },
      { blockType: 'video', heading: 'The Life of a Seeker', description: 'A biographical journey of Acharya Shri Rangaji.', videoLabel: 'Biographical Documentary', videoTitle: 'Acharya-ji: The Journey Within', viewAllText: 'Glimpse of Acharya-ji', viewAllUrl: 'https://www.youtube.com/@BrahmaVidyaMandir' },
      {
        blockType: 'reels',
        heading: 'Moments of Clarity',
        topics: [{ label: 'Bhagavad Gita' }, { label: 'Viveka' }, { label: 'Vairagya' }, { label: 'Ishwara' }, { label: 'Atma Vichara' }, { label: 'Maya' }],
        reels: [
          { title: 'Dealing with Anxiety', topic: 'Vairagya', duration: '3:12' },
          { title: 'The Illusion of Control', topic: 'Maya', duration: '2:48' },
          { title: 'What is Dharma?', topic: 'Viveka', duration: '4:05' },
          { title: 'Q&A: Meditation Focus', topic: 'Atma Vichara', duration: '5:30' },
        ],
      },
      { blockType: 'ctaBanner', heading: 'Learn Directly from Acharya-ji', description: 'Join a class, attend a discourse, or write in with your questions — Acharya-ji welcomes seekers of every background.', buttonText: 'Contact Us', buttonLink: '/contact' },
    ],
  })
  patched.push('Acharya-ji page (rewrite)')

  // ── CONTACT US — fix hero heading ─────────────────────────────────────────
  await upsertPage({
    title: 'Contact Us',
    slug: 'contact',
    seoTitle: 'Contact Us — Brahma Vidya Mandir',
    seoDescription: 'Visit our branches in Chennai and Coimbatore for spiritual study and community.',
    layout: [
      { blockType: 'hero', heading: 'Connect with the Us', quoteTranslation: 'Visit our branches for spiritual study and community. We welcome seekers of all backgrounds to explore the Vedic tradition.' },
      { blockType: 'locations', heading: 'Our Centers', description: 'Visit us at one of our two locations in Tamil Nadu.', locations: [{ name: 'Chennai Center', address: 'Old # 59, New # 125, Gopathi Narayanaswami Rd, Opposite to Geetham Veg Restaurant, T. Nagar, Chennai, Tamil Nadu 600017', phone: '+91 98765 43210', mapLocation: 'T. Nagar, Chennai, India' }, { name: 'Coimbatore Center', address: 'Vedic Studies Block, 14 Ashram Road, Near Marudhamalai Foothills, Coimbatore, Tamil Nadu 641046', phone: '+91 87654 32109', mapLocation: 'Marudhamalai, Coimbatore, India' }] },
      { blockType: 'contactForm', heading: 'Send an Inquiry', description: 'We welcome your questions regarding classes, retreats, or general information.', submitButtonText: 'Send Message', recipientEmail: 'brahmavidyamandir@gmail.com' },
    ],
  })
  patched.push('Contact Us page (heading fix)')

  // ── PARAMPARA — fix all 4 lineage member names + descriptions ────────────
  await upsertPage({
    title: 'Parampara',
    slug: 'parampara',
    seoTitle: 'Guru Parampara — Brahma Vidya Mandir',
    seoDescription: 'The teachings of Advaita Vedanta flow continuously from teacher to student, an unbroken river of wisdom stretching back centuries.',
    layout: [
      { blockType: 'hero', heading: 'Our Holy Lineage', quoteTranslation: 'The teachings of Advaita Vedanta flow continuously from teacher to student, an unbroken river of wisdom stretching back centuries. At Brahma Vidya Mandir, we honor this sacred transmission, holding fast to the absolute truth while serving humanity with compassion.' },
      {
        blockType: 'lineageDisplay',
        members: [
          { name: 'Adi Shankara', title: 'The Reviver of Advaita', description: 'The bedrock of our philosophical understanding. Adi Shankaracharya unified the diverse streams of Hindu thought by elucidating the non-dualistic reality (Brahman). His profound commentaries continue to light the path of our spiritual inquiry, emphasizing that the self and the absolute are one.', portraitSide: 'left' },
          { name: 'Swami Dayandha Saraswathi', title: 'The Pillar of Truth and Non-Violence', description: 'A steadfast teacher of the Vedanta tradition, Swami Dayandha Saraswathi upheld truth (Satya) and non-violence (Ahimsa) as the bedrock of spiritual practice, teaching that self-realization must be lived through unwavering integrity and compassion toward all beings.', portraitSide: 'right' },
          { name: 'Swami Paramarthananda', title: 'The Spiritual Successor and Founder', description: "A foremost teacher of Advaita Vedanta in the modern era, Swami Paramarthananda carries forward the traditional method of scriptural exposition (Sampradaya), and it is under his guidance and inspiration that Brahma Vidya Mandir's teaching lineage takes its present form.", portraitSide: 'left' },
          { name: 'Swami Brahmayogananda', title: 'The Living Lineage', description: 'The lineage continues through Swami Brahmayogananda, who carries the flame of teaching forward at Brahma Vidya Mandir — ensuring that the wisdom of the Upanishads and the Gita remains a living, breathing presence in the life of the Sangha today.', portraitSide: 'right' },
        ],
      },
    ],
  })
  patched.push('Parampara page (lineage fix)')

  // ── PUBLICATIONS — new page ───────────────────────────────────────────────
  await upsertPage({
    title: 'Publications',
    slug: 'publications',
    seoTitle: 'Publications — Brahma Vidya Mandir',
    seoDescription: 'Books and study materials released by Brahma Vidya Mandir — distilled from decades of teaching, offered freely as a seva.',
    layout: [
      { blockType: 'hero', label: 'Sacred Texts', heading: 'Publications', quoteTranslation: 'Books and study materials released by Brahma Vidya Mandir — distilled from decades of teaching. These works are offered as a seva; no price can be placed on the wisdom they carry.' },
      { blockType: 'publicationsListing', heading: 'Publications', eyebrow: 'Sacred Texts', description: 'Books and study materials released by Brahma Vidya Mandir — distilled from decades of teaching. These works are offered as a seva; no price can be placed on the wisdom they carry.', infoNote: 'All publications are freely gifted — request a copy below', showCategoryFilter: true, requestButtonText: 'Request Now', requestButtonLink: '/contact' },
    ],
  })
  patched.push('Publications page (new)')

  // ── PARAMPARA MEMBERS collection — rename by lineage order (1-4) ─────────
  const members = await (payload.find as any)({ collection: 'parampara-members', sort: 'order', limit: 10 })
  const memberFixesByOrder: Record<number, { name: string; title: string; description: string }> = {
    1: { name: 'Adi Shankara', title: 'The Reviver of Advaita', description: 'The bedrock of our philosophical understanding. Adi Shankaracharya unified the diverse streams of Hindu thought by elucidating the non-dualistic reality (Brahman). His profound commentaries continue to light the path of our spiritual inquiry, emphasizing that the self and the absolute are one.' },
    2: { name: 'Swami Dayandha Saraswathi', title: 'The Pillar of Truth and Non-Violence', description: 'A steadfast teacher of the Vedanta tradition, Swami Dayandha Saraswathi upheld truth (Satya) and non-violence (Ahimsa) as the bedrock of spiritual practice, teaching that self-realization must be lived through unwavering integrity and compassion toward all beings.' },
    3: { name: 'Swami Paramarthananda', title: 'The Spiritual Successor and Founder', description: "A foremost teacher of Advaita Vedanta in the modern era, Swami Paramarthananda carries forward the traditional method of scriptural exposition (Sampradaya), and it is under his guidance and inspiration that Brahma Vidya Mandir's teaching lineage takes its present form." },
    4: { name: 'Swami Brahmayogananda', title: 'The Living Lineage', description: 'The lineage continues through Swami Brahmayogananda, who carries the flame of teaching forward at Brahma Vidya Mandir — ensuring that the wisdom of the Upanishads and the Gita remains a living, breathing presence in the life of the Sangha today.' },
  }
  if (members.docs.length) {
    for (const member of members.docs) {
      const fix = memberFixesByOrder[member.order]
      if (fix) await updateMember(member.id, fix)
    }
  } else {
    for (const order of [1, 2, 3, 4]) {
      await (payload.create as any)({ collection: 'parampara-members', data: { ...memberFixesByOrder[order], icon: order === 1 ? 'temple_hindu' : order === 2 ? 'self_improvement' : order === 3 ? 'psychology' : 'groups', order } })
    }
  }
  patched.push('Parampara members (lineage rename)')

  // ── CLASSES collection — rename 3, add 3 missing ─────────────────────────
  const classes = await (payload.find as any)({ collection: 'classes', limit: 100 })
  const classRenames: Record<string, { title: string; description?: string; duration?: string }> = {
    'Bhagavad Gita Home Study': { title: 'Bhagavad Gita', description: 'A comprehensive verse-by-verse exploration of the Gita, focusing on practical application in daily life and conflict resolution.' },
    'Shiva Pooja Vidhanam': { title: 'Medha Dakshinamoorthy Pooja' },
    'Festival Ritual Learning': { title: 'Ganapathy Homam', duration: 'Monthly Workshop' },
  }
  const existingTitles = new Set(classes.docs.map((c: { title: string }) => c.title))
  for (const cls of classes.docs) {
    const fix = classRenames[cls.title]
    if (fix) await (payload.update as any)({ collection: 'classes', id: cls.id, data: fix })
  }
  const newClasses = [
    { title: 'Vivekachudamani', category: 'vedanta', level: 'open', description: "An in-depth study of Adi Shankara's crown jewel of Advaita Vedanta — a masterwork on the path to Self-realisation.", location: 'chennai', day: 'thursday', time: '6:30 PM', enrollmentOpen: true, featured: false },
    { title: 'Brahmasutra Bhashya', category: 'vedanta', level: 'advanced', description: "Systematic study of Shankara's commentary on the Brahmasutras — the authoritative treatise on Vedantic philosophy.", location: 'chennai', day: 'sunday', time: '7:00 AM', enrollmentOpen: true, featured: false },
    { title: 'Mandukya Upanishad', category: 'vedanta', level: 'open', description: 'Study of the shortest yet most profound Upanishad — exploring the four states of consciousness and the nature of OM.', location: 'coimbatore', day: 'friday', time: '6:00 PM', enrollmentOpen: true, featured: false },
  ]
  for (const row of newClasses) {
    if (!existingTitles.has(row.title)) await (payload.create as any)({ collection: 'classes', data: row })
  }
  patched.push('Classes (renamed 3, added 3)')

  // ── PUBLICATIONS collection — create if empty ────────────────────────────
  const existingPubs = await (payload.find as any)({ collection: 'publications', limit: 1 })
  if (!existingPubs.docs.length) {
    const publicationRows = [
      { title: 'Tattva Bodha', author: 'Adi Shankaracharya', category: 'prakaranam', tagLabel: 'Foundational Text', description: 'A concise introduction to Vedantic terminology — defining the Self, the world, and the nature of liberation. The ideal first text for any sincere seeker.', order: 1 },
      { title: 'Vivekachudamani', author: 'Adi Shankaracharya', category: 'prakaranam', tagLabel: 'Advanced Study', description: 'The Crown Jewel of Discrimination — a masterwork of 580 verses guiding the seeker from bondage to the direct experience of non-dual awareness.', order: 2 },
      { title: 'Bhagavad Gita — Essence', author: 'BVM Teaching Series', category: 'geetha', tagLabel: 'Teaching Series', description: "Selected verses and commentary from Acharya-ji's classes on the Bhagavad Gita — distilling the essential teachings for the modern spiritual seeker.", order: 3 },
      { title: 'Upanishad Vahini', author: 'Selected Upanishads', category: 'upanishad', tagLabel: 'Anthology', description: "A curated flow of teachings drawn from the Mundaka, Mandukya, Kena and Isha Upanishads — compiled from BVM's weekend discourse series.", order: 4 },
      { title: 'The Art of Enquiry', author: 'Acharya Shri Rangaji', category: 'others', tagLabel: 'Original Work', description: "Acharya-ji's reflections on applying Vedantic Vichara (self-enquiry) in the texture of daily life — work, relationships and the quiet mind.", order: 5 },
      { title: 'Advaita in Daily Life', author: 'BVM Sangha Series', category: 'others', tagLabel: 'Sangha Series', description: 'Stories, reflections and practices from the BVM community — showing how non-dual awareness transforms the ordinary into the sacred.', order: 6 },
    ]
    for (const row of publicationRows) { await (payload.create as any)({ collection: 'publications', data: row }) }
    patched.push('Publications collection (created 6)')
  }

  return NextResponse.json({ success: true, patched })
}
