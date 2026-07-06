import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET() {
  const payload = await getPayload({ config })

  // Guard: don't seed if pages already exist
  const existing = await (payload.find as any)({ collection: 'pages', limit: 1 })
  if (existing.totalDocs > 0) {
    return NextResponse.json({ message: 'Already seeded — clear the database first to re-seed.' }, { status: 409 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const create = (collection: string, data: Record<string, any>) =>
    (payload.create as any)({ collection, data })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateGlobal = (slug: string, data: Record<string, any>) =>
    (payload.updateGlobal as any)({ slug, data })

  const results: string[] = []

  // ── Globals ──────────────────────────────────────────────────────────────

  await updateGlobal('site-navigation', {
    brandName: 'Brahma Vidya Mandir',
    navLinks: [
      { label: 'Classes', href: '/classes' },
      { label: 'Parampara', href: '/parampara' },
      { label: 'Acharya-ji', href: '/acharya-ji' },
      { label: 'About Us', href: '/about' },
      { label: 'Initiatives', href: '/initiatives' },
    ],
    ctaText: 'Contact Us',
    ctaLink: '/contact',
  })
  results.push('SiteNavigation global')

  await updateGlobal('site-settings', {
    siteName: 'Brahma Vidya Mandir',
    tagline: 'A community dedicated to the pursuit of Self-knowledge and the service of humanity in the light of Advaita Vedanta.',
    footerLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Archive', href: '/archive' },
    ],
    footerEmail: 'brahmavidyamandir@gmail.com',
    copyrightText: 'Brahma Vidya Mandir. All rights reserved. Purifying the heart through the wisdom of Advaita.',
  })
  results.push('SiteSettings global')

  // ── Parampara Members ─────────────────────────────────────────────────────

  const paramparaRows = [
    { name: 'Adi Shankara', title: 'The Reviver of Advaita', description: 'The bedrock of our philosophical understanding. Adi Shankaracharya unified the diverse streams of Hindu thought by elucidating the non-dualistic reality (Brahman). His profound commentaries continue to light the path of our spiritual inquiry, emphasizing that the self and the absolute are one.', icon: 'temple_hindu', order: 1 },
    { name: 'Mahatma Gandhi', title: 'The Pillar of Truth and Non-Violence', description: "While Advaita provides the philosophical grounding, Gandhiji provided the ethical framework of action. His insistence on Ahimsa (non-violence) and Satya (truth) forms the core of our community's service. He demonstrated that spiritual realization must culminate in the selfless service of society.", icon: 'self_improvement', order: 2 },
    { name: 'Vinoba Bhave', title: 'The Spiritual Successor and Founder', description: "The spiritual heir of Gandhi and a profound scholar of Vedanta. Acharya Vinoba Bhave synthesized solitary contemplation with collective action. It was his grand vision that established Brahma Vidya Mandir—an ashram dedicated to collective spiritual living and continuous intellectual and physical labor as worship.", icon: 'psychology', order: 3 },
    { name: 'The Sadhikas', title: 'The Living Lineage', description: 'The lineage does not end with individual masters; it breathes through the collective community. The sisters (Sadhikas) of Brahma Vidya Mandir are the living embodiment of these teachings. Through daily study, silent contemplation, and collective farming, they ensure the flame of wisdom remains vibrant and accessible in the modern age.', icon: 'groups', order: 4 },
  ]
  for (const row of paramparaRows) { await create('parampara-members', row) }
  results.push('Parampara members (4)')

  // ── Testimonials ──────────────────────────────────────────────────────────

  const testimonialRows = [
    { quote: 'His teachings possess a rare clarity that cuts through intellectual confusion. Acharya-ji does not just teach texts; he reveals a way of seeing oneself.', authorName: 'Rahul K.', authorRole: 'Student, 2018 Batch', authorInitial: 'R', featured: true },
    { quote: 'The compassion with which he handles our doubts makes learning an act of grace. The Mandir feels like a true spiritual home.', authorName: 'Sneha M.', authorRole: 'Online Participant', authorInitial: 'S', featured: true },
    { quote: 'A profound dedication to the Parampara. Every class is a masterclass in living an examined, purposeful life rooted in timeless wisdom.', authorName: 'Arvind P.', authorRole: 'Senior Student', authorInitial: 'A', featured: true },
    { quote: 'Finding this Sangha has been the most transformative experience of my journey. The teachings resonate deeply with my everyday life.', authorName: 'Meera V.', authorRole: 'Seeker', authorInitial: 'M', featured: true },
  ]
  for (const row of testimonialRows) { await create('testimonials', row) }
  results.push('Testimonials (4)')

  // ── Classes ───────────────────────────────────────────────────────────────

  const classRows = [
    { title: 'Upanishad Vahini', category: 'vedanta', level: 'open', description: "A weekend discourse exploring the ocean of Upanishadic wisdom, drawing from Adi Shankara's commentaries to illuminate the nature of the Self.", location: 'chennai', day: 'sunday', time: '7:00 - 9:00 AM', duration: '2 Hours', enrollmentOpen: true, featured: true },
    { title: 'Bhagavad Gita Vichara', category: 'vedanta', level: 'open', description: 'Foundational study of the Bhagavad Gita through the lens of Advaita Vedanta. Available online and in-person.', location: 'hybrid', day: 'friday', time: '6:00 - 7:30 PM', duration: '90 Mins', enrollmentOpen: true, featured: true },
    { title: 'Collective Meditation (Satsang)', category: 'vedanta', level: 'open', description: 'A guided group meditation and quiet reflection session to cultivate stillness and inner peace in community.', location: 'chennai', day: 'saturday', time: '5:30 - 7:00 PM', duration: '90 Mins', enrollmentOpen: true, featured: false },
    { title: 'Bhagavad Gita Home Study', category: 'vedanta', level: 'open', description: 'A comprehensive verse-by-verse exploration of the Gita, focusing on its practical application in daily life and conflict resolution.', location: 'chennai', day: 'saturday', time: '8:00 AM', enrollmentOpen: true, featured: true },
    { title: 'Mundaka Upanishad', category: 'vedanta', level: 'open', description: 'Unlocking the wisdom of higher knowledge vs lower knowledge as taught in the Mundaka Upanishad.', location: 'coimbatore', day: 'sunday', time: '10:00 AM', enrollmentOpen: true, featured: false },
    { title: 'Tattva Bodha', category: 'vedanta', level: 'beginner', description: 'Introduction to Vedantic terminology and concepts for beginners. An essential foundation for all Vedanta studies.', location: 'coimbatore', day: 'tuesday', time: '7:00 PM', enrollmentOpen: true, featured: false },
    { title: 'Vedic Chanting', category: 'chanting', level: 'open', description: 'Master the precise intonation and rhythm of sacred Krishna Yajur Veda mantras in a traditional setting.', location: 'chennai', day: 'wednesday', time: '6:30 PM', enrollmentOpen: true, featured: false },
    { title: 'Lalitha Sahasranamam', category: 'chanting', level: 'open', description: 'Devotional learning of the thousand names of the Divine Mother with emphasis on meaning and phonetics.', location: 'chennai', day: 'friday', time: '5:00 PM', enrollmentOpen: true, featured: false },
    { title: 'Shiva Pooja Vidhanam', category: 'pooja', level: 'open', description: 'Step-by-step guidance on performing Panchayathana Pooja and specific Shiva-centric rituals with Sanskrit Sankalpa training.', location: 'chennai', duration: '90 Mins', enrollmentOpen: true, featured: false },
    { title: 'Festival Ritual Learning', category: 'pooja', level: 'open', description: 'Seasonal workshops focused on major Vedic festivals (Deepavali, Navratri, Ganesh Chaturthi) rituals and their symbolic significance.', location: 'coimbatore', enrollmentOpen: true, featured: false },
  ]
  for (const row of classRows) { await create('classes', row) }
  results.push('Classes (10)')

  // ── Pages ─────────────────────────────────────────────────────────────────

  await create('pages', {
    title: 'Home', slug: 'home',
    seoTitle: 'Brahma Vidya Mandir | Advaita Vedanta Sanctuary',
    seoDescription: 'A digital sanctuary for Advaita Vedanta teachings, following the lineage of Adi Shankara, Mahatma Gandhi, and Vinoba Bhave.',
    layout: [
      { blockType: 'hero', label: 'Welcome to the Sanctuary of Wisdom', heading: 'Brahma Vidya Mandir', sanskritQuote: 'durllabham trayamevaitaddevAnugrahah | manushyatvam mumukshutvam mahApurushasamsrayah', quoteSource: 'Vivekachudamani', quoteTranslation: 'These three things are very difficult to obtain and are due only to the grace of God: a human birth, a longing for liberation, and the protection of a great soul.', ctaText: 'Explore the Path', ctaLink: '#about' },
      { blockType: 'about', label: 'Our Foundation', heading: 'Advaita Vedanta & Collective Living', paragraphs: [{ text: 'Brahma Vidya Mandir is an ashram established in 1959 by Vinoba Bhave, the spiritual successor to Mahatma Gandhi. Nestled in the heart of the village of Paunar, it stands as a testament to the synthesis of spirituality and labor.' }, { text: "The ashram is unique in its commitment to collective leadership, primarily managed and nurtured by a group of dedicated women (Sadhikas). Our mission is to live the principles of Brahma-Vidya while being firmly rooted in social service and self-sufficiency." }], ctaText: 'Discover Our Philosophy', ctaLink: '/about', imagePosition: 'right' },
      { blockType: 'parampara', label: 'The Holy Lineage', heading: 'Our Guru Parampara', nodes: [{ name: 'Adi Shankara', role: 'The Reviver of Advaita', icon: 'temple_hindu' }, { name: 'Mahatma Gandhi', role: 'Truth & Non-Violence', icon: 'self_improvement' }, { name: 'Vinoba Bhave', role: 'Spiritual Successor', icon: 'psychology' }, { name: 'The Collective', role: 'Sisterhood of Sadhikas', icon: 'groups' }] },
      { blockType: 'acharya', label: 'Guided Wisdom', name: 'Acharya Shri Rangaji', paragraphs: [{ text: 'With profound devotion and intellectual clarity, Acharya Shri Rangaji guides seekers through the intricate paths of the Upanishads and the Bhagavad Gita.' }, { text: "A lifelong practitioner of Advaita, Acharya-ji emphasizes the practical application of Vichara (enquiry) in daily life, ensuring that spiritual wisdom becomes a lived experience of peace." }], linkText: "Read Acharya-ji's Reflections", linkUrl: '/acharya-ji', portraitPosition: 'left' },
      { blockType: 'classSchedule', label: 'Dinacharya', heading: 'Class Schedule', sideQuote: 'Regular study (Svadhyaya) is the foundation of spiritual steadfastness.', scheduleItems: [{ category: 'Weekend Discourse', title: 'Upanishad Vahini', day: 'Sunday', time: '7:00 - 9:00 AM', location: 'Main Meditation Hall', locationIcon: 'location_on' }, { category: 'Foundational Study', title: 'Bhagavad Gita Vichara', day: 'Friday', time: '6:00 - 7:30 PM', location: 'Online & In-person', locationIcon: 'video_library' }, { category: 'Satsang', title: 'Collective Meditation', day: 'Saturday', time: '5:30 - 7:00 PM', location: 'Quiet Reflection', locationIcon: 'spatial_audio_off' }], calendarLinkText: 'Download the full monthly calendar', calendarLinkUrl: '/classes' },
    ],
  })
  results.push('Page: Home')

  await create('pages', {
    title: 'About Us', slug: 'about',
    seoTitle: 'About Us — Brahma Vidya Mandir',
    seoDescription: 'Tracing the sacred journey of Brahma Vidya Mandir since 1959.',
    layout: [
      { blockType: 'hero', heading: 'Our Sacred Journey', quoteTranslation: 'Tracing the path of devotion and wisdom since our founding. A testament to the enduring light of the Vedic tradition, grounded in Aparigraha and silent contemplation.' },
      { blockType: 'milestonesTimeline', milestones: [{ year: '1959', title: 'The Foundation at Paunar', description: 'The seed of Brahma Vidya Mandir is planted, establishing a sanctuary dedicated to the pursuit of ultimate truth through disciplined practice and renunciation.', images: [] }, { year: '1980', title: 'Expansion of Teachings', description: 'The ashram broadens its reach, formally organizing the lineage teachings. The daily schedule (Dinacharya) becomes a formalized structure, guiding seekers in harmonizing action and contemplation.', images: [] }] },
    ],
  })
  results.push('Page: About Us')

  await create('pages', {
    title: 'Acharya-ji', slug: 'acharya-ji',
    seoTitle: 'Acharya Shri Rangaji — Brahma Vidya Mandir',
    seoDescription: 'Dedicated to the profound teachings of Advaita Vedanta, Acharya-ji serves as a humble conduit for the ancient wisdom.',
    layout: [
      { blockType: 'acharya', label: 'Spiritual Guide & Student', name: 'Acharya Shri Rangaji', paragraphs: [{ text: 'Dedicated to the profound teachings of Advaita Vedanta, Acharya-ji serves as a humble conduit for the ancient wisdom of the Upanishads, Bhagavad Gita, and Brahmasutras.' }, { text: 'With decades of rigorous study and deep contemplation, his approach bridges traditional scriptural analysis with the practical realities of modern life.' }, { text: 'He firmly believes that self-knowledge is not merely an intellectual pursuit, but a transformative journey that begins with a steady mind and culminates in total freedom.' }], portraitPosition: 'left' },
      { blockType: 'quoteDivider', quote: 'True freedom is not an escape from the world, but the profound realization that you are the very light illuminating it.', attribution: 'Acharya Shri Rangaji' },
      { blockType: 'video', heading: 'The Life of a Seeker', description: 'A biographical journey of Acharya Shri Rangaji.', videoLabel: 'Biographical Documentary', videoTitle: 'Acharya-ji: The Journey Within', viewAllText: 'View Full Biography', viewAllUrl: '#' },
      { blockType: 'milestonesTimeline', heading: 'The Journey of Wisdom', milestones: [{ year: '1982', title: 'Early Dedication', description: 'Began formal study under the guidance of esteemed traditional scholars.', images: [] }, { year: '1995', title: 'Himalayan Retreat', description: 'Undertook extensive periods of silent contemplation in Uttarkashi.', images: [] }, { year: '2005', title: 'Foundation', description: 'Established Brahma Vidya Mandir to share the teachings of Vedanta systematically.', images: [] }, { year: '2012', title: 'Spiritual Awakening', description: 'Teachings reached thousands of new seekers globally through digital initiatives.', images: [] }, { year: '2020', title: 'Global Outreach', description: "Expanding the Mandir's presence to international communities, fostering a global Sangha.", images: [] }] },
      { blockType: 'reels', heading: 'Moments of Clarity', reels: [{ title: 'Dealing with Anxiety' }, { title: 'The Illusion of Control' }, { title: 'What is Dharma?' }, { title: 'Q&A: Meditation Focus' }] },
      { blockType: 'testimonials', heading: 'Voices of the Sangha', items: [{ quote: 'His teachings possess a rare clarity that cuts through intellectual confusion.', authorName: 'Rahul K.', authorRole: 'Student, 2018 Batch', authorInitial: 'R' }, { quote: 'The compassion with which he handles our doubts makes learning an act of grace.', authorName: 'Sneha M.', authorRole: 'Online Participant', authorInitial: 'S' }, { quote: 'A profound dedication to the Parampara. Every class is a masterclass in living an examined, purposeful life.', authorName: 'Arvind P.', authorRole: 'Senior Student', authorInitial: 'A' }, { quote: 'Finding this Sangha has been the most transformative experience of my journey.', authorName: 'Meera V.', authorRole: 'Seeker', authorInitial: 'M' }] },
    ],
  })
  results.push('Page: Acharya-ji')

  await create('pages', {
    title: 'Classes', slug: 'classes',
    seoTitle: 'Classes & Sacred Learning — Brahma Vidya Mandir',
    seoDescription: 'Immerse yourself in the eternal wisdom of the Vedas through our structured learning programs in Chennai and Coimbatore.',
    layout: [
      { blockType: 'hero', heading: 'Classes & Sacred Learning', quoteTranslation: 'Immerse yourself in the eternal wisdom of the Vedas through our structured learning programs in Chennai and Coimbatore.' },
      { blockType: 'classListing', heading: 'Classes & Sacred Learning', description: 'Immerse yourself in the eternal wisdom of the Vedas through our structured learning programs in Chennai and Coimbatore.', showLocationFilter: true, enrollButtonText: 'Enroll Course' },
    ],
  })
  results.push('Page: Classes')

  await create('pages', {
    title: 'Contact Us', slug: 'contact',
    seoTitle: 'Contact Us — Brahma Vidya Mandir',
    seoDescription: 'Visit our branches in Chennai and Coimbatore for spiritual study and community.',
    layout: [
      { blockType: 'hero', heading: 'Connect with the Sanctuary', quoteTranslation: 'Visit our branches for spiritual study and community. We welcome seekers of all backgrounds to explore the Vedic tradition.' },
      { blockType: 'locations', heading: 'Our Centers', description: 'Visit us at one of our two locations in Tamil Nadu.', locations: [{ name: 'Chennai Center', address: 'Old # 59, New # 125, Gopathi Narayanaswami Rd, Opposite to Geetham Veg Restaurant, T. Nagar, Chennai, Tamil Nadu 600017', phone: '+91 98765 43210', mapLocation: 'T. Nagar, Chennai, India' }, { name: 'Coimbatore Center', address: 'Vedic Studies Block, 14 Ashram Road, Near Marudhamalai Foothills, Coimbatore, Tamil Nadu 641046', phone: '+91 87654 32109', mapLocation: 'Marudhamalai, Coimbatore, India' }] },
      { blockType: 'contactForm', heading: 'Send an Inquiry', description: 'We welcome your questions regarding classes, retreats, or general information.', submitButtonText: 'Send Message', recipientEmail: 'brahmavidyamandir@gmail.com' },
    ],
  })
  results.push('Page: Contact Us')

  await create('pages', {
    title: 'Initiatives', slug: 'initiatives',
    seoTitle: 'Initiatives — Brahma Vidya Mandir',
    seoDescription: 'Our sacred initiatives rooted in Aparigraha and silent contemplation.',
    layout: [
      { blockType: 'hero', heading: 'Our Sacred Initiatives', quoteTranslation: 'Tracing the path of devotion and wisdom since our founding. A testament to the enduring light of the Vedic tradition, grounded in Aparigraha and silent contemplation.' },
      { blockType: 'milestonesTimeline', milestones: [{ year: '1959', title: 'The Foundation at Paunar', description: 'The seed of Brahma Vidya Mandir is planted, establishing a sanctuary dedicated to the pursuit of ultimate truth through disciplined practice and renunciation.', images: [] }, { year: '1980', title: 'Expansion of Teachings', description: 'The ashram broadens its reach, formally organizing the lineage teachings. The daily schedule (Dinacharya) becomes a formalized structure.', images: [] }] },
    ],
  })
  results.push('Page: Initiatives')

  await create('pages', {
    title: 'Parampara', slug: 'parampara',
    seoTitle: 'Guru Parampara — Brahma Vidya Mandir',
    seoDescription: 'The teachings of Advaita Vedanta flow continuously from teacher to student, an unbroken river of wisdom stretching back centuries.',
    layout: [
      { blockType: 'hero', heading: 'Our Holy Lineage', quoteTranslation: 'The teachings of Advaita Vedanta flow continuously from teacher to student, an unbroken river of wisdom stretching back centuries. At Brahma Vidya Mandir, we honor this sacred transmission.' },
      { blockType: 'lineageDisplay', members: [{ name: 'Adi Shankara', title: 'The Reviver of Advaita', description: 'The bedrock of our philosophical understanding. Adi Shankaracharya unified the diverse streams of Hindu thought by elucidating the non-dualistic reality (Brahman).', portraitSide: 'left' }, { name: 'Mahatma Gandhi', title: 'The Pillar of Truth and Non-Violence', description: "While Advaita provides the philosophical grounding, Gandhiji provided the ethical framework of action. His insistence on Ahimsa and Satya forms the core of our community's service.", portraitSide: 'right' }, { name: 'Vinoba Bhave', title: 'The Spiritual Successor and Founder', description: "The spiritual heir of Gandhi and a profound scholar of Vedanta. Acharya Vinoba Bhave synthesized solitary contemplation with collective action and established Brahma Vidya Mandir.", portraitSide: 'left' }, { name: 'The Sadhikas', title: 'The Living Lineage', description: 'The sisters (Sadhikas) of Brahma Vidya Mandir are the living embodiment of these teachings. Through daily study, silent contemplation, and collective farming, they keep the flame of wisdom vibrant.', portraitSide: 'right' }] },
    ],
  })
  results.push('Page: Parampara')

  return NextResponse.json({ success: true, seeded: results })
}
