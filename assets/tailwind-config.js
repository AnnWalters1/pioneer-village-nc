tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary:       '#b8924a',
        'primary-dark':'#8f6f38',
        'primary-light':'#d9b876',
        accent:        '#b6512f',
        'accent-dark': '#8f3e23',
        background:    '#faf7f1',
        surface:       '#ffffff',
        ink:           '#191710',
        muted:         '#8a8270',
        divider:       '#e7e0d2',
        deep:          '#100f0c',
        'deep-surface':'#1a1812',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"','sans-serif'],
        serif:   ['"Cormorant Garamond"','serif'],
        body:    ['Inter','sans-serif'],
        mono:    ['"JetBrains Mono"','monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        }
      }
    }
  }
}
