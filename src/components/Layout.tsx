import { type ReactNode } from 'react'
import Navbar from './Navbar'
import PawsBackground from './PawsBackground'
import ScrollProgress from './ScrollProgress'
import Footer from './Footer'
import StickyBookingCTA from './StickyBookingCTA'
import BookingDrawer from './BookingDrawer'

/** The chrome every page carries: header, footer and the booking flow. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <PawsBackground />
      <ScrollProgress />
      <Navbar />

      <main>{children}</main>

      <Footer />

      <StickyBookingCTA />
      <BookingDrawer />
    </>
  )
}
