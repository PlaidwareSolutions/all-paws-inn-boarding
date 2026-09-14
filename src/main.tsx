import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import { BookingProvider } from './context/BookingContext'
import Layout from './components/Layout'

import { services, pricingCategories, slug } from './data'
import Hero from './components/Hero'
import QuickBooking from './components/QuickBooking'
import ServicesOverview from './components/ServicesOverview'
import Story from './components/Story'
import Team from './components/Team'
import AboutOverview from './components/AboutOverview'
import ServiceDetail from './components/ServiceDetail'
import PricingOverview from './components/PricingOverview'
import PricingDetail from './components/PricingDetail'
import ContactDetails from './components/ContactDetails'

/* Each HTML file names its page with data-page on #root. Every entry below is a separately
   addressed document, so a nav click is a real page load — not a route swap. */
const pages: Record<string, ReactNode> = {
  /* Home is the landing view and the front desk, nothing else — every other subject has
     its own page. */
  home: (
    <>
      <Hero />
      <QuickBooking />
    </>
  ),
  about: <AboutOverview />,
  'about/our-story': <Story />,
  'about/team': <Team />,
  services: <ServicesOverview />,
  pricing: <PricingOverview />,
  contact: <ContactDetails />,
}

for (const s of services) {
  pages[`services/${slug(s.title)}`] = <ServiceDetail service={s} />
}
for (const c of pricingCategories) {
  pages[`pricing/${slug(c.title)}`] = <PricingDetail category={c} />
}

const root = document.getElementById('root')!
const name = root.dataset.page ?? 'home'
const page = pages[name]

if (!page) throw new Error(`Unknown page "${name}" — check data-page on #root.`)

createRoot(root).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <Layout>{page}</Layout>
      </BookingProvider>
    </MotionConfig>
  </StrictMode>,
)
