import { type ReactNode } from 'react'
import Navbar from './Navbar'
import PawsBackground from './PawsBackground'
import ScrollProgress from './ScrollProgress'
import Footer from './Footer'

/** The chrome every page carries: header and footer. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <PawsBackground />
      <ScrollProgress />
      <Navbar />

      <main>{children}</main>

      <Footer />

    </>
  )
}
