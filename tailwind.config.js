/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── ALL PAWS INN — warm editorial ── */
        paper: '#F4EDE0', // warm paper — primary ground
        'paper-2': '#E3D3B4', // tan — clearly distinct alternating band
        bone: '#FBF7EF', // lightest — text on dark
        ink: '#1B1613', // warm near-black — text & dark grounds
        'ink-70': '#3B342C', // body text — kept dark enough to read easily on paper
        'ink-40': '#6B6154', // faint / marginalia
        flame: '#F4551D', // the loud accent
        ember: '#D8410F', // pressed / deep orange ground
        /* the logo's blues: the deep roof/wordmark, and the lighter house walls
           (`teal` shadows Tailwind's stock teal-* scale, which this site never uses) */
        teal: '#287293',
        'teal-soft': '#5FA6B3',
        sage: '#93A98F', // supporting — used once
        sky: '#9FBEC9', // supporting — used once
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 40px 90px -30px rgba(27,22,19,0.45)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [],
}
