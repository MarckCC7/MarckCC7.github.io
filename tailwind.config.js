/**
 * Tailwind CSS configuration — The Digital Garden design system.
 *
 * Every colour here points at a CSS custom property declared in
 * `src/styles/tokens.css`. That indirection is deliberate:
 *
 *   1. Theming (dark ⇄ light) happens by swapping variables, not classes.
 *   2. Canvas / SVG / inline styles read the exact same tokens, so the
 *      background particles can never drift out of sync with the UI.
 *
 * To restyle the whole site you only ever touch `tokens.css`.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // — Surfaces —————————————————————————————
        base: 'var(--surface-base)',
        raised: 'var(--surface-raised)',
        elevated: 'var(--surface-elevated)',
        overlay: 'var(--surface-overlay)',

        // — Text —————————————————————————————————
        ink: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },

        // — Lines ————————————————————————————————
        line: {
          subtle: 'var(--line-subtle)',
          DEFAULT: 'var(--line-default)',
          strong: 'var(--line-strong)',
        },

        // — Moss: the garden itself ——————————————
        moss: {
          50: 'var(--moss-50)',
          100: 'var(--moss-100)',
          200: 'var(--moss-200)',
          300: 'var(--moss-300)',
          400: 'var(--moss-400)',
          500: 'var(--moss-500)',
          600: 'var(--moss-600)',
          700: 'var(--moss-700)',
        },

        // — Azure: actions, links, focus —————————
        azure: {
          200: 'var(--azure-200)',
          300: 'var(--azure-300)',
          400: 'var(--azure-400)',
          500: 'var(--azure-500)',
          600: 'var(--azure-600)',
          700: 'var(--azure-700)',
        },

        // — Ember: "in progress", warnings ———————
        ember: {
          300: 'var(--ember-300)',
          400: 'var(--ember-400)',
          500: 'var(--ember-500)',
        },

        // — Graphite: neutral scaffolding ————————
        graphite: {
          50: 'var(--graphite-50)',
          100: 'var(--graphite-100)',
          200: 'var(--graphite-200)',
          300: 'var(--graphite-300)',
          400: 'var(--graphite-400)',
          500: 'var(--graphite-500)',
          600: 'var(--graphite-600)',
          700: 'var(--graphite-700)',
          800: 'var(--graphite-800)',
          900: 'var(--graphite-900)',
          950: 'var(--graphite-950)',
        },
      },

      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
        pixel: 'var(--font-pixel)',
      },

      fontSize: {
        // Fluid display sizes — no media queries needed for the hero.
        'display-sm': [
          'clamp(2.25rem, 1.4rem + 3.6vw, 3.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.03em' },
        ],
        'display-md': [
          'clamp(2.75rem, 1.2rem + 6vw, 5rem)',
          { lineHeight: '1.02', letterSpacing: '-0.035em' },
        ],
        'display-lg': [
          'clamp(3.25rem, 0.6rem + 9vw, 7.5rem)',
          { lineHeight: '0.98', letterSpacing: '-0.04em' },
        ],
      },

      spacing: {
        section: 'clamp(5rem, 3rem + 8vw, 9rem)',
        gutter: 'clamp(1.25rem, 0.5rem + 2.5vw, 2.5rem)',
      },

      maxWidth: {
        shell: '84rem',
        prose: '68ch',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },

      boxShadow: {
        glass: 'var(--shadow-glass)',
        lift: 'var(--shadow-lift)',
        glow: 'var(--shadow-glow)',
        'glow-moss': 'var(--shadow-glow-moss)',
      },

      backdropBlur: {
        glass: '18px',
      },

      transitionTimingFunction: {
        garden: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'garden-in': 'cubic-bezier(0.65, 0, 0.35, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.06)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pixel-blink': {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0.15' },
          '100%': { opacity: '1' },
        },
        'grow-stem': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
        'caret-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },

      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        breathe: 'breathe 9s ease-in-out infinite',
        sway: 'sway 5.5s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        'pixel-blink': 'pixel-blink 2.4s steps(1, end) infinite',
        'grow-stem': 'grow-stem 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'caret-blink': 'caret-blink 1.1s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
};
