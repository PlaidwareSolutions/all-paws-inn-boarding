import { type ReactNode } from 'react'
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'
import Footer from './Footer'
import PromoPopup from './PromoPopup'

/** The chrome every page carries: header, footer, and the grand-opening offer. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />

      <main>{children}</main>

      <Footer />

      <PromoPopup />

    </>
  )
}
