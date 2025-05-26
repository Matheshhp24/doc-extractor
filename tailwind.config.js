/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFFFFF',    // pure white
          100: '#F9FAFC',   // cool white
          200: '#F0F4F8',   // faint blue-white
          300: '#E6EDF5',   // very light blue-gray
          400: '#DCE5F0',   // light blue-gray
          500: '#CBD5E1',   // medium blue-gray
          600: '#94A3B8',   // medium slate
          700: '#64748B',   // slate
          800: '#475569',   // deep slate
          900: '#334155',   // very deep slate
          950: '#1E293B',   // slate/blue-black
        },
        secondary: {
          50: '#ECFEFF',   // lightest teal
          100: '#CFFAFE',  // very light teal
          200: '#A5F3FC',  // light teal
          300: '#67E8F9',  // medium light teal
          400: '#22D3EE',  // bright teal
          500: '#06B6D4',  // teal
          600: '#0891B2',  // medium deep teal
          700: '#0E7490',  // deep teal
          800: '#155E75',  // ocean blue
          900: '#164E63',  // deep ocean blue
          950: '#083344',  // darkest blue
        },
        accent: {
          50: '#FFF1F3',   // lightest pink
          100: '#FFE4E8',  // very light pink
          200: '#FFC9D2',  // light pink
          300: '#FFA3B5',  // medium light pink
          400: '#FD7490',  // medium pink
          500: '#FB4570',  // bright pink (base color)
          600: '#F41F52',  // vibrant pink
          700: '#DB0A3B',  // deep pink
          800: '#B50731',  // rich pink
          900: '#90052A',  // deep rose
          950: '#5E0019',  // darkest rose
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
        warning: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
          950: '#450A0A',
        },
        gray: {
          50: '#FFFFFF',    // pure white
          100: '#F8F9FA',   // very light gray - almost white
          200: '#E9ECEF',   // light gray
          300: '#DEE2E6',   // medium light gray
          400: '#CED4DA',   // medium gray
          500: '#ADB5BD',   // true gray
          600: '#6C757D',   // medium dark gray
          700: '#495057',   // dark gray
          800: '#343A40',   // very dark gray
          900: '#212529',   // almost black
          950: '#121416',   // rich black
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(251, 69, 112, 0.08), 0 4px 16px rgba(251, 69, 112, 0.05)',
        subtle: '0 2px 10px rgba(0, 0, 0, 0.03)',
        elevated: '0 10px 30px rgba(0, 0, 0, 0.05), 0 5px 15px rgba(0, 0, 0, 0.03)',
        'soft-xl': '0 10px 25px -5px rgba(251, 69, 112, 0.08), 0 8px 10px -6px rgba(251, 69, 112, 0.03)',
        'inner-glow': 'inset 0 2px 20px 0 rgba(251, 69, 112, 0.05)',
        'card-hover': '0 20px 30px -10px rgba(251, 69, 112, 0.15)',
      },
      backdropBlur: {
        glass: '10px',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, rgba(251, 69, 112, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
        'frosted-glass': 'linear-gradient(135deg, rgba(249, 247, 245, 0.95) 0%, rgba(242, 240, 237, 0.85) 100%)',
        'soft-glow': 'radial-gradient(circle at top right, rgba(251, 69, 112, 0.08), transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'progress-indeterminate': 'progress-indeterminate 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'slide-left': 'slide-left 0.5s ease-out',
        'slide-right': 'slide-right 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom'
          }
        },
        'progress-indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-left': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'scale-out': {
          '0%': { transform: 'scale(1.1)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'border': 'border-width, border-color',
        'transform-opacity': 'transform, opacity',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, rgba(251, 69, 112, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
        'frosted-glass': 'linear-gradient(135deg, rgba(249, 247, 245, 0.95) 0%, rgba(242, 240, 237, 0.85) 100%)',
        'soft-glow': 'radial-gradient(circle at top right, rgba(251, 69, 112, 0.08), transparent 70%)',
        'gradient-pink': 'linear-gradient(135deg, #fb4570 0%, #fd7490 100%)',
        'gradient-pink-light': 'linear-gradient(135deg, #ffa3b5 0%, #ffc9d2 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-radial-pink': 'radial-gradient(circle at center, rgba(251, 69, 112, 0.5) 0%, rgba(251, 69, 112, 0) 70%)',
        'dots-pattern': 'radial-gradient(rgba(251, 69, 112, 0.2) 2px, transparent 2px)',
      },
      backgroundSize: {
        'dots-sm': '20px 20px',
        'dots-md': '30px 30px',
        'dots-lg': '40px 40px',
      },
    },
  },
  plugins: [],
};
