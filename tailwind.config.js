/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1300px',
        },
        colors: {
            'primary': '#2c58a0',
            'primary-bg': '#dfe7f6',
            'danger': '#af233a',
            'danger-bg': '#f9e1e5',
            'warning': '#73510d',
            'warning-bg': '#fbf0da',
            'success': '#0d6832',
            'success-bg': '#d6f0e0',
            'secondary': '#40464f',
            'secondary-bg': '#ebedef',
            'info': '#1c657d',
            'info-bg': '#def1f7',
            'black': '#000',
            'black-1': '#38383d',
            'black-2': '#3f4b53',
            'red': '#af233a',
            'gray': '#4f4f4f',
            'white': '#fff',
            'border': '#f7f7f7',
            'border-1': '#ececec',
            'app-1': '#f5f5fa',
            'app-2': '#efefef',
            'rating': '#e4a400',
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        fontSize: {
            'xs': '.775rem',
            'sm': '.8rem',
            'tiny': '.875rem',
            'md': '.9rem',
            'base': '1rem',
            'lg': '1.1rem',
            'xl': '1.25rem',
            '2xl': '1.4rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '600px',
                md: '728px',
                lg: '984px',
                xl: '1300px',
            },
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow: {
                // 'md': 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
            },
            backgroundImage: {}
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}