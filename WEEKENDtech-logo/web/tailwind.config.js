/** Weekend Tech — Tailwind theme extension (v1.0) */
module.exports = {
  theme: {
    extend: {
      colors: {
        royal:  { DEFAULT: '#1E40AF', dark: '#1E3A8A', tint: '#EEF2FF', ring: '#C7D2FE' },
        orange: { DEFAULT: '#F26A1B', soft: '#FB923C', deep: '#C2410C', tint: '#FFF1E8' },
        navy:   { DEFAULT: '#0F1B3D' },
        slate:  { DEFAULT: '#475569', light: '#64748B' },
        border: { DEFAULT: '#E2E8F0', strong: '#CBD5E1' },
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: ['4rem',     { lineHeight: '4.5rem',   letterSpacing: '-0.03em',  fontWeight: '800' }],
        h1:      ['3rem',     { lineHeight: '3.5rem',   letterSpacing: '-0.025em', fontWeight: '800' }],
        h2:      ['2.25rem',  { lineHeight: '2.75rem',  letterSpacing: '-0.02em',  fontWeight: '700' }],
        h3:      ['1.75rem',  { lineHeight: '2.25rem',  letterSpacing: '-0.015em', fontWeight: '700' }],
        h4:      ['1.375rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em',  fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.875rem' }],
        body:    ['1rem',     { lineHeight: '1.625rem' }],
        small:   ['0.875rem', { lineHeight: '1.375rem' }],
        overline:['0.75rem',  { lineHeight: '1rem', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderRadius: { sm: '10px', md: '16px', lg: '24px' },
      boxShadow: { float: '0 8px 24px rgba(15, 27, 61, 0.12)' },
      maxWidth: { container: '1200px', measure: '680px' },
      transitionDuration: { fast: '150ms', base: '220ms' },
      transitionTimingFunction: { brand: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
    },
  },
};
