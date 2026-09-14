import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import GuidelinesPage from './components/GuidelinesPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <GuidelinesPage />
    </MotionConfig>
  </StrictMode>,
)
