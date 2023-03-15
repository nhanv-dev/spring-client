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
            'primary': '#1976d2',
            'primary-hover': '#0a68ff',
            'primary-bg': '#0060ff1f',
            'warning': '#c28e00',
            'warning-hover': '',
            'warning-bg': '#fffcf2',
            'success': '#00a046',
            'success-hover': '',
            'success-bg': '#f4faf6',
            'secondary': '#808089',
            'secondary-hover': '#27272a1f',
            'secondary-bg': '#27272a1f',
            'black': '#000',
            'black-1': '#38383d',
            'black-2': '#3f4b53',
            'red': '#d0011b',
            'gray': '#6f787e',
            'white': '#fff',
            'border': '#f7f7f7',
            'border-1': '#00000024',
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
                'tiny': '0 -2px 8px 0 rgb(0 0 0 / 10%), 0 4px 8px 0 rgb(0 0 0 / 10%)'
            },
            backgroundImage: {}
        }
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}