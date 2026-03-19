/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F3D2B',
        'primary-hover': '#3F6F52',
        accent: '#C9A44C',
        'accent-light': '#E8C06A',
        bg: '#F6F4EF',
        card: '#EEEAE3',
        surface: '#E7E0D9',
        foreground: '#2A2A2A',
        muted: '#6B6B6B',
        border: '#DDD6CC',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '6xl': ['60px', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        '5xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '4xl': ['36px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        '3xl': ['30px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '1.3' }],
        'xl': ['20px', { lineHeight: '1.4' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'base': ['16px', { lineHeight: '1.7' }],
        'sm': ['14px', { lineHeight: '1.6' }],
        'xs': ['12px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '40px',
        '6xl': '48px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(31, 61, 43, 0.06)',
        'card-hover': '0 20px 48px rgba(31, 61, 43, 0.12)',
        'green': '0 8px 24px rgba(31, 61, 43, 0.25)',
        'gold': '0 8px 24px rgba(201, 164, 76, 0.3)',
        'phone': '0 32px 80px rgba(31, 61, 43, 0.3), 0 8px 24px rgba(0,0,0,0.15)',
      },
      maxWidth: {
        'container': '1200px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(63,111,82,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(201,164,76,0.06) 0%, transparent 50%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A44C 0%, #E8C06A 100%)',
        'green-gradient': 'linear-gradient(135deg, #1F3D2B 0%, #3F6F52 100%)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float-delayed 5s ease-in-out infinite 1s',
        'float-slow': 'float 6s ease-in-out infinite 2s',
        'blob': 'blob-morph 8s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'fade-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};